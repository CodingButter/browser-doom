# g/ — Game

The game state machine. Owns the level lifecycle, demos, save/load orchestration, and per-tick input dispatch.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `g_game.c.ts` / `g_game.h.ts` | `g_game.{c,h}` | Game flow: skill selection, level start/exit, demo record/playback, save/load, building `ticcmd_t` from input |
