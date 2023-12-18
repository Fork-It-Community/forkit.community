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
    <div className="bg-neutral-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary font-heading">
            Real-life experiences
          </h2>
          <p className="text-xl font-bold tracking-tight sm:text-4xl font-heading">
            WorldWide Connections
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center text-base font-semibold leading-7 font-heading">
                  Fork it!&nbsp;
                  <span className="text-primary">{feature.name}</span>
                </dt>
                <dd className="flex flex-auto flex-col text-sm">
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
