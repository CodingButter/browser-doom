# hu/ — Heads-up display

Pop-up message lines at the top of the screen and the font / text-widget system used to draw them.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `hu_lib.c.ts` / `hu_lib.h.ts` | `hu_lib.{c,h}` | Text widgets: scrolling text line, input prompt |
| `hu_stuff.c.ts` / `hu_stuff.h.ts` | `hu_stuff.{c,h}` | HUD logic, message scheduling, font initialization |
