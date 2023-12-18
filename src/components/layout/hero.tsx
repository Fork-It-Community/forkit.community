import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-12 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <img className="h-4" src="/forkit-medium.svg" alt="Fork it!" />

            <h1 className="mt-20 text-4xl font-medium tracking-tight  sm:mt-10 sm:text-6xl font-heading uppercase">
              Global Developer Conferences
            </h1>
            <p className="mt-4 text-lg leading-6">
              Connecting developers globally through impactful tech events.
            </p>
            <div className="mt-8 flex items-center gap-x-4">
              <Button size="sm">Incoming Event</Button>
              <Button variant="secondary" size="sm" asChild>
                <a
                  href="https://tally.so/r/wz7zPZ"
                  title="Tally form to join the Fork it! Community"
                >
                  Join Fork it! Community
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative m-auto lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0 logo-mask">
          <img
            className="aspect-[3/2] w-full bg-neutral-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            src="/laurent-gence-etretat.jpg"
            alt="Étretat by Laurent Gence on Unsplash"
          />
        </div>
      </div>
    </div>
  );
}
