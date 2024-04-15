import Image from "next/image";
import collections, { Event } from "@/content/collections";
import { ICONS } from "@/components/icons";
import ImgForkItLogo from "@/../public/forkit-medium.svg";
import { Button } from "@/components/ui/button";
import { NEWSLETTER_HREF } from "@/lib/constants";

async function Speaker(props: Readonly<{ speaker: { slug: string } }>) {
  const speaker = await collections.speaker.getBySlug(props.speaker.slug);

  const content = (
    <div className="flex flex-col gap-3">
      <Image
        className="mx-auto aspect-square rounded-2xl"
        src={speaker.imageUrl || ImgForkItLogo}
        alt={speaker.name}
        width={600}
        height={600}
      />
      <div className="flex flex-col gap-3 px-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold leading-6 tracking-tight text-white md:text-xl">
            {speaker.name}
          </h3>
          {!!speaker.job && (
            <p className="text-base leading-5 text-gray-400">{speaker.job}</p>
          )}
          {!!speaker.company &&
            (speaker.company.href ? (
              <a
                href={speaker.company.href}
                target="_blank"
                className="text-sm leading-5 text-gray-400 underline hover:text-primary"
              >
                {speaker.company.title}
              </a>
            ) : (
              <p className="text-sm leading-5 text-gray-400">
                {speaker.company.title}
              </p>
            ))}
        </div>
        {!!speaker.socials && (
          <ul className="flex gap-x-4">
            {speaker.socials.map((social) => (
              <li key={social.type}>
                <a
                  href={social.href}
                  className=" text-gray-400 transition hover:text-primary"
                  target="_blank"
                >
                  <span className="sr-only">{social.type}</span>
                  {ICONS[social.type]}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return content;
}

async function OtherSpeaker() {
  return (
    <a href={NEWSLETTER_HREF} className="flex flex-col gap-3">
      <div className="mx-auto flex aspect-square w-full flex-col items-center justify-center gap-4 text-balance rounded-2xl bg-gray-900 px-4 pt-4 text-center">
        <Image
          className="w-32 max-w-[75%] sm:w-40"
          src={ImgForkItLogo}
          alt="Fork it!"
        />
        <p className="text-sm leading-5 text-gray-400">
          Other speakers coming soon
        </p>
        <Button asChild variant="secondary" size="sm">
          <span>Get notified</span>
        </Button>
      </div>
    </a>
  );
}

export function Speakers(props: Readonly<{ event: Event }>) {
  return (
    <div className="bg-gray-950 py-24 sm:py-32" id="speakers">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Speakers
          </h2>
        </div>
        <div className="mx-auto mt-12 grid grid-cols-2 justify-center gap-6 sm:grid-cols-3 md:grid-cols-[repeat(auto-fit,_minmax(12rem,_14rem))] lg:mx-0 lg:max-w-none lg:gap-8">
          {props.event.speakers?.map((speaker) => (
            <Speaker
              speaker={{
                slug: speaker,
              }}
              key={speaker}
            />
          ))}
          <OtherSpeaker />
        </div>
      </div>
    </div>
  );
}
