# z/ — Zone memory allocator

DOOM's custom block allocator. Pre-allocates one big heap and serves variable-sized blocks from it with *purge tags* (`PU_STATIC`, `PU_CACHE`, `PU_LEVEL`, ...) so the engine can evict cache lumps under memory pressure.

In a TypeScript port the underlying allocator could be the JS GC, but porting the API (and the `PU_*` tag concept) faithfully matters: the rest of the engine calls `Z_Malloc(size, tag, user)` and expects user-pointer back-reference semantics. Backing it with a real `libc/stdlib` `malloc` over an `ArrayBuffer` heap keeps the semantics honest.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `z_zone.c.ts` / `z_zone.h.ts` | `z_zone.{c,h}` | `Z_Init`, `Z_Malloc`, `Z_Free`, `Z_FreeTags`, `Z_ChangeTag`, `Z_CheckHeap` |
