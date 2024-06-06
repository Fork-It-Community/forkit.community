import Image from "next/image";
import AboutImage from "./about.jpg";

export function About() {
  return (
    <div className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
      <Image
        src={AboutImage}
        alt=""
        className="absolute inset-0 h-full -scale-x-100 object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950 to-gray-950/0"></div>
      <div className="relative mx-auto flex max-w-2xl flex-col gap-3 px-6">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">
          What is <span className="text-primary">Fork it! Community</span>?
        </h2>
        <p className="bold max-w-[50ch] text-balance text-lg text-gray-200">
          Events for real people in tech around the world to share real-life
          experiences.
        </p>
        <p className="max-w-[50ch] text-balance text-base text-gray-400">
          A community sharing real feedback for real people. Let&apos;s try to
          talk about real projects without lies for once.
        </p>
      </div>
    </div>
  );
}
