import { Fs } from "@d0paminedriven/fs";

const fs = new Fs(process.cwd());
function getIt(argv4 = process.argv[4]) {
  return fs.readDir(`public/textures/${argv4}`).map(v => {
    return [
      v.split(/(-)/g).reverse()[0]?.split(/\./g)?.[0] ?? "",
      `https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/${argv4}/${v}`
    ] as const;
  });
}

const writeIt = () => {
  // prttier-ignore
  const stringIt = `
export const ${process.argv[3]} = ${JSON.stringify(Object.fromEntries(getIt()))};`;

  fs.withWs(`utils/__out__/pbr/${process.argv[4]}.ts`, stringIt);
};

writeIt();
