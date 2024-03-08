import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const data = await CSV.fetchJSON("./files.csv");
console.log(data);
const genres = ArrayUtil.toUnique(data.map(i => i.genre));
const json = { videos: genres.map(i => ({ name: i, list: data.filter(j => j.genre == i).map(j => {
  const o = {};
  Object.assign(o, j);
  delete o.genre;
  return o;
})}))}
await Deno.writeTextFile("files2.json", JSON.stringify(json, null, 2));
