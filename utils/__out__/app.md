#### app/(elevator)/elevator/layout.tsx
- https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/app/(elevator)/elevator/layout.tsx

```tsx

import { ElevatorClientWrapper } from "@/ui/elevator";
import type { Viewport } from "next";
import React from "react";

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  viewportFit: "cover",
  interactiveWidget: "overlays-content",
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
} satisfies Viewport;

export default function ElevatorLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // injecting it here is more performant than importing it into the page file
  return (
    <div className="relative h-[100dvh] min-h-screen w-[100vw] overflow-hidden bg-black">
      <ElevatorClientWrapper />
      {children}
    </div>
  );
}


```




#### app/(elevator)/elevator/loading.tsx
- https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/app/(elevator)/elevator/loading.tsx

```tsx

import { LoadingSpinner } from "@/ui/loading-spinner";

export default function Loading() {
  return <LoadingSpinner />;
}


```




#### app/(elevator)/elevator/page.tsx
- https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/app/(elevator)/elevator/page.tsx

```tsx

import type { Metadata } from "next";

export const metadata = {
  title: "Elevator Scene"
} satisfies Metadata;

export default function ElevatorExperiencePagePlaceholder() {
  return <div className="hidden"></div>;
}


```

