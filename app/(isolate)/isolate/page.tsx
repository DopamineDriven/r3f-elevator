import { fileSlugs } from "@/lib/isolate-params";
import { toTitleCase } from "@/lib/to-title-case";
import Link from "next/link";

export default function IsolateIndexPage() {
  return (
    <div className="bg-background mx-auto w-screen font-basis-grotesque-pro text-foreground min-h-screen p-8">
      <h1 className="mb-6 text-3xl text-left font-semibold">🧪 Isolate Explorer</h1>
      <ul className="grid content-center text-center align-middle mx-auto w-full gap-4 sm:grid-cols-2 md:grid-cols-3">
        {fileSlugs.map(slug => (
          <li key={slug}>
            <Link
              href={`/isolate/${slug}`}
              className="hover:bg-foreground/10 block rounded-lg p-4 transition hover:underline">
              <div className="text-lg font-medium">{toTitleCase(slug)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
