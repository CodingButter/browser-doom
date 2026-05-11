# m/ — Misc / menu / math

Grab-bag of utilities that don't belong to any single subsystem: command-line parsing, bounding-box math, cheat detection, the menu system, fixed-point math, the deterministic PRNG, and endian byte swapping.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `m_argv.c.ts` / `m_argv.h.ts` | `m_argv.{c,h}` | `M_CheckParm`, command-line flag lookup |
| `m_bbox.c.ts` / `m_bbox.h.ts` | `m_bbox.{c,h}` | Bounding-box helpers (clear, add point) |
| `m_cheat.c.ts` / `m_cheat.h.ts` | `m_cheat.{c,h}` | Sequential-key cheat code recognizer |
| `m_fixed.c.ts` / `m_fixed.h.ts` | `m_fixed.{c,h}` | 16.16 fixed-point math: `fixed_t`, `FixedMul`, `FixedDiv` |
| `m_menu.c.ts` / `m_menu.h.ts` | `m_menu.{c,h}` | Main menu, options, save / load UI |
| `m_misc.c.ts` / `m_misc.h.ts` | `m_misc.{c,h}` | Config file read/write, screenshots, default values |
| `m_random.c.ts` / `m_random.h.ts` | `m_random.{c,h}` | The 256-entry random table — `P_Random`, `M_Random` |
| `m_swap.c.ts` / `m_swap.h.ts` | `m_swap.{c,h}` | Endian swap macros (`SHORT`, `LONG`) for WAD reads on big-endian hosts |
