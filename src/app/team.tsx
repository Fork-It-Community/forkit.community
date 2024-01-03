import teamMember from "@/content/teamMember";
import Image from "next/image";

export async function Team() {
  const members = await teamMember.getCollection();

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl uppercase font-heading">
            The <span className="text-primary">organizers</span>
          </h2>
          <p className="mt-6 text-sm leading-6">
            Developers, makers and experienced in event organisation, the
            organizers are here to provide you with the best developer events.
          </p>
        </div>
        <ul className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {members.map((member) => (
            <li key={member.name}>
              <Image
                className="aspect-square w-full rounded-2xl object-cover"
                src={member.imageUrl}
                width={300}
                height={300}
                alt=""
              />
              <h3 className="mt-6 text-sm font-semibold leading-6 tracking-tight ">
                {member.name}
              </h3>
              {member.role && (
                <p className="text-xs leading-5 text-neutral-300">
                  {member.role}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
