//-----------------------------------------------------------------------------
//
// libc/stdlib.h — POSIX <stdlib.h> reimplementation for the browser port.
//
// `malloc` / `calloc` / `realloc` / `free` plus a handful of conversions.
// JS handles memory via GC, so `malloc` here just hands back a fresh
// `Uint8Array` of the requested size and `free` is a no-op — the engine
// keeps the same call shape and the GC reclaims unused buffers.
//
//-----------------------------------------------------------------------------

export type malloc_fn  = (size: number) => Uint8Array;
export type calloc_fn  = (count: number, size: number) => Uint8Array;
export type realloc_fn = (ptr: Uint8Array | null, size: number) => Uint8Array;
export type free_fn    = (ptr: Uint8Array | null) => void;

export type atoi_fn = (s: string) => number;
export type atof_fn = (s: string) => number;
export type exit_fn = (code: number) => never;

export { malloc, calloc, realloc, free, atoi, atof, exit } from "libc/stdlib.c";
