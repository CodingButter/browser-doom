// Async asset preloader. Runs once before `main()` to fetch any WAD/PWAD
// files referenced in argv and register their bytes with the VFS. Each
// fetched URL is normalized to a stable virtual path (host + pathname, no
// scheme/query/fragment, lowercased) and the argv is rewritten so the
// engine sees the VFS path instead of the original URL. From `main()`
// onward, ported code calls `open`/`read`/`lseek`/`close` synchronously
// against the in-memory VFS — exactly like the original C.

import { vfsRegister } from "libc/fcntl.h";

// argv flags whose following token is a WAD/PWAD/DEH file URL or path.
// Matches the original DOOM command-line conventions.
const FETCH_FLAGS = new Set(["-iwad", "-file", "-pwad", "-deh"]);

/**
 * Convert any URL (absolute, relative, same-origin path) to a stable VFS
 * path. Strips scheme, query, and fragment. Keeps host + pathname.
 *
 *   https://example.com/wads/Doom1.WAD?v=2  →  example.com/wads/doom1.wad
 *   /wads/Doom1.WAD                          →  <location.host>/wads/doom1.wad
 *   Doom1.WAD                                →  resolved against location, then normalized
 */
export function urlToVPath(url: string): string {
  const u = new URL(url, location.href);
  return (u.host + decodeURIComponent(u.pathname)).toLowerCase();
}

async function fetchAsBytes(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`asset preload: ${url} → ${res.status} ${res.statusText}`);
  }
  return new Uint8Array(await res.arrayBuffer());
}

/**
 * Scan argv for `-iwad`/`-file`/`-pwad`/`-deh` followed by a URL or path,
 * fetch each (in parallel), register the bytes in the VFS, and return a
 * new argv with the URL slots replaced by VFS paths.
 *
 * Throws if any fetch fails — the engine has no graceful fallback for a
 * missing WAD, and surfacing the failure early is friendlier than
 * letting `W_AddFile` print "couldn't open" after boot.
 */
export async function preloadAssets(argv: string[]): Promise<string[]> {
  // Pass 1: collect every (argv index, url) pair that needs fetching.
  const tasks: Array<{ index: number; url: string; vpath: string }> = [];
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag !== undefined && FETCH_FLAGS.has(flag) && i + 1 < argv.length) {
      const url = argv[i + 1]!;
      tasks.push({ index: i + 1, url, vpath: urlToVPath(url) });
      i++; // skip the value we just consumed
    }
  }

  // Pass 2: fetch every URL in parallel.
  const buffers = await Promise.all(tasks.map((t) => fetchAsBytes(t.url)));

  // Pass 3: register bytes in VFS and rewrite argv to point at VFS paths.
  const out = [...argv];
  for (let k = 0; k < tasks.length; k++) {
    const task = tasks[k]!;
    vfsRegister(task.vpath, buffers[k]!);
    out[task.index] = task.vpath;
    console.log(
      `[assets] preloaded ${task.url} → ${task.vpath} (${buffers[k]!.length} bytes)`
    );
  }
  return out;
}
