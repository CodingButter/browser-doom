// Browser host entry. Bun loads this from `index.html`; we forward straight
// into the DOOM C entry point at `src/i/i_main.c`.
//
// `i_main.c` has no header in the original source, so we import from the
// `.c.ts` directly — entry points are the one place this is allowed (see
// `src/README.md`).
//
// Command-line arguments come from the URL query string. Each query key
// becomes a `-flag`, and its value (if any) becomes the following positional
// tokens, split on whitespace for multi-value flags like `-warp E M`:
//
//   index.html                              -> ["doom"]
//   index.html?devparm                      -> ["doom", "-devparm"]
//   index.html?skill=4                      -> ["doom", "-skill", "4"]
//   index.html?warp=1+1                     -> ["doom", "-warp", "1", "1"]
//   index.html?warp=1+1&skill=4&devparm     -> ["doom", "-warp", "1", "1",
//                                               "-skill", "4", "-devparm"]
//
// Reserved key `arg` injects raw tokens with no leading dash — useful for
// positional args after a flag like `-file`:
//
//   index.html?file&arg=doom1.wad           -> ["doom", "-file", "doom1.wad"]

import { main } from "i/i_main.c";

function buildArgv(): string[] {
  const argv: string[] = ["doom"];
  for (const [key, value] of new URLSearchParams(location.search)) {
    if (key === "arg") {
      // Escape hatch: raw positional tokens, no leading dash.
      if (value) argv.push(...value.split(/\s+/).filter(Boolean));
      continue;
    }
    argv.push(`-${key}`);
    if (value) {
      argv.push(...value.split(/\s+/).filter(Boolean));
    }
  }
  return argv;
}

const argv = buildArgv();
main(argv.length, argv);

// HMR: re-run main() on save when Bun's dev server hot-reloads this module.
if ((import.meta as any).hot) {
  (import.meta as any).hot.accept(() => {
    main(argv.length, argv);
  });
}
