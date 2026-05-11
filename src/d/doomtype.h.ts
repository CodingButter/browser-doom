//-----------------------------------------------------------------------------
//
// Port of: linuxdoom-1.10/doomtype.h
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
//   Simple basic typedefs, isolated here to make it easier separating
//   modules.
//
//-----------------------------------------------------------------------------
export const MAXCHAR = 0x7f   // max signed character value (127)
export const MAXSHORT = 0x7fff // max signed short integer value (32_767)
export const MAXINT = 0x7fffffff // max signed integer value (2_147_483_647)
export const MAXLONG = 0x7fffffff // max signed long integer value (2_147_483_647)

export const MINCHAR = -0x80 // min signed character value (-128)
export const MINSHORT = -0x8000 // min signed short integer value (-32_768)
export const MININT = -0x80000000 // min signed integer value (-2_147_483_648)
export const MINLONG = -0x80000000 // min signed long integer value (-2_147_483_648)