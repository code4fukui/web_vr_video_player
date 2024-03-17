import { EXIF } from "https://taisukef.github.io/exif-js/EXIF.js";

const fn = Deno.args[0];
const jpg = await Deno.readFile(fn);
const exif = EXIF.readFromBinaryFile(jpg);
console.log(exif);
const size = { width: exif.PixelXDimension || exif.ImageWidth, height: exif.PixelYDimension || exif.ImageHeight };
console.log(size);


