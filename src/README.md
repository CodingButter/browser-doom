# src/ — DOOM source port

A TypeScript port of `linuxdoom-1.10` from id Software's official DOOM release. This folder contains *only* the engine itself; the reimplemented C standard library it depends on lives at `../libc/`.

## Conventions

### Folder layout

The original source is flat. Here we group by the short-prefix namespace baked into the original filenames (`w_wad.c` → `w/w_wad.c.ts`). Filenames keep their prefix so `grep` and cross-references against the original source stay 1:1.

### `.c.ts` and `.h.ts` — the C source/header split

Every original C source/header pair maps to a TypeScript file pair: `foo.c` → `foo.c.ts`, `foo.h` → `foo.h.ts`.

In C, the two files play very different roles. A `.h` file contains *declarations only* (function prototypes, type definitions, extern variable declarations) — it's a promise that some name exists with a particular signature. The `.c` file contains the *definition* (the actual function body, the variable storage). When `bar.c` does `#include "foo.h"`, the preprocessor pastes the declarations in and the compiler trusts them; the linker later wires those calls up to the real bodies in `foo.o`. So C consumers `#include` headers and transparently get the implementations.

TypeScript / ES modules have no separate link step — every imported name has to resolve at module-load time. So we reproduce the C *user experience* (always `#include` the header, get the function) by making the `.h.ts` **re-export** the implementations from the matching `.c.ts`.

Every exported function uses a **typed-const pattern with a `_fn` signature alias** declared in the header. This makes TS catch implementation/header signature mismatches at the definition site — the same experience a C compiler gives when a `.c` function doesn't match the `.h` prototype.

```ts
// src/m/m_random.h.ts — the header
// Function signatures declared as type aliases (the "prototypes")
export type P_Random_fn = () => number;
export type M_ClearRandom_fn = () => void;

// "Linker" — re-export the implementations to consumers
export { P_Random, M_ClearRandom } from "./m_random.c";
```

```ts
// src/m/m_random.c.ts — the translation unit
import type { P_Random_fn, M_ClearRandom_fn } from "./m_random.h";

let rndindex = 0;                                    // C: static, file-local
const rndtable = new Uint8Array([0, 8, 109, 220, /* ... */]);

// Typed const: TS errors here if the body doesn't match P_Random_fn
export const P_Random: P_Random_fn = () => {
  rndindex = (rndindex + 1) & 0xff;
  return rndtable[rndindex]!;
};

export const M_ClearRandom: M_ClearRandom_fn = () => { rndindex = 0; };
```

```ts
// any consumer: import the header, just like #include
import { P_Random } from "../m/m_random.h";
const dmg = (P_Random() & 7) + 1;
```

Use this pattern for **every** exported function. Yes, it's more verbose than `export function`, but the compiler-enforced signature match is the point — without it, you can change a function's body to take wrong arguments and TS won't complain until something far away breaks.

### What goes in which file

| Lives in `.c.ts` | Lives in `.h.ts` |
|---|---|
| `export const foo: foo_fn = (...) => { ... }` — typed implementation | `export type foo_fn = (...) => ...;` (signature)<br>`export { foo } from "./foo.c"` (re-export) |
| `export const FRACBITS = 16` — `#define`-style constant | `export { FRACBITS } from "./foo.c"` — re-export |
| `export let leveltime = 0` — extern variable storage | `export { leveltime } from "./foo.c"` — re-export |
| `const helper: helper_fn = (...) => { ... }` — not exported (C `static`) | *(nothing — private to the .c)* |
| `let counter = 0` — not exported (file-local state) | *(nothing — private to the .c)* |
| | `export type fixed_t = number` — pure type |
| | `export interface mobj_t { ... }` — struct shape |
| | `export const enum cardtype_t { ... }` — pure enum |

Rule of thumb: **all runtime values** (functions, constants, variables) live in `.c.ts` and are re-exported by `.h.ts`. **Pure types** (`type`, `interface`, `enum`, struct shapes) live directly in `.h.ts`. Keeping the runtime-value flow one-way (`.c.ts` → `.h.ts`) is what guarantees no circular dependency at runtime.

If a `.c.ts` needs a type from its own header, use a type-only import — it's erased at compile time and forms no runtime cycle:

```ts
// src/p/p_mobj.c.ts
import type { mobj_t } from "./p_mobj.h";   // erased, no cycle
```

This trades one ergonomic detail against safety: constants that conceptually "belong" in headers (the C `#define` instinct) live in the `.c.ts` here. The header re-exports them, so consumers see no difference — `import { FRACBITS } from "./m_fixed.h"` works exactly as expected.

### File header block

Every ported file (`.c.ts` and `.h.ts`) starts with the same block. It preserves what the DOOM Source Code License requires — id's copyright and the warranty disclaimer — and drops the artifacts that don't survive the move out of C / RCS / Emacs.

Template:

```ts
//-----------------------------------------------------------------------------
//
// Port of: linuxdoom-1.10/<original-filename>
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
//   One-to-three lines describing what this file is responsible for.
//   For ports of a C file, the description from the original works well;
//   add a sentence about TS-specific divergences if relevant.
//
//-----------------------------------------------------------------------------
```

Dropped vs. the original block:

| Field in original | Action |
|---|---|
| `// Emacs style mode select -*- C++ -*-` | drop (editor metadata, wrong language) |
| `$Id:$` / `$Log:$` | drop (RCS keywords; git doesn't expand them) |
| `static const char rcsid[] = "..."` after the block | drop (same reason) |
| `#pragma interface`, `__GNUG__` ifdefs | drop (GCC-specific) |

Added:

- **`Port of:` field**, pointing at the exact original file under `OriginalSource/linuxdoom-1.10/`. Makes it one search-away to jump from a ported `.c.ts` to the C it was derived from.

### C-isms we drop

A few C header conventions have no analog in TS and should be omitted when porting:

- **Header guards** (`#ifndef __W_WAD__ / #define __W_WAD__ / #endif`, or `#pragma once`). ES modules cache by resolved path — a `.h.ts` is loaded once no matter how many places import it. The guard pattern exists to work around C's text-paste `#include`; there's nothing to guard against here.
- **`extern` keyword on declarations.** In C, `extern int foo;` in a header declares that storage lives elsewhere. In TS, an `export let foo = 0` in the `.c.ts` *is* the storage; the header just re-exports it. No `extern` needed.

### Imports

- **Within the port**: always import from headers. `import { W_GetNumForName } from "../w/w_wad.h";`. Never import a `.c.ts` from another subsystem — the header is the contract.
- **Exception**: a few original sources have no `.h` (notably `i_main.c`, just entry-point glue). Those are imported directly from `.c.ts` by their single caller — for `i_main.c.ts`, that caller is the browser host `index.ts` at the project root.
- **From the reimplemented libc**: use the `libc/` path alias from `tsconfig.json`. `import { fopen, fread } from "libc/stdio.h";` — mirrors `#include <stdio.h>`.

## Subsystems

| Folder | Subsystem | Summary |
|--------|-----------|---------|
| [`am/`](./am/README.md) | automap | Top-down level map (Tab key) |
| [`d/`](./d/README.md) | doom core | Global defs, types, events, main loop, net, string tables |
| [`data/`](./data/README.md) | data tables | Mobj/state/sprite/sound tables, trig tables (`info`, `sounds`, `tables`) |
| [`f/`](./f/README.md) | finale | End-of-episode story screens, melt-wipe transition |
| [`g/`](./g/README.md) | game | Game state machine, demos, save/load orchestration |
| [`hu/`](./hu/README.md) | heads-up | HUD message lines, font drawing |
| [`i/`](./i/README.md) | interface | Platform layer — browser-specific code lives here |
| [`m/`](./m/README.md) | misc / menu / math | argv, bbox, cheats, fixed-point, menu, random, byte-swap |
| [`p/`](./p/README.md) | play | Game simulation: physics, AI, doors, lifts, save/load, map setup |
| [`r/`](./r/README.md) | renderer | Software 3D BSP renderer: walls, planes, sprites, sky |
| [`s/`](./s/README.md) | sound | High-level sound API (channels, 3D positioning) |
| [`st/`](./st/README.md) | status bar | Bottom HUD: face, health, armor, ammo, keys |
| [`v/`](./v/README.md) | video | Framebuffer abstraction above `i/i_video` |
| [`w/`](./w/README.md) | WAD | Archive file reader — "Where's All the Data" |
| [`wi/`](./wi/README.md) | intermission | Between-level kill/items/secrets stats screen |
| [`z/`](./z/README.md) | zone | Block-based memory allocator with purge tags |

## Reference

The unmodified source we're porting from lives at `../../OriginalSource/linuxdoom-1.10/`. When in doubt, the original `.c` / `.h` file is authoritative.
