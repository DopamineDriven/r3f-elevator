import { Suspense } from "react";
import Placeholder from "./placeholder";

export const metadata = {
  title: "Resume Placeholder"
}

export default function ResumePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Placeholder />
    </Suspense>
  );
}
