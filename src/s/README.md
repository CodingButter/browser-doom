# s/ — Sound (high-level)

The platform-independent sound API: channel allocation, 3D distance / pan attenuation, music playback. Sits above `i/i_sound`, which actually pushes samples to the audio device.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `s_sound.c.ts` / `s_sound.h.ts` | `s_sound.{c,h}` | `S_StartSound`, `S_StopSound`, `S_ChangeMusic`, channel management |
