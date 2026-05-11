# st/ — Status bar

The bottom-of-screen HUD: face graphic, health, armor, ammo counts, weapon arms, keys, and the face animation.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `st_lib.c.ts` / `st_lib.h.ts` | `st_lib.{c,h}` | Reusable widgets: number, percent, multi-icon |
| `st_stuff.c.ts` / `st_stuff.h.ts` | `st_stuff.{c,h}` | Status bar logic, face state, pickup flashing |
