import collections from "@/content/collections";
import { Header } from "./header";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import ImgForkItLogo from "@/../public/forkit-medium.svg";

export default async function EventLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  try {
    const event = await collections.event.getBySlug(params.slug);
    return (
      <div className="flex flex-1 flex-col">
        <Header event={event} />
        {children}
      </div>
    );
  } catch {
    // HOT FIX, RSC do not find mdx on page reload.
    return (
      <>
        <header className="fixed left-0 right-0 top-0 z-10 bg-gray-950">
          <nav
            className=" mx-auto flex h-16 max-w-7xl items-center justify-between gap-4  pl-6 pr-4 lg:px-8"
            aria-label="Global"
          >
            <div className="flex flex-1 flex-col">
              <div className="flex-1">
                <Link href={`/events/${params.slug}`}>
                  <span className="sr-only">Fork it! Community</span>
                  <Image className="w-32 sm:w-40" src={ImgForkItLogo} alt="" />
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <div className="h-16" />
        <main>{children}</main>
      </>
    );
  }
}
