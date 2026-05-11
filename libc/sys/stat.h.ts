//-----------------------------------------------------------------------------
//
// libc/sys/stat.h — POSIX <sys/stat.h> reimplementation for the browser port.
//
// DOOM only uses `fstat` to read file size for the `filelength()` helper
// in `w_wad.c`. We expose a `struct stat` with just `.st_size` for now;
// other fields can be added if a caller actually reads them.
//
// Caller pattern (matching the C):
//
//   const info: stat = { st_size: 0 };
//   if (fstat(handle, info) === -1) I_Error("stat failed");
//   return info.st_size;
//
//-----------------------------------------------------------------------------

export interface stat {
  st_size: number;
}

export type fstat_fn = (fd: number, out: stat) => number;

export { fstat } from "libc/sys/stat.c";
