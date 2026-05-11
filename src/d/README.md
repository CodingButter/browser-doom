# d/ — DOOM core

The kernel of the engine: global types, the event system, the main loop, network glue, and shared state. Holds files prefixed `d_` plus the small group of unprefixed top-level files (`doom*`, `dstrings*`) that semantically belong here.

## Expected files

### Headers (types and structs)
| File | Ported from | Purpose |
|------|-------------|---------|
| `d_englsh.h.ts` | `d_englsh.h` | English string table (`HUSTR_*`, `PHUSTR_*`, ...) |
| `d_french.h.ts` | `d_french.h` | French string table (compile-time alternative) |
| `d_event.h.ts` | `d_event.h` | `event_t`, `evtype_t` — input event records |
| `d_player.h.ts` | `d_player.h` | `player_t` — per-player state |
| `d_textur.h.ts` | `d_textur.h` | Texture-related type defs |
| `d_think.h.ts` | `d_think.h` | `thinker_t` — base "class" for game-world things |
| `d_ticcmd.h.ts` | `d_ticcmd.h` | `ticcmd_t` — one tic of input (forward/side/turn/buttons) |
| `doomdata.h.ts` | `doomdata.h` | On-disk WAD lump structs (vertexes, linedefs, sidedefs, sectors, ...) |
| `doomtype.h.ts` | `doomtype.h` | Primitives: `boolean`, `byte`, ... |

### Source / header pairs
| File | Ported from | Purpose |
|------|-------------|---------|
| `d_items.c.ts` / `d_items.h.ts` | `d_items.{c,h}` | `weaponinfo[]` — weapon definitions |
| `d_main.c.ts` / `d_main.h.ts` | `d_main.{c,h}` | Startup, main loop, command-line dispatch |
| `d_net.c.ts` / `d_net.h.ts` | `d_net.{c,h}` | Tic sync, netbuffer management |
| `doomdef.c.ts` / `doomdef.h.ts` | `doomdef.{c,h}` | Master defines: skill, gametype, version |
| `doomstat.c.ts` / `doomstat.h.ts` | `doomstat.{c,h}` | Global game-state variables |
| `dstrings.c.ts` / `dstrings.h.ts` | `dstrings.{c,h}` | In-game strings, level names, cheat codes |
