import { Event } from "@/content/collections";
import Image from "next/image";

function SponsorsCol(props: {
  level: string;
  sponsors?: Array<{ slug: string; level: string }>;
}) {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              {props.level}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
              egestas tempus tellus etiam sed. Quam a scelerisque amet
              ullamcorper eu enim et fermentum, augue.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            {props.sponsors?.map((sponsorInfo, index) => (
              <>
                {sponsorInfo.level === props.level && (
                  <div key={index}>
                    <Image
                      className="max-h-12 w-full object-contain"
                      src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
                      alt="Transistor"
                      width={158}
                      height={48}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sponsors(props: { event: Event }) {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pb-16 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Meet our sponsors
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Highlighting the supporters that make our events possible.
          </p>
        </div>
        {props.event.sponsoringLevels.map((level, index) => (
          <SponsorsCol
            key={index}
            level={level}
            sponsors={props.event.sponsors}
          />
        ))}
      </div>
    </div>
  );
}
