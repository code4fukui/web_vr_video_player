export const loadResources = async (ress) => {
  for (const name in ress) {
    const path = ress[name];
    if (path.endsWith(".json")) {
      globalThis[name] = await (await fetch(path)).json();
    } else {
      //globalThis[name] = new Uint8Array(await (await fetch(path)).arrayBuffer());
      globalThis[name] = path;
    }
  }
};
