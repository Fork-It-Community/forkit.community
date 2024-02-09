import { ExternalLink, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import ImgForkItLogo from "@/../public/forkit-medium.svg";
import { Button } from "@/components/ui/button";
import { Event } from "@/content/collections";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Venue", href: "#venue" },
  { name: "Sponsors", href: "#sponsors" },
  // { name: "Join us", href: "#socials" },
];

export function Header(props: { event: Event }) {
  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex-1">
          <Link href="/">
            <span className="sr-only">Fork it! Community</span>
            <Image className="w-40" src={ImgForkItLogo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <Link href="/">
                    <span className="sr-only">Fork it! Community</span>
                    <Image className="w-40" src={ImgForkItLogo} alt="" />
                  </Link>
                </div>
              </SheetHeader>
              <SheetDescription>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    {props.event.tickets && (
                      <div className="flex gap-x-6 py-6">
                        <Button asChild>
                          <a href={props.event.tickets.href}>
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
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {props.event.tickets && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild>
                <a href={props.event.tickets.href}>Get tickets</a>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
