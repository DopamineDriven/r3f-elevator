import { Fs } from "@d0paminedriven/fs";
const fs = new Fs(process.cwd());

const fileSize = <const T extends string>(t: T) => fs.fileSizeMb(`public/${t}`);

const r3fDirs =fs.readDir("public", {recursive: true}).filter((pub) => pub.startsWith("r3f")).filter((filepaths) => /\./g.test(filepaths));

const h = Array.of<string>();

r3fDirs.forEach(function (filePaths) {
  h.push(`${fileSize(filePaths)}; public/${filePaths}`);
});

const isolate = <const T extends string>(props: T) => {
  const [size, path] = props.split(/;/g) as [string, string];
return [Number.parseFloat(size), path.trim()] as const;
}

const sortBySize = (props: string[]) => {
  return props.sort((a,b) => isolate(a)[0] - isolate(b)[0]);
}

const getPaths = (props: string) => {
  return props.split(/public\/((r3f)|(r3f-ktx2))\/textures\//g)?.[1];
}

const sortByPaths = (props: string[]) => {
  return props.sort((a,b) => getPaths(isolate(a)[1]).localeCompare(getPaths(isolate(b)[1])) - getPaths(isolate(b)[1]).localeCompare(getPaths(isolate(a)[1])) );
}
sortBySize(sortByPaths(h)).forEach(function (file) {
  const [size, path] = file.split(/;/g) as [string, string];
  console.log([Number.parseFloat(size), path.trim()]);
})


// const mb = (target: "r3f-ktx2" | "r3f") => fs.fileSizeMb(`public/${target}/textures/painted-stucco-white/white_plaster_21_27_ao.ktx2`)
// console.log(mb);
