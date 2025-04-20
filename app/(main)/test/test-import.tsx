"use client";

import { LoadingSpinner } from "@/ui/loading-spinner";
import dynamic from "next/dynamic";

const ElevatorAnimationPage = dynamic(
  () => import("@/app/(main)/test/test-ui"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);

export function SpringyBoxTestClient() {
  return <ElevatorAnimationPage />;
}
