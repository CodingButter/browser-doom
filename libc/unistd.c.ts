//-----------------------------------------------------------------------------
//
// libc/unistd.c — POSIX <unistd.h> reimplementation for the browser port.
//
// `read`, `close`, `lseek` against the shared file-descriptor table.
// Each handle owns a `Uint8Array` plus a cursor; ops advance/move the
// cursor and copy bytes into the caller's buffer. All synchronous, all
// in-memory.
//
//-----------------------------------------------------------------------------

import type { read_fn, close_fn, lseek_fn } from "libc/unistd.h";
import { fdtableGet, fdtableClose } from "libc/_fdtable";

export const SEEK_SET = 0;
export const SEEK_CUR = 1;
export const SEEK_END = 2;

export const read: read_fn = (fd, dest, n) => {
  const h = fdtableGet(fd);
  if (!h) return -1;
  const remaining = h.bytes.length - h.cursor;
  const toRead = Math.min(n, remaining);
  if (toRead <= 0) return 0;
  dest.set(h.bytes.subarray(h.cursor, h.cursor + toRead));
  h.cursor += toRead;
  return toRead;
};

export const close: close_fn = (fd) => {
  return fdtableClose(fd) ? 0 : -1;
};

export const lseek: lseek_fn = (fd, offset, whence) => {
  const h = fdtableGet(fd);
  if (!h) return -1;
  let pos: number;
  switch (whence) {
    case SEEK_SET: pos = offset; break;
    case SEEK_CUR: pos = h.cursor + offset; break;
    case SEEK_END: pos = h.bytes.length + offset; break;
    default: return -1;
  }
  if (pos < 0 || pos > h.bytes.length) return -1;
  h.cursor = pos;
  return pos;
};
