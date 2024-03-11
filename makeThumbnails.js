import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { makeThumbnailFile } from "./makeThumbnailFile.js";

const path = "videos/qoocamego/";
const fns = await dir2array(path);
for (const fn of fns) {
  console.log(fn);
  const ext = fn.toLowerCase();
  if (!ext.endsWith(".mp4") && !ext.endsWith(".mov")) continue;
  await makeThumbnailFile(path + fn);
}
