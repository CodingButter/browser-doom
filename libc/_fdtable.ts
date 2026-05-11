//-----------------------------------------------------------------------------
//
// libc/_fdtable — internal file-descriptor table for the libc layer.
//
// `open()` (in `libc/fcntl.c`) creates handles here; `read`/`close`/`lseek`
// (in `libc/unistd.c`) and `fstat` (in `libc/sys/stat.c`) read and mutate
// them. Not for direct import by engine code — go through the public
// `<unistd.h>` / `<fcntl.h>` / `<sys/stat.h>` headers instead.
//
//-----------------------------------------------------------------------------

export interface VHandle {
  bytes: Uint8Array;
  cursor: number;
}

const handles = new Map<number, VHandle>();
let nextFd = 3; // 0/1/2 reserved for stdin/stdout/stderr by POSIX convention

export function fdtableOpen(bytes: Uint8Array): number {
  const fd = nextFd++;
  handles.set(fd, { bytes, cursor: 0 });
  return fd;
}

export function fdtableGet(fd: number): VHandle | undefined {
  return handles.get(fd);
}

export function fdtableClose(fd: number): boolean {
  return handles.delete(fd);
}
