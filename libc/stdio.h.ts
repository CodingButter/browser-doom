//-----------------------------------------------------------------------------
//
// libc/stdio.h — POSIX <stdio.h> reimplementation for the browser port.
//
// Minimal `printf` for now — supports `%s`, `%d`/`%i`, `%x`, `%c`, `%f`,
// and `%%`. No width or precision modifiers yet; add when a caller needs
// one. Output goes to `console.log` (one call per `printf`, trailing
// newlines stripped to avoid double-spacing).
//
// `fopen` / `fread` / `fwrite` / `fseek` / `ftell` will land here when a
// caller actually needs them — they'd wrap the same `<unistd.h>` calls
// under a `FILE*` indirection. For now `w_wad.c` reads files directly
// through `open` + `read`, so they aren't urgent.
//
//-----------------------------------------------------------------------------

export type printf_fn = (fmt: string, ...args: unknown[]) => number;

export { printf } from "libc/stdio.c";
