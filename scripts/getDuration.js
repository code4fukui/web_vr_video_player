export const getDuration = async (fnmovie) => {
  //ffmpeg -i "videos/qoocamego/0040_20240311_085205_01.mp4"
  //   Duration: 00:00:11.56, start: 0.000000, bitrate: 48670 kb/s

  const command = new Deno.Command("ffmpeg", { args: [
    "-i",
    fnmovie,
  ] });
  const p = await command.output();
  const res = new TextDecoder().decode(p.stderr);
  const ss = res.split("\n");
  //console.log(ss);
  const duration = ss.find(i => i.indexOf("Duration:") >= 0)?.trim();
  const ss2 = duration.split(" ")[1]; // 00:00:05.76,
  //console.log(ss2);
  const hour = parseInt(ss2.substring(0, 2));
  const min = parseInt(ss2.substring(3, 5));
  const sec = parseFloat(ss2.substring(6, 11));
  //console.log(hour, min, sec);
  const dsec = hour * 60 * 60 + min * 60 + sec;
  return dsec;
};
