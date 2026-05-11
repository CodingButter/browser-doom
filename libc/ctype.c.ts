//-----------------------------------------------------------------------------
//
// libc/ctype.c — POSIX <ctype.h> reimplementation for the browser port.
//
// ASCII character classification and case conversion. Single-byte only —
// DOOM only operates on ASCII (WAD lump names are uppercase ASCII, cheat
// codes too), so we skip glibc's locale machinery.
//
// All five functions take and return `number` (C's `int`). The `is*`
// family returns 0 or 1 to match C's "nonzero = true" convention; `to*`
// returns the converted char code or the input unchanged when it's
// outside the convertible range.
//
//-----------------------------------------------------------------------------

import type { isdigit_fn, isalpha_fn, isspace_fn, toupper_fn, tolower_fn } from "libc/ctype.h";

export const isdigit: isdigit_fn = (c) =>
    (c >= 0x30 /* '0' */ && c <= 0x39 /* '9' */) ? 1 : 0;

export const isalpha: isalpha_fn = (c) =>
    ((c >= 0x41 /* 'A' */ && c <= 0x5A /* 'Z' */) ||
     (c >= 0x61 /* 'a' */ && c <= 0x7A /* 'z' */)) ? 1 : 0;

export const isspace: isspace_fn = (c) =>
    (c === 0x20 /* ' ' */ || (c >= 0x09 /* '\t' */ && c <= 0x0D /* '\r' */)) ? 1 : 0;

export const toupper: toupper_fn = (c) =>
    (c >= 0x61 /* 'a' */ && c <= 0x7A /* 'z' */) ? (c - 0x20) : c;

export const tolower: tolower_fn = (c) =>
    (c >= 0x41 /* 'A' */ && c <= 0x5A /* 'Z' */) ? (c + 0x20) : c;
