import type { Metadata } from "next";
import type { InferGSPRT } from "@/types/next";
import { fileSlugs } from "@/lib/isolate-params";
import { toTitleCase } from "@/lib/to-title-case";
import { HandleIsolate } from "@/ui/elevator/dynamic-exports";
import { Suspense } from "react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return fileSlugs.map(file => ({
    file: file
  }));
}

export async function generateMetadata({
  params
}: InferGSPRT<typeof generateStaticParams>) {
  const { file } = await params;
  return {
    title: toTitleCase(file)
  } satisfies Metadata;
}

export default async function IsolateRoute({
  params
}: InferGSPRT<typeof generateStaticParams>) {
  const { file } = await params;
  if (!file) {
    return notFound();
  }
  return (
    <Suspense fallback={null}>
      <HandleIsolate file={file} />
    </Suspense>
  );
}

export const dynamic = "force-static";
