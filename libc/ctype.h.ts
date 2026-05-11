//-----------------------------------------------------------------------------
//
// libc/ctype.h — POSIX <ctype.h> reimplementation for the browser port.
//
// Function signatures for the ASCII character classification (`is*`) and
// case conversion (`to*`) helpers. Implementations live in `libc/ctype.c.ts`.
//
//-----------------------------------------------------------------------------

export type isdigit_fn = (c: number) => number;
export type isalpha_fn = (c: number) => number;
export type isspace_fn = (c: number) => number;
export type toupper_fn = (c: number) => number;
export type tolower_fn = (c: number) => number;

export { isdigit, isalpha, isspace, toupper, tolower } from "libc/ctype.c";

