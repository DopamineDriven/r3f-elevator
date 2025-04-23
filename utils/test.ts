import { Fs } from "@d0paminedriven/fs";
const fs = new Fs(process.cwd());

const fileSize = <const T extends string>(t: T) => fs.fileSizeMb(`public/${t}`);

const r3fDirs =fs.readDir("public", {recursive: true}).filter((pub) => pub.startsWith("r3f-ktx2")).filter((filepaths) => /\./g.test(filepaths));

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

function getSum(numbers: number[]): number {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

const v = Array.of<number>();
const vv = Array.of<string>();
(async () => sortBySize(sortByPaths(h)).forEach(function (file) {
  const [size, path] = file.split(/;/g) as [string, string];
  const tuple = ([Number.parseFloat(size), path.trim()] as const);
  v.push(tuple[0]);
  vv.push(tuple[1])
 if  (tuple[0] >=50 && tuple[0] <100) {
  console.log(tuple[0], " MB detected; requires git lfs ", tuple[1])
 } else if (tuple[0] >=100) {
  console.log(tuple[0], " MB detected; cannot remove from gitignore ", tuple[1])
 } else return console.log(tuple[0], " MB");
}))().then((_) => {
  console.log(vv)
  console.log(v.length, " files with a total size of ", getSum(v), " MB and an average size of ", getSum(v)/v.length, " MB");
})


// const mb = (target: "r3f-ktx2" | "r3f") => fs.fileSizeMb(`public/${target}/textures/painted-stucco-white/white_plaster_21_27_ao.ktx2`)
// console.log(mb);
