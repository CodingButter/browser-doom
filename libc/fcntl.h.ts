//-----------------------------------------------------------------------------
//
// libc/fcntl.h — POSIX <fcntl.h> reimplementation for the browser port.
//
// Hosts the virtual filesystem and the `open()` entry point. Engine code
// calls `open(path, flags)` to get a file descriptor; the actual byte
// stream comes from the VFS, which the browser host (`assets.ts`) seeds
// with fetched WAD bytes before `main()` runs.
//
//-----------------------------------------------------------------------------

export type vfsRegister_fn = (path: string, bytes: Uint8Array) => void;
export type vfsLookup_fn   = (path: string) => Uint8Array | undefined;
export type vfsHas_fn      = (path: string) => boolean;
export type vfsList_fn     = () => string[];

export type open_fn = (path: string, flags: number) => number;

export {
  vfsRegister, vfsLookup, vfsHas, vfsList,
  open,
  O_RDONLY, O_WRONLY, O_RDWR, O_BINARY, O_CREAT, O_APPEND, O_TRUNC,
} from "libc/fcntl.c";
