import { join, resolve } from "path";
import fs from "fs";
import { promisify } from "util";

import getConfig from "next/config";

const readdir = promisify(fs.readdir);

async function tryReadDir(dirPath: string) {
  try {
    const files = await readdir(dirPath);
    return files;
  } catch (err) {
    return err.message;
  }
}

async function getContentPaths(...dirs: string[]) {
  const { serverRuntimeConfig } = getConfig();
  const rootConfig = serverRuntimeConfig.PROJECT_ROOT;
  const cwd = process.cwd();
  const dirname = __dirname;
  const joins = {
    cwd: join(cwd, "content"),
    dirname: join(dirname, "content"),
    relative: join("./content"),
    rootConfig: join(rootConfig, "content"),
  };

  const resolves = {
    cwd: resolve(cwd, "content"),
    dirname: resolve(dirname, "content"),
    relative: resolve("./content"),
    rootConfig: resolve(rootConfig, "content"),
  };

  return {
    rootConfig,
    cwd,
    dirname,
    joins,
    resolves,
  };
}

export default async (_req: any, res: any) => {
  const paths = await getContentPaths();
  const str = [
    paths.rootConfig,
    paths.cwd,
    paths.dirname,
    ...Object.values(paths.joins),
    ...Object.values(paths.resolves),
  ];
  const dirs = await Promise.all(str.map(tryReadDir));

  const result = dirs.reduce((previous, current, index) => {
    return [...previous, [str[index], current]];
  }, []);
  res.json({ paths, result });
  //   const dir = fs.readdirSync(path);
  //   res.json({ path, dir });
};
