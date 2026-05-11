# i/ — Interface (platform layer)

The boundary between the engine and the operating system. In the original Linux DOOM these files use X11, OSS audio, BSD sockets, and SIGALRM-based timers. In this browser port they wrap Canvas / WebGL, the Web Audio API, `performance.now`, `requestAnimationFrame`, and (optionally) WebRTC or WebSockets for networking.

This folder is where the port deviates most from the original. The interface a `.h.ts` exposes should still match the original `i_*.h` signature; the implementation underneath is what's swapped.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `i_main.c.ts` | `i_main.c` | Process entry point. In the browser, this is what `index.ts` bootstraps. |
| `i_video.c.ts` / `i_video.h.ts` | `i_video.{c,h}` | Framebuffer → screen presentation, keyboard / mouse input |
| `i_sound.c.ts` / `i_sound.h.ts` | `i_sound.{c,h}` | Audio device backend: mix and play sound effects + music |
| `i_system.c.ts` / `i_system.h.ts` | `i_system.{c,h}` | Tic timer, error handlers (`I_Error`), OS abstractions |
| `i_net.c.ts` / `i_net.h.ts` | `i_net.{c,h}` | Network transport (datagram send / receive) |
