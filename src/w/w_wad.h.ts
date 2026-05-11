export interface wadinfo_t{
    identification: string;
    numlumps: number;
    infotableofs: number;
}

export interface filelump_t {
    filepos: number;
    size: number;
    name: string;
}

export interface lumpinfo_t {
    name: string;
    handle: number;
    position: number;
    size: number;
}

export { lumpcache, lumpinfo, numlumps } from "w/w_wad.c";

export type W_InitMultipleFiles_fn = (filenames: string[]) => void;
export type W_Reload_fn = () => void;

export type W_CheckNumForName_fn = (name: string) => number;
export type W_GetNumForName_fn = (name: string) => number;

export type W_LumpLength_fn = (lump: number) => number;
export type W_ReadLump_fn = (lump: number, dest: Uint8Array) => void;

export type W_CacheLumpNum_fn = (lump: number, dest: Uint8Array) => Uint8Array;
export type W_CacheLumpName_fn = (name: string, tag: number) => Uint8Array;
