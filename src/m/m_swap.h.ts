//-----------------------------------------------------------------------------
//
// Port of: linuxdoom-1.10/m_swap.h
//
// Copyright (C) 1993-1996 by id Software, Inc.
//
// This source is available for distribution and/or modification
// only under the terms of the DOOM Source Code License as
// published by id Software. All rights reserved.
//
// The source is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// FITNESS FOR A PARTICULAR PURPOSE. See the DOOM Source Code License
// for more details.
//
// DESCRIPTION:
//   Endianess handling, swapping 16bit and 32bit. WAD files are stored
//   little-endian; `SHORT(x)` and `LONG(x)` convert one disk word to the
//   host's native representation. In the original C the macros expanded to
//   either an identity (on little-endian hosts) or a byte-swap call (on
//   big-endian hosts). In the TS port both are pure identity: every WAD
//   byte read goes through `DataView` with `littleEndian=true`, so the
//   value reaches `SHORT`/`LONG` already correct.
//
//-----------------------------------------------------------------------------

export type SHORT_fn = (x: number) => number;
export type LONG_fn = (x: number) => number;

export { LONG, SHORT } from "m/m_swap.c";
