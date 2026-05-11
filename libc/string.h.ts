//-----------------------------------------------------------------------------
//
// libc/string.h — POSIX <string.h> reimplementation for the browser port.
//
// Two flavors of "string" functions:
//
//   - The text-shaped ones (`strlen`, `strcmp`, `strncmp`, `strcasecmp`)
//     operate on JS strings — that's the most idiomatic TS form for
//     ASCII text that was a `char*` in C.
//
//   - The buffer-shaped ones (`strcpy`, `strncpy`, `memset`, `memcpy`,
//     `memmove`, `memcmp`) operate on `Uint8Array` — they're really
//     filling or comparing raw byte arrays in the original C.
//
// Pick the flavor that matches what the C call site was doing. If the C
// passed a `char*` that was treated as text (compared with `strncmp`,
// length checked with `strlen`), it's text → JS string. If the C was
// `memset`-ing or filling a fixed-size array, it's a buffer → Uint8Array.
//
//-----------------------------------------------------------------------------

export type strlen_fn     = (s: string) => number;
export type strcmp_fn     = (a: string, b: string) => number;
export type strncmp_fn    = (a: string, b: string, n: number) => number;
export type strcasecmp_fn = (a: string, b: string) => number;

export type strcpy_fn  = (dst: Uint8Array, src: string) => Uint8Array;
export type strncpy_fn = (dst: Uint8Array, src: string, n: number) => Uint8Array;

export type memset_fn  = (buf: Uint8Array, value: number, n: number) => Uint8Array;
export type memcpy_fn  = (dst: Uint8Array, src: Uint8Array, n: number) => Uint8Array;
export type memmove_fn = (dst: Uint8Array, src: Uint8Array, n: number) => Uint8Array;
export type memcmp_fn  = (a: Uint8Array, b: Uint8Array, n: number) => number;

export {
  strlen, strcmp, strncmp, strcasecmp,
  strcpy, strncpy,
  memset, memcpy, memmove, memcmp,
} from "libc/string.c";
