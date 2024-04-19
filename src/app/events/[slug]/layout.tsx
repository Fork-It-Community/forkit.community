import collections from "@/content/collections";
import { Header } from "./header";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

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
    return notFound();
  }
}
