export const resizeImageData = (imgd, w, half = false) => {
  const r = half ? 2 : 1;
  const ow = imgd.width;
  const oh = imgd.height;
  const h = Math.floor(w / ow * oh * r);
  const data = new Uint8ClampedArray(w * h * 4);
  let p = 0;
  for (let i = 0; i < h; i++) {
    const y = Math.floor(i / h * oh);
    for (let j = 0; j < w; j++) {
      const x = Math.floor(j / w * ow / r);
      let idx = (x + y * ow) * 4;
      data[p++] = imgd.data[idx++];
      data[p++] = imgd.data[idx++];
      data[p++] = imgd.data[idx++];
      data[p++] = imgd.data[idx++];
    }
  }
  return { data, width: w, height: h };
};
