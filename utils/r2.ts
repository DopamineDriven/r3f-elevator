import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { Fs } from "@d0paminedriven/fs";
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
  const fs = new Fs(process.cwd());
  const prepend = data.map(v => `https://asrosscloud.com/${v}`);
  fs.withWs(
    "utils/__out__/r2/r2-file-list.ts",
    `export const r2FileList = ${JSON.stringify(prepend, null, 2)} as const;`
  );
  return data;
});
