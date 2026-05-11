//-----------------------------------------------------------------------------
//
// libc/stdio.c — POSIX <stdio.h> reimplementation for the browser port.
//
//-----------------------------------------------------------------------------

import type { printf_fn } from "libc/stdio.h";

function formatPrintf(fmt: string, args: unknown[]): string {
  let out = "";
  let argIdx = 0;
  for (let i = 0; i < fmt.length; i++) {
    const c = fmt[i];
    if (c !== "%") { out += c; continue; }
    const spec = fmt[++i];
    switch (spec) {
      case "%": out += "%"; break;
      case "s": out += String(args[argIdx++] ?? ""); break;
      case "d":
      case "i": out += String(Math.trunc(Number(args[argIdx++]) || 0)); break;
      case "x": out += (Math.trunc(Number(args[argIdx++]) || 0) >>> 0).toString(16); break;
      case "c": out += String.fromCharCode(Number(args[argIdx++]) || 0); break;
      case "f": out += String(Number(args[argIdx++]) || 0); break;
      default:  out += "%" + (spec ?? ""); break; // unrecognized → pass through
    }
  }
  return out;
}

export const printf: printf_fn = (fmt, ...args) => {
  const s = formatPrintf(fmt, args);
  // console.log adds its own newline, so strip one trailing \n from the
  // formatted string to keep the visual output matching the C original.
  console.log(s.endsWith("\n") ? s.slice(0, -1) : s);
  return s.length;
};
