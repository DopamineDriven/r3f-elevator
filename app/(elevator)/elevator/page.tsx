import type { Metadata } from "next";
import ElevatorScene from "@/ui/elevator/r3f";

export const metadata = {
  title: "Elevator Scene",
} satisfies Metadata;

export default function ElevatorExperiencePage() {
  return <ElevatorScene />;
}
