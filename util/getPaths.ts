import { join, resolve } from "path";

// `public/narrative/`
export const getPublicPath = (...dirs: string[]) =>
  resolve(join("public", ...dirs));

export const getContentPath = (...dirs: string[]) =>
  resolve(join("content", ...dirs));
