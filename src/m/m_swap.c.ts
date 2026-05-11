//-----------------------------------------------------------------------------
//
// Port of: linuxdoom-1.10/m_swap.c
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
//   little-endian; `SHORT` and `LONG` convert one disk word to the host's
//   native representation. TS-specific divergence: WAD reads always go
//   through `DataView` with `littleEndian=true`, so the value is already
//   correct by the time it reaches us — `SHORT` and `LONG` are identity
//   functions here. The original `SwapSHORT` / `SwapLONG` helpers existed
//   only to support big-endian hosts and are omitted; if a future caller
//   needs an actual byte swap, use `DataView` directly.
//
//-----------------------------------------------------------------------------

import type { LONG_fn, SHORT_fn } from "m/m_swap.h";

export const SHORT: SHORT_fn = (x) => x;
export const LONG: LONG_fn = (x) => x;