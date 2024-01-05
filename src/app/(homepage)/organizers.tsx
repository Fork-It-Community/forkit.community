import collections from "@/content/collections";
import Image from "next/image";

export async function Organizers() {
  const allOrganizers = await collections.organizer.getAll();

  return (
    <div className="bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 flex flex-col gap-4">
          <h2 className="text-3xl font-bold sm:text-4xl uppercase font-heading">
            The <span className="text-primary">organizers</span>
          </h2>
          <p className="text-sm text-gray-400 text-balance max-w-[60ch]">
            A group of devs and non-devs from Normandy (France), who, over their
            years of experience, want to satisfy their thirst of real life
            experiences.
          </p>
          <p className="text-sm text-gray-400 text-balance max-w-[60ch]">
            With Fork it!, we are committed to creating a community of
            passionate developers, free of unnecessary jargon, divas and
            bullshit. Our mission is simple: share real XP, inspire innovation,
            and connect creative minds.
          </p>
        </div>
        <ul className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {allOrganizers.map((organizer) => (
            <li key={organizer.name} className="flex flex-col gap-4">
              <Image
                className="aspect-square w-full rounded-sm object-cover object-top bg-black"
                src={organizer.imageUrl}
                width={300}
                height={300}
                alt=""
              />
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-semibold">{organizer.name}</h4>
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
