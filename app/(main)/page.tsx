import ArLogoParticles from "@/ui/particle";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-items-center w-screen mx-auto min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex grow w-full  gap-[32px] row-start-2 items-center sm:items-start">
        <ArLogoParticles />
      </main>
    </div>
  );
}
