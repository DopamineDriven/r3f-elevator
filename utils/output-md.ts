import fsSync from "node:fs";
import path, { join } from "path";
import { Fs } from "@d0paminedriven/fs";
import type { BufferEncodingUnion, ReadDirOptions } from "@d0paminedriven/fs";

type Opts = {
  encoding?: BufferEncodingUnion | null | undefined;
  withFileTypes?: false | undefined;
  recursive?: boolean | undefined;
};

class HandleFs extends Fs {
  constructor(public override cwd: string) {
    super((cwd ??= process.cwd()));
  }

  public rootFiles(
    options = {
      encoding: "utf-8",
      recursive: true,
      withFileTypes: false
    } as Opts
  ) {
    return this.handleBuffStrArrUnion(
      fsSync.readdirSync(path.resolve(join(this.cwd, "./")), options)
    );
  }

  public readRootFile(file = "notes.md") {
    return fsSync.readFileSync(path.resolve(join(this.cwd, `./${file}`)));
  }

  public getTargetedDirs<
    const Target extends
      | "app/(elevator)/elevator"
      | "ui/elevator"
      | "root"
      | "types"
      | "hooks"
      | "lib"
      | "context"
  >(
    target: Target,
    options = {
      encoding: "utf-8",
      recursive: true,
      withFileTypes: false
    } as Opts
  ) {
    if (target === "root") {
      const { recursive: re, ...opts } = options;
      const handleRe = !re ? false : re;
      return this.rootFiles({ recursive: handleRe, ...opts })
        .filter(
          file =>
            /(?:(public|patches|node_modules|\.(next|git|vscode|husky|changeset|github|gitignore|env)|pnpm-lock\.yaml))/g.test(
              file
            ) === false
        )
        .filter(file => /\./g.test(file) && !/\.md$/g.test(file));
    } else
      return this.readDir(target, options)
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

  public get typesElevatorDirs() {
    return this.getTargetedDirs("types");
  }

  public get rootElevatorDirs() {
    return this.getTargetedDirs("root", { recursive: false });
  }

  public get hooksElevatorDirs() {
    return this.getTargetedDirs("hooks");
  }
  public get libElevatorDirs() {
    return this.getTargetedDirs("lib");
  }

  public get contextElevatorDirs() {
    return this.getTargetedDirs("context");
  }
  public getTargetedPaths<
    const T extends
      | `app/(elevator)/elevator`
      | `ui/elevator`
      | "root"
      | "types"
      | "hooks"
      | "lib"
      | "context"
  >(targeted: T) {
    return targeted === "app/(elevator)/elevator"
      ? this.appElevatorDirs
      : targeted === "ui/elevator"
        ? this.uiElevatorDirs
        : targeted === "types"
          ? this.typesElevatorDirs
          : targeted === "hooks"
            ? this.hooksElevatorDirs
            : targeted === "lib"
              ? this.libElevatorDirs
              : targeted === "context"
                ? this.contextElevatorDirs
                : this.rootElevatorDirs;
  }

  public fileExt(file: string) {
    return !file.startsWith(".")
      ? (file.split(/\./)?.reverse()?.[0] ?? "txt")
      : file.split(/\./gim)?.reverse()?.[0];
  }

  public handleComments<
    const T extends
      | `app/(elevator)/elevator`
      | `ui/elevator`
      | "root"
      | "types"
      | "hooks"
      | "lib"
      | "context"
  >(target: T, file: string, removeComments = true) {
    if (target === "root") {
      return file;
    } else if (!removeComments) {
      return file.trim();
    } else {
      return file.replace(
        /(?:(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:(?<!\:|\\\|\')\/\/.*))/gm,
        ""
      );
    }
  }

  public getRawFiles<
    const T extends
      | `app/(elevator)/elevator`
      | `ui/elevator`
      | "root"
      | "types"
      | "hooks"
      | "lib"
      | "context"
  >(target: T, removeComments = true) {
    const arr = Array.of<string>();
    try {
      return this.getTargetedPaths(target).map(file => {
        const handleInjectedTarget =
          target === "root" ? file : `${target}/${file}`;
        const fileExtension = this.fileExt(file);
        const fileContent =
          target !== "root"
            ? this.fileToBuffer(`${target}/${file}`).toString("utf-8")
            : this.readRootFile(file).toString("utf-8");

        // prettier-ignore
        const toInject = `**File:** \`${handleInjectedTarget}\`

For more details, [visit the raw version of this file](https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/${handleInjectedTarget}).

\`\`\`${fileExtension}

${this.handleComments(target, fileContent, removeComments)}

\`\`\`


**Related Resources:**
  - Raw file URL: https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/${handleInjectedTarget}


---

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
    const omitComments = argv[4] && argv[4]?.includes("false") ? false : true;
    if (argv[3] && argv[3].length > 1) {
      if (argv[3]?.includes("ui")) {
        this.withWs(
          "utils/__out__/ui.md",
          this.getRawFiles("ui/elevator", omitComments).join("\n")
        );
      } else if (argv[3]?.includes("types")) {
        this.withWs(
          "utils/__out__/types.md",
          this.getRawFiles("types", omitComments).join("\n")
        );
      } else if ((argv[3]?.includes("app"), omitComments)) {
        this.withWs(
          "utils/__out__/app.md",
          this.getRawFiles("app/(elevator)/elevator", omitComments).join("\n")
        );
      } else if (argv[3]?.includes("lib")) {
        this.withWs(
          "utils/__out__/lib.md",
          this.getRawFiles("lib", omitComments).join("\n")
        );
      } else if (argv[3]?.includes("hooks")) {
        this.withWs(
          "utils/__out__/hooks.md",
          this.getRawFiles("hooks", omitComments).join("\n")
        );
      } else if (argv[3]?.includes("context")) {
        this.withWs(
          "utils/__out__/context.md",
          this.getRawFiles("context", omitComments).join("\n")
        );
      } else if (argv[3]?.includes("root")) {
        this.withWs(
          "utils/__out__/root.md",
          this.getRawFiles("root", omitComments).join("\n")
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
