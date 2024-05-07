"use client";
import { Sponsor } from "@/content/collections";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ICONS } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function SponsorModal(
  props: Readonly<{ sponsor: Sponsor; content: any; Content: any }>,
) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger> {props.content}</DialogTrigger>
        <DialogContent className="max-h-[80vh] w-full overflow-y-auto p-0 text-black">
          <DialogHeader>
            <Image
              className="aspect-video w-full"
              src={props.sponsor.image.src}
              alt={props.sponsor.image.alt}
              width={320}
              height={192}
            />
            <div className="relative flex min-h-[25vh] flex-1 flex-col overflow-hidden">
              <DialogDescription className="absolute inset-0 overflow-y-auto px-4 py-2">
                <div className="prose prose-invert text-left prose-headings:font-heading">
                  <h3>{props.sponsor.name}</h3>
                  {props.Content}
                </div>
              </DialogDescription>
            </div>
          </DialogHeader>
          {props.sponsor.href && (
            <DialogFooter className="items-center gap-4 p-4 text-white">
              {!!props.sponsor.socials && (
                <div className="flex gap-4">
                  <ul className="flex gap-x-4">
                    {props.sponsor.socials.map((social) => (
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
                <Link href={props.sponsor.href} target="_blank" rel="noreferer">
                  Visit {props.sponsor.name} website
                </Link>
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>{props.content}</DrawerTrigger>
      <DrawerContent className="max-h-[80vh] w-full p-0 text-black">
        <DrawerHeader>
          <Image
            className="aspect-video w-full"
            src={props.sponsor.image.src}
            alt={props.sponsor.image.alt}
            width={320}
            height={192}
          />
          <div className="relative flex min-h-[25vh] flex-1 flex-col overflow-hidden">
            <DrawerDescription className="absolute inset-0 overflow-y-auto px-4 py-2">
              <div className="prose prose-invert text-left prose-headings:font-heading">
                <h3>{props.sponsor.name}</h3>
                {props.Content}
              </div>
            </DrawerDescription>
          </div>
        </DrawerHeader>
        {props.sponsor.href && (
          <DrawerFooter className="items-center gap-4 p-4 text-white">
            {!!props.sponsor.socials && (
              <div className="flex gap-4">
                <ul className="flex gap-x-4">
                  {props.sponsor.socials.map((social) => (
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
              <Link href={props.sponsor.href} target="_blank" rel="noreferer">
                Visit {props.sponsor.name} website
              </Link>
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
