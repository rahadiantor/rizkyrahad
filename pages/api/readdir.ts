import { getContentPath } from "../../util/getPaths";
import fs from "fs";

export default async (_req: any, res: any) => {
  const path = getContentPath();
  const dir = fs.readdirSync(path);
  res.json({ path, dir });
};
