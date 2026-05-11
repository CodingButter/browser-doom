//-----------------------------------------------------------------------------
//
// libc/fcntl.c — POSIX <fcntl.h> reimplementation for the browser port.
//
// VFS backing store + `open()`. The browser has no synchronous file API,
// so the host (`assets.ts`) pre-fetches every WAD/PWAD asset via `fetch()`
// and calls `vfsRegister(path, bytes)` before `main()` runs. After that,
// engine code opens files synchronously and the returned `fd` is just an
// integer that indexes into the shared file-descriptor table; reading,
// seeking, and closing happen through `<unistd.h>`.
//
// Keys are lowercased on register and lookup so case-insensitive matches
// work (DOOM uses `strcasecmp` in plenty of places).
//
//-----------------------------------------------------------------------------

import type {
  vfsRegister_fn, vfsLookup_fn, vfsHas_fn, vfsList_fn, open_fn,
} from "libc/fcntl.h";
import { fdtableOpen } from "libc/_fdtable";

// `open()` flags. The numeric values mirror Linux's <bits/fcntl-linux.h>
// so any C code that checks specific bits behaves identically. The browser
// VFS only reads, so most flags are advisory — we just have to accept
// `O_RDONLY` without complaining.
export const O_RDONLY = 0x0000;
export const O_WRONLY = 0x0001;
export const O_RDWR   = 0x0002;
export const O_CREAT  = 0x0040;
export const O_APPEND = 0x0400;
export const O_TRUNC  = 0x0200;
// POSIX has no notion of "binary mode" — define as 0 the way Linux does so
// `O_RDONLY | O_BINARY` collapses to `O_RDONLY`.
export const O_BINARY = 0;

const files = new Map<string, Uint8Array>();

const norm = (path: string): string => path.toLowerCase();

export const vfsRegister: vfsRegister_fn = (path, bytes) => {
  files.set(norm(path), bytes);
};

export const vfsLookup: vfsLookup_fn = (path) => {
  return files.get(norm(path));
};

export const vfsHas: vfsHas_fn = (path) => {
  return files.has(norm(path));
};

export const vfsList: vfsList_fn = () => {
  return Array.from(files.keys()).sort();
};

export const open: open_fn = (path, _flags) => {
  const bytes = vfsLookup(path);
  if (!bytes) return -1; // C convention: -1 on failure
  return fdtableOpen(bytes);
};
