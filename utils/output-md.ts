import { Fs } from "@d0paminedriven/fs";


class HandleFs extends Fs {
  constructor(public override cwd: string) {
    super((cwd ??= process.cwd()));
  }

  public getTargetedDirs<
    const Target extends "app/(elevator)/elevator" | "ui/elevator"
  >(target: Target) {
    return this.readDir(target, { recursive: true })
      .filter(v => /\./g.test(v))
      .map(v => {
        return v;
      });
  }

  public get appElevatorDirs() {
    return this.getTargetedDirs("app/(elevator)/elevator");
  }

  public get uiElevatorDirs() {
    return this.getTargetedDirs("ui/elevator");
  }

  public getTargetedPaths<
    const T extends `app/(elevator)/elevator` | `ui/elevator`
  >(targeted: T) {
    return targeted === "app/(elevator)/elevator"
      ? this.appElevatorDirs
      : this.uiElevatorDirs;
  }

  public fileExt(file: string) {
    return file.split(/\./).reverse()[0] ?? "txt";
  }
  public filePathSansExt(file: string) {
    return file.split(/\./)[0] ?? "";
  }

  public getRawFiles<const T extends `app/(elevator)/elevator` | `ui/elevator`>(
    target: T
  ) {
    const arr = Array.of<string>();
    try {
      return this.getTargetedPaths(target).map(file => {
        const fileContent = this.fileToBuffer(`${target}/${file}`).toString(
          "utf-8"
        );
        const fileExtension = this.fileExt(file);
        const filePathSansExtension = this.filePathSansExt(file);
        // prettier-ignore
        const toInject = `
#### ${target}/${file}
- https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/${target}/${file}

\`\`\`${fileExtension}

${fileContent}

\`\`\`

`
        arr.push(toInject);
        return toInject;
      });
    } catch (err) {
      console.error(err);
    } finally {
      return arr;
    }
  }
  public incomingArgs(argv: string[]) {
    if (argv[3] && argv[3].length > 1) {
      if (argv[3]?.includes("ui")) {
        this.withWs("utils/__out__/ui.md", this.getRawFiles("ui/elevator").join("\n\n"));
      } else if (argv[3]?.includes("app")) {
        this.withWs(
          "utils/__out__/app.md",
          this.getRawFiles("app/(elevator)/elevator").join("\n\n")
        );
      } else {
        console.log(`argv3 val must be either ui OR app`);
      }
    } else {
      // prettier-ignore
      const msg = `must provide an argv3 command, \n\n where val = ui | app \n\n eg, \n\n \`\`\`bash \npnpm tsx utils/output-md.ts --target val\n \`\`\``;
      console.log(msg);
    }

  }

}
const fs = new HandleFs(process.cwd());

fs.incomingArgs(process.argv);
