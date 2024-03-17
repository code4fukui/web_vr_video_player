import { existsFile } from "./existsFile.js";

export const makeThumbnailFile = async (fnmovie, force = false) => {
  //ffmpeg -nostdin -ss 0 -i "videos/qoocamego/0040_20240311_085205_01.mp4" -filter:v "crop=in_w/2:in_h:0:0" -f image2 -frames:v 1 "videos/qoocamego/0040_20240311_085205_01.jpg" -y
  const fnimage = fnmovie + ".jpg";
  if (!force) {
    if (await existsFile(fnimage)) return;
  }

  const command = new Deno.Command("ffmpeg", { args: [
    ..."-nostdin -ss 0 -i".split(" "),
    fnmovie,
    ..."-filter:v crop=in_w/2:in_h:0:0 -f image2 -frames:v 1 -y".split(" "),
    fnimage,
  ] });
  const res = await command.output();
  //console.log(res);
  return;
};
