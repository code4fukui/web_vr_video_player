import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

export const csv2json = async () => {
  const data = await CSV.fetchJSON("./files.csv");
  const folders = ArrayUtil.toUnique(data.map(i => i.folder));
  const json = { videos: folders.map(i => ({ name: i, list: data.filter(j => j.folder == i).map(j => {
    const o = {};
    Object.assign(o, j);
    delete o.folder;
    return o;
  })}))}
  await Deno.writeTextFile("./files.json", JSON.stringify(json, null, 2));
};
