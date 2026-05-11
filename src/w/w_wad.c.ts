//-----------------------------------------------------------------------------
//
// Port of: linuxdoom-1.10/w_wad.c
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
//   Handles WAD file header, directory, lump I/O. Owns the global lump
//   directory (`lumpinfo`), the lump cache (`lumpcache`), and the count
//   (`numlumps`). TS-specific divergence: file I/O is done through
//   `fetch()` + `DataView` rather than POSIX `open`/`read`/`lseek`,
//   and `void*` lump pointers become `Uint8Array` references.
//
//-----------------------------------------------------------------------------

import type { lumpinfo_t } from "w/w_wad.h";

export let lumpcache: (Uint8Array | null)[] = [];
export let lumpinfo: lumpinfo_t[] = [];
export let numlumps = 0;