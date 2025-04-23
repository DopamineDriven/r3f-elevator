#!/usr/bin/env tsx
import {execa } from "execa";
import path from "node:path";
import { Fs } from "@d0paminedriven/fs";
import { PBR_TEXTURES_RAW } from "@/utils/__out__/pbr/pbr-textures-raw";

const fs = new Fs(process.cwd());
const KTX2_OUT = "public/r3f-ktx2";
const TMPDIR = "tmp/variance-mips";
const SRGB_KEYS = ["albedo", "basecolor", "diffuse"] as const;

function urlToRelPath(url: string): string {
  // E.g. https://asrosscloud.com/textures/xxx.png → textures/xxx.png
  return url.replace("https://asrosscloud.com/", "");
}

async function buildTexturesFromRaw() {
  fs.generateDirIfDNE(TMPDIR, { recursive: true });
  for (const [matName, maps] of Object.entries(PBR_TEXTURES_RAW)) {
    for (const [mapKey, inUrl] of Object.entries(maps)) {
      if (!inUrl) continue;
      const rel = urlToRelPath(inUrl); // textures/foo/bar_map.png
      const inPath = path.join("public/r3f", rel);
      const outPath = path.join(KTX2_OUT, rel.replace(/\.[^.]+$/, ".ktx2"));
      fs.generateDirIfDNE(path.dirname(outPath), { recursive: true });

      if (SRGB_KEYS.includes(mapKey as "albedo" | "basecolor" | "diffuse")) {
        // Albedo/basecolor/diffuse
        await execa("toktx", [
          "--encode", "uastc", "--assign_oetf", "srgb", "--genmipmap",
          outPath,
          inPath
        ], { stdio: "inherit" });
      } else if (mapKey === "roughness") {
        // Roughness: variance mips with your TS script
        const prefix = path.join(TMPDIR, `${matName}_${mapKey}`);
        await execa("tsx", ["utils/variance-mipmap-roughness.ts", inPath, prefix], { stdio: "inherit" });
        // Collect all generated mips
        const mips=Array.of<string>();
        let i = 0;
        while (true) {
          const mipFile = `${prefix}_mip${i}.png`;
          if (fs.existsSync(mipFile)) {
            mips.push(mipFile);
            i++;
          } else {
            break;
          }
        }
        if (!mips.length) throw new Error(`Variance mips missing for ${inPath}`);
        await execa("toktx", [
          "--encode", "uastc", "--assign_oetf", "linear", "--t2", "--mipmap",
          outPath,
          ...mips
        ], { stdio: "inherit" });
        // Cleanup temp mips
        for (const mip of mips) await fs.unlink(mip);
      } else {
        // AO, normal, metalness, etc.
        await execa("toktx", [
          "--encode", "uastc", "--assign_oetf", "linear", "--genmipmap",
          outPath,
          inPath
        ], { stdio: "inherit" });
      }
    }
  }
  try { fs.rm(TMPDIR); } catch (err) { console.error(err)}
  console.log("✅ All KTX2 outputs updated and temp cleaned up.");
}

function updateKTX2Registry() {
  // Always generate a fresh registry. (No need for existence checks.)
  const registry: Record<string, Record<string, string>> = {};
  for (const [matName, maps] of Object.entries(PBR_TEXTURES_RAW)) {
    const out: Record<string, string> = {};
    for (const [mapKey, url] of Object.entries(maps)) {
      if (!url) continue;
      const rel = urlToRelPath(url);
      out[mapKey] = "/" + path.posix.join(
        KTX2_OUT.replace(/^public\//, ""),
        rel.replace(/\.[^.]+$/, ".ktx2")
      );
    }
    registry[matName] = out;
  }
  // Pretty output for IDEs
  const outFile = "utils/__out__/pbr/pbr-textures-ktx2.ts";
  fs.writeFileAsync(outFile, `export const PBR_TEXTURES_KTX2 = ${JSON.stringify(registry, null, 2)} as const;\n`);
}

// Main singleton runner
(async () => {
  await buildTexturesFromRaw();
  updateKTX2Registry();
})();
