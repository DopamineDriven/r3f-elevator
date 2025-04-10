"use client";
import { GentleText, ScatterText } from "@d0paminedriven/motion";
import Link from "next/link";

export default function Placeholder() {
  return (
    <section className="flex min-h-[100dvh] flex-col overflow-x-visible! mt-24 space-y-10 items-center justify-center p-4">
      <GentleText
        content="Resume Placeholder Route"
        textClassName="text-4xl font-basis-grotesque-pro-thin text-foreground mb-6"
        maxWidth="fit"
        containerClassName="mx-auto"
        animateOnlyInView={true}
        autoPlay
        allowOverflow
        keyframes={{
          opacity: [0, 1],
          y: [-10, 10],
          scale: [0.5, 1],
          rotate: [-10, 0],
          color: ["#83e6f7", "#ffffff"],
        }}

        animationOptions={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          repeatDelay: 2,

        }}duration={0.3}
        as="h1"
        animateTarget="chars"
      />
      <div className="flex flex-row grow p-10">
        <Link href="/" passHref className="hover:text-background/20">
          <GentleText
            content="Trying to find home? Good Luck"
            textClassName="text-4xl font-basis-grotesque-pro-thin text-foreground mb-6"
            maxWidth="fit"
            containerClassName="mx-auto"
            animateOnlyInView={true}
            autoPlay
            keyframes={{
              opacity: [0, 1],
              y: [-5, 5],
              scale: [0.5, 1],
              rotate: [-10, 0],
              color: ["#83e6f7", "#ffffff"],
            }}
            animationOptions={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 2,
            }}
            as="h1"
            animateTarget="chars"
          />
        </Link>
      </div>
    </section>
  );
}
