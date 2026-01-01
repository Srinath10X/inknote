import { Button } from "@/components/ui/button";

import Image from "next/image";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import MultiGradient from "./_components/MultiGradient";

export default function Home() {
  return (
    <>
      <div className="mx-auto px-4 md:px-8 lg:px-0 lg:max-w-240 xl:max-w-304">
        <Header />
        <MultiGradient />

        <section className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-28 text-center">
          <h1 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl z-10">
            Your thoughts deserve a calm workspace
          </h1>

          <p className="mt-6 mx-auto max-w-[50ch] text-xl text-black/60 sm:text-2xl z-10">
            For people who want less clutter and create without noise.
          </p>

          <div className="mt-10 flex-center flex-col sm:flex-row gap-3 sm:gap-4 px-2">
            <Button className="h-12 w-full sm:w-auto px-8 text-base font-medium  z-10">
              Get started
            </Button>

            <Button
              variant="outline"
              className="h-12 w-full sm:w-auto px-8 text-base font-medium border border-black/15 z-10"
            >
              Learn more
            </Button>
          </div>
        </section>

        <section className="px-4">
          <Image
            src={"/dashboard.png"}
            alt="Image of Inknote"
            height={720}
            width={1280}
            className="glass-border p-2 bg-black/5"
          />
        </section>
        <Footer />
      </div>
    </>
  );
}
