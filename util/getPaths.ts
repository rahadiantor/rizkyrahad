import { join } from "path";

import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

// `public/narrative/`
export const getPublicPath = (...dirs: string[]) =>
  join(serverRuntimeConfig.PROJECT_ROOT, "public", ...dirs);

export const getContentPath = (...dirs: string[]) =>
  join(serverRuntimeConfig.PROJECT_ROOT, "content", ...dirs);
