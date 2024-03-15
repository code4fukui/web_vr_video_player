import { getInfo } from "./getInfo.js";

const fn = "./videos/sakulight/sakulight_sbs.mov";
// const fn = "./videos/ekoshien/0062_20240313_161019_01.mp4";
const d = await getInfo(fn);
console.log(d);
