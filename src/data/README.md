# data/ — Static data tables

The original unprefixed top-level data files: large static arrays that drive the game. These are pure data, not behavior — kept in their own folder so simulation code doesn't blur with table definitions.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `info.c.ts` / `info.h.ts` | `info.{c,h}` | `states[]`, `mobjinfo[]`, sprite / state / action enums — the heart of every enemy, weapon, projectile, decoration |
| `sounds.c.ts` / `sounds.h.ts` | `sounds.{c,h}` | `S_sfx[]`, `S_music[]` — sound effect and music lump tables |
| `tables.c.ts` / `tables.h.ts` | `tables.{c,h}` | Precomputed `finesine[]`, `finecosine[]`, `finetangent[]`, `tantoangle[]` lookup tables |
