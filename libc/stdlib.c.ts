//-----------------------------------------------------------------------------
//
// libc/stdlib.c — POSIX <stdlib.h> reimplementation for the browser port.
//
// `malloc`/`calloc`/`realloc` allocate fresh `Uint8Array`s; `free` is a
// no-op. The C engine doesn't really need a "single heap" model because
// `src/z/z_zone` builds its own block-allocator on top of one big
// `malloc` call at boot and manages the rest itself.
//
//-----------------------------------------------------------------------------

import type {
  malloc_fn, calloc_fn, realloc_fn, free_fn,
  atoi_fn, atof_fn, exit_fn,
} from "libc/stdlib.h";

export const malloc: malloc_fn = (size) => new Uint8Array(size);

export const calloc: calloc_fn = (count, size) => new Uint8Array(count * size);

export const realloc: realloc_fn = (ptr, size) => {
  if (!ptr) return new Uint8Array(size);
  const out = new Uint8Array(size);
  out.set(ptr.subarray(0, Math.min(ptr.length, size)));
  return out;
};

// JS GC reclaims unused buffers automatically — `free` exists only to keep
// the call shape identical to the original C.
export const free: free_fn = (_ptr) => { /* no-op */ };

export const atoi: atoi_fn = (s) => {
  const n = parseInt(s, 10);
  return Number.isNaN(n) ? 0 : n;
};

export const atof: atof_fn = (s) => {
  const n = parseFloat(s);
  return Number.isNaN(n) ? 0 : n;
};

export const exit: exit_fn = (code) => {
  throw new Error(`exit(${code})`);
};
