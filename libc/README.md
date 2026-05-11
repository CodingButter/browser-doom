# libc/ — Reimplemented C standard library

The functions DOOM expects from `<stdio.h>`, `<stdlib.h>`, `<string.h>`, etc., reimplemented in TypeScript so the port can stay close to the original C without leaning on Node / Bun runtime equivalents where it matters.

Lives at the project root (sibling of `src/`) rather than inside the port itself — `src/` is the DOOM source, this is the native layer it sits on.

## Importing

`tsconfig.json` defines a `libc/*` path alias that maps to this folder, so imports look almost exactly like C `#include` lines:

```ts
// Like: #include <stdio.h>
import { fopen, fread, FILE } from "libc/stdio.h";

// Like: #include <string.h>
import { memcpy, memset } from "libc/string.h";

// Like: #include <stdlib.h>
import { malloc, free } from "libc/stdlib.h";
```

Always import from the `.h` form. The `.h.ts` file re-exports the actual implementations from its matching `.c.ts` (the "translation unit") plus any pure type declarations. You never import a `.c.ts` directly — mirrors C, where you `#include` headers and let the linker pick up the source.

## Expected files (starter set)

| File | Mirrors | Notable contents |
|------|---------|------------------|
| `stdio.c.ts` / `stdio.h.ts` | `<stdio.h>` | `FILE`, `fopen`, `fclose`, `fread`, `fwrite`, `fseek`, `ftell`, `printf`, `sprintf`, `fprintf` |
| `stdlib.c.ts` / `stdlib.h.ts` | `<stdlib.h>` | `malloc`, `calloc`, `realloc`, `free`, `atoi`, `atof`, `exit`, `getenv` |
| `string.c.ts` / `string.h.ts` | `<string.h>` | `strcpy`, `strncpy`, `strcmp`, `strncmp`, `strlen`, `strcat`, `strchr`, `memcpy`, `memmove`, `memset`, `memcmp` |
| `ctype.c.ts` / `ctype.h.ts` | `<ctype.h>` | `isdigit`, `isalpha`, `isspace`, `toupper`, `tolower` |
| `math.c.ts` / `math.h.ts` | `<math.h>` | `sin`, `cos`, `tan`, `atan`, `atan2`, `sqrt`, `abs`, `floor`, `ceil` |
| `time.c.ts` / `time.h.ts` | `<time.h>` | `time`, `clock`, `localtime` |
| `errno.c.ts` / `errno.h.ts` | `<errno.h>` | `errno` global plus `E*` constants |

Likely additions once porting hits POSIX-specific code: `fcntl.h`, `unistd.h`, `sys/types.h`, `sys/stat.h`, `signal.h`. For nested POSIX paths like `sys/stat.h`, the existing `libc/*` alias already covers them — `import "libc/sys/stat.h"` resolves to `./libc/sys/stat.h.ts`.

## Implementation guidance

- A "C pointer" usually maps to a `Uint8Array` view + a numeric offset, not a JS object reference. Keep this consistent across libc so memory passed between subsystems stays interchangeable.
- `malloc` here should be a thin allocator over a single `ArrayBuffer` heap, not `new`. That preserves the engine's ability to reason about memory the way it does in C (and lets `src/z/z_zone` sit on top realistically).
- Where the libc API takes a `char *`, the TS signature should take `Uint8Array` (or a `(buf, offset)` pair). Use a small helper at the boundary to convert from JS strings — don't fold that conversion into every function.
