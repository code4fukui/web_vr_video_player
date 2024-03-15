import { getInfo } from "./getInfo.js";

export const getDuration = async (fnmovie) => {
  const info = await getInfo(fnmovie)
  return info.duration;
};
