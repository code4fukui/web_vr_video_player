export const existsFile = async (fn) => {
  try {
    await Deno.readFile(fn);
    //console.log("already exists");
    return true;
  } catch (e) {
  }
  return false;
};