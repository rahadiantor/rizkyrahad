import { join, resolve } from "path";

// `public/narrative/`
export const getPublicPath = (...dirs: string[]) => {
  const resolvedPath = resolve(join("public", ...dirs));
  const processCwdPath = join(process.cwd(), "public", ...dirs);
  const resolvedStaticPath = resolve(`../public/${dirs.join("/")}`);
  const dirnamePath = join(__dirname, "public", ...dirs);
  console.log({
    resolvedPath,
    resolvedStaticPath,
    processCwdPath,
    dirnamePath,
  });
  return resolvedPath;
};

export const getContentPath = (...dirs: string[]) =>
  resolve(join("content", ...dirs));
