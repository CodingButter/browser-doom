//-----------------------------------------------------------------------------
//
// libc/string.c — POSIX <string.h> reimplementation for the browser port.
//
// Two flavors: text functions take JS strings, buffer functions take
// Uint8Arrays. See the header for the split rule.
//
//-----------------------------------------------------------------------------

import type {
  strlen_fn, strcmp_fn, strncmp_fn, strcasecmp_fn,
  strcpy_fn, strncpy_fn,
  memset_fn, memcpy_fn, memmove_fn, memcmp_fn,
} from "libc/string.h";

// ---------- text ----------

export const strlen: strlen_fn = (s) => s.length;

export const strcmp: strcmp_fn = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export const strncmp: strncmp_fn = (a, b, n) => {
  const limit = Math.min(n, a.length, b.length);
  for (let i = 0; i < limit; i++) {
    const ca = a.charCodeAt(i);
    const cb = b.charCodeAt(i);
    if (ca !== cb) return ca - cb;
  }
  // One side ran out of characters before reaching n — shorter side wins.
  if (limit < n) {
    if (a.length < b.length) return -1;
    if (a.length > b.length) return 1;
  }
  return 0;
};

export const strcasecmp: strcasecmp_fn = (a, b) =>
  strcmp(a.toLowerCase(), b.toLowerCase());

// ---------- buffer ----------

export const strcpy: strcpy_fn = (dst, src) => {
  let i = 0;
  for (; i < src.length; i++) dst[i] = src.charCodeAt(i) & 0xff;
  dst[i] = 0; // null terminator
  return dst;
};

export const strncpy: strncpy_fn = (dst, src, n) => {
  let i = 0;
  for (; i < n && i < src.length; i++) dst[i] = src.charCodeAt(i) & 0xff;
  // C semantics: if src is shorter than n, the rest is zero-padded.
  // If src is at least n, no null terminator is written.
  for (; i < n; i++) dst[i] = 0;
  return dst;
};

export const memset: memset_fn = (buf, value, n) => {
  buf.fill(value & 0xff, 0, n);
  return buf;
};

export const memcpy: memcpy_fn = (dst, src, n) => {
  dst.set(src.subarray(0, n));
  return dst;
};

export const memmove: memmove_fn = (dst, src, n) => {
  // Handle overlap. If dst is ahead of src in the same buffer, copy in
  // reverse so we don't clobber bytes we haven't read yet.
  if (dst.buffer === src.buffer && dst.byteOffset > src.byteOffset) {
    for (let i = n - 1; i >= 0; i--) dst[i] = src[i]!;
  } else {
    dst.set(src.subarray(0, n));
  }
  return dst;
};

export const memcmp: memcmp_fn = (a, b, n) => {
  for (let i = 0; i < n; i++) {
    const diff = a[i]! - b[i]!;
    if (diff !== 0) return diff;
  }
  return 0;
};
