import fs from "fs";
import { promisify } from "util";
export { join } from "path";

export const readdir = promisify(fs.readdir);
export const readFile = promisify(fs.readFile);
