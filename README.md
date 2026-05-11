# browser-doom

A TypeScript port of id Software's `linuxdoom-1.10`, running in the browser on Bun.

![Issues closed](https://img.shields.io/github/issues-closed/CodingButter/browser-doom?label=ported&color=brightgreen)
![Issues open](https://img.shields.io/github/issues/CodingButter/browser-doom?label=remaining)
![Milestones](https://img.shields.io/github/milestones/all/CodingButter/browser-doom)

Progress is tracked as one [milestone](https://github.com/CodingButter/browser-doom/milestones) per subsystem folder (`src/w`, `src/r`, `src/p`, ...) with one issue per source/header pair.

## Run it

```bash
bun install
bun run dev   # Bun.serve() with HMR on http://localhost:3000
```

Drop a `DOOM1.WAD` (or `DOOM.WAD`) into `public/wads/` — it's gitignored. The shareware WAD is the development target.

## Layout

- `src/` — the DOOM port (one folder per original-source prefix; see [`src/README.md`](./src/README.md))
- `libc/` — reimplemented C standard library (`<stdio.h>`, `<stdlib.h>`, `<string.h>`, ...)
- `public/` — static assets served by the dev server
- `server.ts` — Bun dev server
- `index.html` / `index.ts` — browser host that boots into `src/i/i_main.c.ts`

## Reference

Original source lives in the sibling `OriginalSource/linuxdoom-1.10/` directory and on GitHub at [id-Software/DOOM](https://github.com/id-Software/DOOM). When in doubt, the original `.c` / `.h` file is authoritative.
