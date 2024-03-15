import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { makeThumbnailFile } from "./makeThumbnailFile.js";
import { getInfo } from "./getInfo.js";
import { getFileCreated } from "./getFileCreated.js";
import { csv2json } from "./csv2json.js";

const typemodes = {
  "sbs": { type: "screen", mode: "3d" },
  //"tb",
  "vr180": { type: "sphere180", mode: "3d" },
  "sphere180": { type: "sphere180", mode: "3d" },

  "sphere360": { type: "sphere360", mode: "2d" },
  "360": { type: "sphere360", mode: "2d" },

  //"screen"
  "2d": { type: "screen", mode: "2d" },

  "default": { type: "screen", mode: "3d" },
};

const getTypeMode = (fn) => {
  const n = fn.lastIndexOf(".");
  const m = fn.lastIndexOf("_", n);
  const type = fn.substring(m + 1, n);
  const tm = typemodes[type] || typemodes["default"];
  return tm;
};

const path = "./videos/";
const fns = await dir2array(path);
const list = [];
for (const fn0 of fns) {
  const fn = path + fn0;
  const ext = fn.toLowerCase();
  if (!ext.endsWith(".mp4") && !ext.endsWith(".mov")) continue;
  console.log(fn);
  const { type, mode } = getTypeMode(fn);
  const folder = fn0.substring(0, fn0.indexOf("/")) || "default";
  await makeThumbnailFile(fn);
  const info = await getInfo(fn);
  const date = await getFileCreated(fn);
  list.push({
    folder,
    name: fn,
    src: fn,
    thumbnail: fn + ".jpg",
    screen_type: type,
    mode,
    frame_width: info.size.width,
    frame_height: info.size.height,
    date: date,
    epoch: info.duration,
  });
}
await Deno.writeTextFile("./files.csv", CSV.stringify(list));
await csv2json();
