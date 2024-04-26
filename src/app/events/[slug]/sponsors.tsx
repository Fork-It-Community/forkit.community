import collections, { Event } from "@/content/collections";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICONS } from "@/components/icons";
import { Button } from "@/components/ui/button";

async function SponsorImage(
  props: Readonly<{ sponsor: { slug: string; level: string } }>,
) {
  const sponsor = await collections.sponsor.getBySlug(props.sponsor.slug);
  const Content = (await import(`@/content/sponsor/${props.sponsor.slug}.mdx`))
    .default;

  const content = (
    <div
      className={cn("overflow-hidden rounded-md border-2 border-gray-100", {
        "hover:border-gray-200": !!sponsor.href,
      })}
    >
      <Image
        className="w-full"
        src={sponsor.image.src}
        alt={sponsor.image.alt}
        width={1000}
        height={500}
      />
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger>{content}</DialogTrigger>
      <DialogContent className="max-h-[80vh] w-full overflow-y-auto p-0 text-black">
        <DialogHeader>
          <Image
            className="aspect-video w-full"
            src={sponsor.image.src}
            alt={sponsor.image.alt}
            width={320}
            height={192}
            quality={100}
          />
          <div className="relative flex min-h-[25vh] flex-1 flex-col overflow-hidden">
            <DialogDescription className="absolute inset-0 overflow-y-auto px-4 py-2">
              <div className="prose prose-invert text-left prose-headings:font-heading">
                <h3>{sponsor.name}</h3>
                <Content />
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>

        {sponsor.href && (
          <DialogFooter className="items-center gap-4 p-4 text-white">
            {!!sponsor.socials && (
              <div className="flex gap-4">
                <ul className="flex gap-x-4">
                  {sponsor.socials.map((social) => (
                    <li key={social.type}>
                      <a
                        href={social.href}
                        className=" transition hover:text-primary"
                        target="_blank"
                      >
                        <span className="sr-only">{social.type}</span>
                        {ICONS[social.type]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button asChild>
              <Link href={sponsor.href} target="_blank" rel="noreferer">
                Visit {sponsor.name} website
              </Link>
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SponsorImagePlaceholder(
  props: Readonly<{ prospectus: Event["prospectus"] }>,
) {
  return (
    <Link
      href={props.prospectus?.href ?? "#"}
      title={props.prospectus?.title}
      target="_blank"
      rel="noreferer"
      className="flex w-full items-center justify-center overflow-hidden rounded-md border-2 border-gray-100 bg-gray-950 p-4 text-center text-sm font-medium text-white hover:text-gray-300"
    >
      <div>Become sponsor</div>
    </Link>
  );
}

export function Sponsors(props: Readonly<{ event: Event }>) {
  return (
    <div className="bg-gray-950 py-20 text-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto pb-4">
          <h2 className="text-center font-heading text-4xl font-bold tracking-tight text-white sm:text-4xl md:text-4xl">
            Sponsors
          </h2>
        </div>
        {props.event.sponsoringLevels.map((level) => {
          const levelSponsors =
            props.event.sponsors?.filter(
              (sponsor) => sponsor.level === level,
            ) ?? [];
          return (
            <div key={level} className="bg-gray-950 py-8">
              <div className="mx-auto max-w-7xl">
                <h3 className="mb-4 font-heading text-2xl font-bold capitalize tracking-tight text-white">
                  {level.toLocaleLowerCase()}
                </h3>
                <div
                  className={cn(
                    "grid grid-cols-2 gap-4 sm:mx-0 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8",
                    level === "SILVER" && "sm:grid-cols-2 lg:grid-cols-3",
                  )}
                >
                  {levelSponsors.map((sponsor) => (
                    <SponsorImage key={sponsor.slug} sponsor={sponsor} />
                  ))}
                  {levelSponsors.length <= 1 &&
                    props.event.prospectus?.endDate &&
                    new Date().getTime() <=
                      props.event.prospectus.endDate.getTime() && (
                      <SponsorImagePlaceholder
                        prospectus={props.event.prospectus}
                      />
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
