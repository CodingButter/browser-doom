# am/ — Automap

The top-down level map overlay shown when the player presses Tab. Draws lines (walls), the player marker, things (in IDDT cheat mode), and the grid.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `am_map.c.ts` | `am_map.c` | Automap state, input handling, line/grid drawing |
| `am_map.h.ts` | `am_map.h` | Public API: `AM_Responder`, `AM_Ticker`, `AM_Drawer`, `AM_Stop` |
