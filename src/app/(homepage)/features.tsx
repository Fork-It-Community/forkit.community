const features = [
  {
    name: "Conferences",
    description:
      "Content-rich sessions focused on practical applications and real-world solutions.",
  },
  {
    name: "Meetups",
    description:
      "Relaxed moments for exchanging ideas, building connections, and collaborating",
  },
  {
    name: "Workshops",
    description:
      "Immerse yourself in interactive workshops to enhance your practical skills.",
  },
  {
    name: "Podcast",
    description: "For debriefing on new trends post-hype.",
  },
  {
    name: "Hackathon",
    description: "To leave space for the best to excel.",
  },
] as const;

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto flex max-w-2xl flex-col gap-10 px-6 md:gap-16 lg:max-w-5xl lg:px-8">
        <div className="lg:mx-auto lg:text-center">
          <h2 className="font-heading text-base font-semibold leading-7 text-primary">
            Real-life experiences
          </h2>
          <p className="font-heading text-2xl font-bold sm:text-4xl">
            WorldWide Connections
          </p>
        </div>
        <div className="mx-auto">
          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center font-heading text-xl font-semibold leading-7">
                  Fork it!&nbsp;
                  <span className="text-primary">{feature.name}</span>
                </dt>
                <dd className="flex flex-auto flex-col text-balance text-sm text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
