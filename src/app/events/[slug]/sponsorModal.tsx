import { Button } from "@/components/ui/button";
import collections, { Event } from "@/content/collections";
import { cn } from "@/lib/utils";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { ICONS } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";

export async function SponsorModal(
  props: Readonly<{ sponsor: { slug: string } }>,
) {
  const sponsor = await collections.sponsor.getBySlug(props.sponsor.slug);
  const Content = (await import(`@/content/sponsor/${props.sponsor.slug}.mdx`))
    .default;
  return (
    <DialogContent className="sm:max-w-[800px]">
      <DialogHeader className="flex flex-col gap-4">
        <DialogTitle className="font-heading text-2xl font-bold">
          {sponsor.name}
        </DialogTitle>
        <DialogDescription className="flex flex-col gap-4 md:flex-row">
          <Image
            className="hidden max-w-sm sm:flex"
            src={sponsor.image.src}
            alt={sponsor.image.alt}
            width={270}
            height={162}
          />
          <div className="flex flex-col gap-2 text-xs md:text-sm">
            <Content />
          </div>
        </DialogDescription>
      </DialogHeader>
      {!!sponsor.socials && (
        <div className="flex gap-4">
          <p className="text-lg font-bold">Socials : </p>
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
      {sponsor.href && (
        <DialogFooter>
          <Button>
            <Link href={sponsor.href} target="_blank" rel="noreferer">
              Visit {sponsor.name} website
            </Link>
          </Button>
        </DialogFooter>
      )}
    </DialogContent>
  );
}
