//-----------------------------------------------------------------------------
//
// Port of: linuxdoom-1.10/i_main.c
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
//   Main program. Calls D_DoomMain() after stashing argc/argv into the
//   m_argv globals. In this browser port, host `index.ts` imports `main`
//   and invokes it on page load.
//
//   (Convention exception: i_main has no .h in the original, so this file
//   exports `main` directly and uses a plain `export function` rather than
//   the typed-const + _fn pattern — see src/README.md.)
//
//-----------------------------------------------------------------------------

export function main(argc: number, argv: string[]): number {
  // TODO: assign myargc / myargv (m_argv) and call D_DoomMain() once
  // src/m/m_argv.c.ts and src/d/d_main.c.ts exist.
  console.log(`[DOOM] i_main.c boot — argc=${argc}, argv=${JSON.stringify(argv)}`);
  return 0;
}
