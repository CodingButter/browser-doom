# r/ — Renderer

The software 3D BSP renderer. Walks the level's BSP tree front-to-back per frame, draws walls (segs), floors and ceilings (planes), sprites (things), and the sky. Output is a column-major 256-color framebuffer.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `r_bsp.c.ts` / `r_bsp.h.ts` | `r_bsp.{c,h}` | BSP tree traversal, subsector dispatch |
| `r_data.c.ts` / `r_data.h.ts` | `r_data.{c,h}` | Texture composition from patches; flats; colormaps |
| `r_defs.h.ts` | `r_defs.h` | Renderer-internal structs: `vertex_t`, `line_t`, `side_t`, `sector_t`, `seg_t`, `subsector_t`, `node_t`, `vissprite_t` |
| `r_draw.c.ts` / `r_draw.h.ts` | `r_draw.{c,h}` | Column and span drawing primitives — the inner loops |
| `r_local.h.ts` | `r_local.h` | Renderer-internal umbrella include |
| `r_main.c.ts` / `r_main.h.ts` | `r_main.{c,h}` | Frame entry, view setup, point-to-angle, scale-from-global-angle |
| `r_plane.c.ts` / `r_plane.h.ts` | `r_plane.{c,h}` | Floor and ceiling rendering (visplane management) |
| `r_segs.c.ts` / `r_segs.h.ts` | `r_segs.{c,h}` | Wall (seg) rendering: solid, masked, sky portals |
| `r_sky.c.ts` / `r_sky.h.ts` | `r_sky.{c,h}` | Sky column rendering |
| `r_state.h.ts` | `r_state.h` | Renderer global state (level-loaded structures) |
| `r_things.c.ts` / `r_things.h.ts` | `r_things.{c,h}` | Sprite rendering, player view-sprite drawing |
