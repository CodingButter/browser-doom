//-----------------------------------------------------------------------------
//
// libc/unistd.h — POSIX <unistd.h> reimplementation for the browser port.
//
// Synchronous byte-stream operations on file descriptors handed out by
// `open()` (declared in `<fcntl.h>`). Backed by the in-memory VFS — no
// real I/O happens here at runtime.
//
//-----------------------------------------------------------------------------

export type read_fn  = (fd: number, dest: Uint8Array, n: number) => number;
export type close_fn = (fd: number) => number;
export type lseek_fn = (fd: number, offset: number, whence: number) => number;

export { read, close, lseek, SEEK_SET, SEEK_CUR, SEEK_END } from "libc/unistd.c";
