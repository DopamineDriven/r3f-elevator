"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { GentleText } from "@d0paminedriven/motion";

export default function Placeholder() {
  const { h1Text, h3Text, h1Container, h3Container } = {
    h1Text: "text-4xl font-basis-grotesque-pro font-light text-foreground mb-6",
    h3Text: "text-4xl font-basis-grotesque-pro font-light text-foreground mb-6",
    h1Container: "mx-auto",
    h3Container: "mx-auto"
  };
  return (
    <section className="mt-24 flex min-h-[100dvh] flex-col items-center justify-center space-y-10 overflow-x-visible! p-4">
      <GentleText
        content="Resume Placeholder Route"
        textClassName={cn(h1Text)}
        maxWidth="fit"
        containerClassName={cn(h1Container)}
        animateOnlyInView={true}
        autoPlay
        allowOverflow
        keyframes={{
          opacity: [0, 1],
          y: [-10, 10],
          scale: [0.5, 1],
          rotate: [-10, 0],
          color: ["#83e6f7", "#ffffff"]
        }}
        animationOptions={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          repeatDelay: 2
        }}
        duration={0.3}
        as="h1"
        animateTarget="chars"
      />
      <div className="flex grow flex-row p-10">
        <Link href="/" passHref className="hover:text-background/20">
          <GentleText
            content="Trying to find home? Good Luck"
            textClassName={cn(h3Text)}
            maxWidth="fit"
            containerClassName={cn(h3Container)}
            animateOnlyInView={true}
            autoPlay
            keyframes={{
              opacity: [0, 1],
              y: [-5, 5],
              scale: [0.5, 1],
              rotate: [-10, 0],
              color: ["#83e6f7", "#ffffff"]
            }}
            animationOptions={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 2
            }}
            as="h3"
            animateTarget="chars"
          />
        </Link>
      </div>
    </section>
  );
}
