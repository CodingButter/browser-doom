//-----------------------------------------------------------------------------
//
// libc/fcntl.c — POSIX <fcntl.h> reimplementation for the browser port.
//
// VFS backing store. The browser has no synchronous file API, so the host
// (`assets.ts`) pre-fetches every WAD/PWAD asset via `fetch()` and calls
// `vfsRegister(path, bytes)` before `main()` runs. From `main()` onward,
// the eventual `open()` implementation will hand out synthetic handles
// that wrap a `Uint8Array` + cursor — letting ported engine code keep
// calling `open`/`read`/`lseek`/`close` synchronously, exactly like the
// original C.
//
// Keys are lowercased on register and lookup so that case-insensitive
// matches work (DOOM uses `strcasecmp` in plenty of places).
//
//-----------------------------------------------------------------------------

import type { vfsRegister_fn, vfsLookup_fn, vfsHas_fn, vfsList_fn } from "libc/fcntl.h";

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
