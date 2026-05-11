//-----------------------------------------------------------------------------
//
// libc/sys/stat.c — POSIX <sys/stat.h> reimplementation for the browser port.
//
//-----------------------------------------------------------------------------

import type { fstat_fn } from "libc/sys/stat.h";
import { fdtableGet } from "libc/_fdtable";

export const fstat: fstat_fn = (fd, out) => {
  const h = fdtableGet(fd);
  if (!h) return -1;
  out.st_size = h.bytes.length;
  return 0;
};
