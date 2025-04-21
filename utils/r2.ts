import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
import type { ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";

dotenv.config();

const accessKeyId = process.env.R2_ACCESS_KEY_ID ?? "";
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY ?? "";
const accountId = process.env.R2_ACCOUNT_ID ?? "";
const bucket = "r3f";

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey }
});

async function listR2Files() {
  const results = Array.of<string>();
  let ContinuationToken: string | undefined = undefined;
  do {
    const out: ListObjectsV2CommandOutput = (await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: `textures/`,
        ContinuationToken
      })
    )) satisfies ListObjectsV2CommandOutput;
    const outContents = out.Contents;
    if (!outContents) break;
    outContents.forEach(function (data) {
      results.push(data?.Key ?? "");
    });
    ContinuationToken = out.IsTruncated ? out.NextContinuationToken : undefined;
  } while (ContinuationToken);
  return results;
}
(async () => {
  return await listR2Files();
})().then(data => {
  const prepend = data.map(v => `https://asrosscloud.com/${v}`);
  console.log(prepend);
  return data;
});

// (async () => {
//   const files = await listR2Files(subdir);
//   // Only names in this subdir, filter out "folders"
//   const filtered = files.filter(f => !f.endsWith("/"))
//     .map(f => f.replace(/^textures\//, "")); // strip 'textures/' prefix
//   // Group by PBR convention: last '-' part, or whatever logic you want
//   const entries = filtered.map(f => [
//     f.split(/(-)/g).reverse()[0].split(".")[0],
//     `${baseUrl}/${f}`,
//   ]);
//   const outStr = `
// export const ${exportName} = ${JSON.stringify(Object.fromEntries(entries), null, 2)};
// `;
//   writeFileSync(`utils/__out__/pbr/${subdir.replace(/\//g, "_")}.ts`, outStr);
//   console.log(`Wrote utils/__out__/pbr/${subdir.replace(/\//g, "_")}.ts`);
// })();
