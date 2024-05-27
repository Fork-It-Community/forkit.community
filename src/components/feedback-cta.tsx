import { Button } from "@/components/ui/button";

export function FeedbackCTA({ href }: Readonly<{ href: string }>) {
  return (
    <a href={href} target="_blank" rel="noreferer">
      <div className="relative isolate overflow-hidden rounded-3xl bg-gray-900 px-6 py-20 text-center shadow-2xl sm:px-16">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          We need you!
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          Help speakers by giving them feedbacks about their talks.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button>Give talk feedback!</Button>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#ebff0f" />
              <stop offset={1} stopColor="#ebff0f" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </a>
  );
}
