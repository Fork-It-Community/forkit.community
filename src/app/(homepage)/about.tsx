import Image from "next/image";
import AboutImage from "./about.jpg";

export function About() {
  return (
    <div className="bg-gray-950 py-24 sm:py-32 relative overflow-hidden">
      <Image
        src={AboutImage}
        alt=""
        className="absolute inset-0 object-cover -scale-x-100 h-full"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950 to-gray-950/0"></div>
      <div className="relative mx-auto max-w-2xl flex flex-col gap-3 px-6">
        <h2 className="text-3xl font-bold sm:text-4xl font-heading">
          What is <span className="text-primary">Fork it! Community</span>?
        </h2>
        <p className="text-lg text-gray-200 bold text-balance max-w-[50ch]">
          Events for real people in tech around the world to share real-life
          experiences.
        </p>
        <p className="text-base text-gray-400 text-balance max-w-[50ch]">
          A community sharing real feedback for real people. Let&apos;s try to
          talk about real projects without lies for once.
        </p>
      </div>
    </div>
  );
}
