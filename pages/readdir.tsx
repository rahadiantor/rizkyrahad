import { join, resolve } from "path";
import fs from "fs";
import { promisify } from "util";

import getConfig from "next/config";

export default function ReadDir({ paths, result }) {
  return <pre>{JSON.stringify({ paths, result }, null, 2)}</pre>;
}

export async function getStaticProps() {
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
      cwd: join(cwd, "content", "narrative"),
      dirname: join(dirname, "content", "narrative"),
      relative: join("./content/narrative"),
      rootConfig: join(rootConfig, "content", "narrative"),
    };

    const resolves = {
      cwd: resolve(cwd, "content", "narrative"),
      dirname: resolve(dirname, "content", "narrative"),
      relative: resolve("./content/narrative"),
      rootConfig: resolve(rootConfig, "content", "narrative"),
    };

    return {
      rootConfig,
      cwd,
      dirname,
      joins,
      resolves,
    };
  }
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
  return {
    props: { paths, result },
  };
  //   const dir = fs.readdirSync(path);
  //   res.json({ path, dir });
}
