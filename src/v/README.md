# v/ — Video framebuffer

A thin abstraction above `i/i_video`: holds the 320×200 paletted framebuffer, applies the current palette, draws patches and screen fills. Renderer / HUD / menu code blits *into* this; `i_video` blits the result *to the screen*.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `v_video.c.ts` / `v_video.h.ts` | `v_video.{c,h}` | `V_DrawPatch`, `V_DrawBlock`, `V_CopyRect`, palette and screen management |
