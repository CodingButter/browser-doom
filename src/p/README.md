# p/ — Play (game simulation)

The simulation half of the engine — everything that runs each tic to advance the game world. Movement and collision, monster AI, doors, lifts, switches, teleporters, the player thinker, and save/load.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `p_ceilng.c.ts` | `p_ceilng.c` | Moving ceilings and crushers |
| `p_doors.c.ts` | `p_doors.c` | Door open/close logic |
| `p_enemy.c.ts` | `p_enemy.c` | Monster AI: chase, look, attack action functions |
| `p_floor.c.ts` | `p_floor.c` | Moving floors |
| `p_inter.c.ts` / `p_inter.h.ts` | `p_inter.{c,h}` | Touch interactions: pickups, damage, monster infighting |
| `p_lights.c.ts` | `p_lights.c` | Sector light effects (flicker, strobe, glow) |
| `p_local.h.ts` | `p_local.h` | Internal play-subsystem shared defs |
| `p_map.c.ts` | `p_map.c` | Movement clipping: `P_TryMove`, `P_CheckPosition`, hitscan |
| `p_maputl.c.ts` | `p_maputl.c` | Map geometry utilities (point/line distance, blockmap iter) |
| `p_mobj.c.ts` / `p_mobj.h.ts` | `p_mobj.{c,h}` | `mobj_t` — every object in the world (monster, projectile, decoration) |
| `p_plats.c.ts` | `p_plats.c` | Moving platforms / lifts |
| `p_pspr.c.ts` / `p_pspr.h.ts` | `p_pspr.{c,h}` | Player sprite (the first-person weapon view) |
| `p_saveg.c.ts` / `p_saveg.h.ts` | `p_saveg.{c,h}` | Savegame serialize / deserialize |
| `p_setup.c.ts` / `p_setup.h.ts` | `p_setup.{c,h}` | Load a level from WAD lumps into runtime structures |
| `p_sight.c.ts` | `p_sight.c` | Line-of-sight tests (monsters see player) |
| `p_spec.c.ts` / `p_spec.h.ts` | `p_spec.{c,h}` | Special line and sector behavior dispatch |
| `p_switch.c.ts` | `p_switch.c` | Wall switches (toggle textures, trigger effects) |
| `p_telept.c.ts` | `p_telept.c` | Teleporters |
| `p_tick.c.ts` / `p_tick.h.ts` | `p_tick.{c,h}` | Thinker list, tic dispatch |
| `p_user.c.ts` | `p_user.c` | The player thinker (movement, weapon switching, view bob) |
