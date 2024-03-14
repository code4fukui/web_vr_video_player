import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { makeThumbnailFile } from "./makeThumbnailFile.js";
import { getDuration } from "./getDuration.js";
import { getFileCreated } from "./getFileCreated.js";
import { csv2json } from "./csv2json.js";

const getType = (fn) => {
  const n = fn.lastIndexOf(".");
  const m = fn.lastIndexOf("_", n);
  const type = fn.substring(m + 1, n);
  console.log(type);
  const types = ["sbs", "tb", "360", "sphere180", "sphere360", "screen"];
  if (types.indexOf(type) >= 0) return type;
  return null;
};

const path = "videos/";
const fns = await dir2array(path);
const list = [];
for (const fn0 of fns) {
  const fn = path + fn0;
  const ext = fn.toLowerCase();
  if (!ext.endsWith(".mp4") && !ext.endsWith(".mov")) continue;
  console.log(fn);
  const screen_type = getType(fn) || "sbs";
  const folder = fn0.substring(0, fn0.indexOf("/")) || "default";
  await makeThumbnailFile(fn);
  const time = await getDuration(fn);
  const date = await getFileCreated(fn);
  list.push({
    folder,
    name: fn,
    src: fn,
    thumbnail: fn + ".jpg",
    screen_type,
    date: date,
    epoch: time,
  });
}
await Deno.writeTextFile("files.csv", CSV.stringify(list));
await csv2json();
