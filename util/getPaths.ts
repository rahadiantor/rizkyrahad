import { join } from "path";

// `public/narrative/`
export const getPublicPath = (...dirs: string[]) =>
  join(process.cwd(), "public", ...dirs);

export const getContentPath = (...dirs: string[]) =>
  join(process.cwd(), "content", ...dirs);
