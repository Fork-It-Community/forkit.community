"use client";

import { ExternalLink, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDisclosure } from "react-use-disclosure";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import ImgForkItLogo from "@/../public/forkit-medium.svg";
import { Button } from "@/components/ui/button";
import { Meetup } from "@/content/collections";
import { shouldDisplayTicketButton } from "@/lib/utils";

export function Header(props: Readonly<{ meetup: Meetup }>) {
  const navigation = [
    { name: "Venue", href: "#venue", shouldDisplayItem: true },
    { name: "Schedule", href: "#schedule", shouldDisplayItem: true },
    {
      name: "Speakers",
      href: "#speakers",
      shouldDisplayItem: !!props.meetup.speakers,
    },
    { name: "Talks", href: "#talks", shouldDisplayItem: !!props.meetup.talks },
    {
      name: "Sponsors",
      href: "#sponsors",
      shouldDisplayItem:
        !!props.meetup.sponsors && !!props.meetup.sponsoringLevels,
    },
    { name: "FAQ", href: "#faq", shouldDisplayItem: !!props.meetup.faq },
  ];

  const sheet = useDisclosure();
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-10 bg-gray-950">
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 pl-6 pr-4 lg:px-8"
          aria-label="Global"
        >
          <div className="flex-1">
            <Link href={`/meetups/${props.meetup.metadata.slug}`}>
              <span className="sr-only">Fork it! Community</span>
              <Image className="w-32 sm:w-40" src={ImgForkItLogo} alt="" />
            </Link>
          </div>
          <div className="flex gap-3 lg:hidden">
            {shouldDisplayTicketButton(props.meetup) && (
              <div className="flex items-center justify-center gap-x-6">
                <Button asChild size="sm">
                  <a href={props.meetup.tickets?.href}>Get tickets</a>
                </Button>
              </div>
            )}
            <Sheet open={sheet.isOpen} onOpenChange={sheet.toggle}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" onClick={sheet.open}>
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full max-w-80">
                <SheetHeader>
                  <div className="flex items-center justify-between">
                    <Link href="/">
                      <span className="sr-only">Fork it! Community</span>
                      <Image className="w-32" src={ImgForkItLogo} alt="" />
                    </Link>
                  </div>
                </SheetHeader>
                <SheetDescription>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        {navigation.map(
                          (item) =>
                            item.shouldDisplayItem && (
                              <Link
                                key={item.name}
                                href={`/meetups/${props.meetup.metadata.slug}${item.href}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  sheet.close();
                                }}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                              >
                                {item.name}
                              </Link>
                            ),
                        )}
                      </div>
                      {shouldDisplayTicketButton(props.meetup) && (
                        <div className="flex gap-x-6 py-6">
                          <Button asChild>
                            <a href={props.meetup.tickets?.href}>
                              Get tickets{" "}
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map(
              (item) =>
                item.shouldDisplayItem && (
                  <Link
                    key={item.name}
                    href={`/meetups/${props.meetup.metadata.slug}${item.href}`}
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    {item.name}
                  </Link>
                ),
            )}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {shouldDisplayTicketButton(props.meetup) && (
              <div className="flex items-center justify-center gap-x-6">
                <Button asChild>
                  <a href={props.meetup.tickets?.href}>Get tickets</a>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </header>
      <div className="h-16" />
    </>
  );
}
