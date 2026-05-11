//-----------------------------------------------------------------------------
//
// libc/fcntl.h — POSIX <fcntl.h> reimplementation for the browser port.
//
// Hosts the virtual filesystem that backs the eventual `open()` /
// `O_RDONLY` etc. surface. Ported engine code will go through `open()`
// here; the browser host (`assets.ts`) seeds the VFS with WAD bytes
// before `main()` runs.
//
//-----------------------------------------------------------------------------

export type vfsRegister_fn = (path: string, bytes: Uint8Array) => void;
export type vfsLookup_fn   = (path: string) => Uint8Array | undefined;
export type vfsHas_fn      = (path: string) => boolean;
export type vfsList_fn     = () => string[];

export { vfsRegister, vfsLookup, vfsHas, vfsList } from "libc/fcntl.c";
