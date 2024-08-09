import collections from "@/content/collections";
import Image from "next/image";

export async function Organizers() {
  const allOrganizers = await collections.organizer.getAll();

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 lg:mx-0">
          <h2 className="font-heading text-3xl font-bold uppercase sm:text-4xl">
            The <span className="text-primary">organizers</span>
          </h2>
          <p className="max-w-[60ch] text-balance text-sm text-gray-400">
            A group of devs and non-devs from Normandy (France), who, over their
            years of experience, want to satisfy their thirst of real life
            experiences.
          </p>
          <p className="max-w-[60ch] text-balance text-sm text-gray-400">
            With Fork it!, we are committed to creating a community of
            passionate developers, free of unnecessary jargon, divas and
            bullshit. Our mission is simple: share real XP, inspire innovation,
            and connect creative minds.
          </p>
        </div>
        <ul className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {allOrganizers.map((organizer) => (
            <li key={organizer.name} className="flex flex-col gap-4">
              <Image
                className="aspect-square w-full rounded-sm bg-black object-cover object-top"
                src={organizer.imageUrl}
                width={300}
                height={300}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 150px, 300px"
                alt={`Picture of ${organizer.name}, organizer of Fork it!`}
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{organizer.name}</p>
                {organizer.role && (
                  <p className="text-xs text-gray-300">{organizer.role}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
