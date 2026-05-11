# w/ — WAD I/O

The archive reader for DOOM's data file format. "WAD" stands for "Where's All the Data" — a flat directory of named *lumps* (raw byte blobs) used to store every map, texture, sprite, sound, palette, font, and string table.

This is where the porting effort starts. Everything else (renderer, play, sound) eventually pulls bytes through `W_*` calls, so getting this right unblocks the rest of the project.

## Expected files

| File | Ported from | Purpose |
|------|-------------|---------|
| `w_wad.c.ts` | `w_wad.c` | `wadfile_info_t` array, lump directory, name hash, lump caching by tag |
| `w_wad.h.ts` | `w_wad.h` | Public API: `W_InitMultipleFiles`, `W_CheckNumForName`, `W_GetNumForName`, `W_LumpLength`, `W_ReadLump`, `W_CacheLumpNum`, `W_CacheLumpName` |

## Format notes (for the implementer)

- **WAD header**: 12 bytes — 4-byte identifier (`IWAD` or `PWAD`), `int32 LE` lump count, `int32 LE` directory offset.
- **Directory entry**: 16 bytes — `int32 LE` file offset, `int32 LE` size, 8-char name (null-padded, uppercase ASCII).
- Lump names use the first 8 bytes only; the high bit of the first byte was historically a "compressed" flag but is unused in shipping DOOM WADs — treat it defensively.
- The shareware `DOOM1.WAD` in `resources/` is the development target; full registered `DOOM.WAD` should also load identically.
- File reads should go through `libc/stdio` (`fopen` / `fread` / `fseek`) rather than calling `Bun.file` directly, so the WAD reader stays unaware of the runtime.
