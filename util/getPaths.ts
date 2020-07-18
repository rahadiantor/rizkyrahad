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

export const getContentPath = (...dirs: string[]) => {
  const resolvedPath = resolve(join("content", ...dirs));
  const processCwdPath = join(process.cwd(), "content", ...dirs);
  const resolvedStaticPath = resolve(`../content/${dirs.join("/")}`);
  const dirnamePath = join(__dirname, "content", ...dirs);
  console.log({
    resolvedPath,
    resolvedStaticPath,
    processCwdPath,
    dirnamePath,
  });
  return resolvedPath;
};
