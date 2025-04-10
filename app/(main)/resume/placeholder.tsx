"use client";
import { GentleText } from "@d0paminedriven/motion";
import Link from "next/link";

export default function Placeholder() {
  return (
    <section className="flex min-h-[100dvh] flex-col mt-24 space-y-10 items-center justify-center p-4">
      <GentleText
        content="Resume Placeholder Route"
        textClassName="text-4xl font-bold text-foreground mb-6"
        maxWidth="fit"
        containerClassName="mx-auto"
        animateOnlyInView={true}
        autoPlay
        animationOptions={{ repeatType: "loop" }}
        as="h1"
        animateTarget="chars"
      />
      <div className="flex flex-row grow">
        <Link href="/" passHref>
          <GentleText
            content="Return Home"
            textClassName="text-4xl font-basis-grotesque-pro text-foreground mb-6"
            maxWidth="fit"
            containerClassName="mx-auto"
            animateOnlyInView={true}
            autoPlay
            animationOptions={{ repeatType: "loop" }}
            as="h3"
            animateTarget="chars"
          />
        </Link>
      </div>
    </section>
  );
}
