import { DateTime } from "https://js.sabae.cc/DateTime.js";

export const getFileCreated = async (fn) => {
  const info = await Deno.stat(fn);
  return new DateTime(info.birthtime).toString();
};
