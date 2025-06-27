import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { IoLanguageSharp } from "react-icons/io5";
import { lang } from "@/lib/lang";
import { useState } from "react";
import type { CollectionEntry } from "astro:content";
import type { EventComputed } from "@/lib/events";
import dayjs from "dayjs";

export const EventVideosCards = (props: {
  event: EventComputed;
  talks: CollectionEntry<"talks">[];
}) => {
  const [open, setOpen] = useState(false);
  const initialTalks = props.talks.slice(0, 3);
  const hasMore = props.talks.length > 3;

  return (
    <section className="space-y-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="mb-2 font-heading text-xl font-medium">
          {`${props.event.data._computed.city?.data.name}, ${props.event.data._computed.country?.data.name}, ${dayjs(props.event.data.date).year()}`}
        </h2>
        {hasMore && (
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="secondary">
                {open ? "Show Less" : "Show More"}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {initialTalks.map((talk) => (
          <VideoCard talk={talk} key={talk.id} />
        ))}
      </div>

      {hasMore && (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleContent>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {props.talks.slice(3).map((talk) => (
                <VideoCard talk={talk} key={talk.id} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </section>
  );
};

const VideoCard = ({ talk }: { talk: CollectionEntry<"talks"> }) => {
  return (
    <a
      href={`/resources/videos/${talk.data.vod?.youtubeId}`}
      className="group relative z-10 flex h-full flex-col gap-4 overflow-hidden rounded-lg bg-white/5 backdrop-blur-md transition duration-500 hover:bg-white/10"
    >
      <div className="aspect-video">
        {talk.data.vod?.type === "youtube" && (
          <img
            src={`https://img.youtube.com/vi/${talk.data.vod.youtubeId}/maxresdefault.jpg`}
            alt={talk.data.title}
            className="h-full w-full object-cover"
            width={480}
            height={320}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <h3
          className="line-clamp-2 text-sm font-medium"
          lang={lang(talk.data.contentLanguage)}
        >
          {talk.data.title}
        </h3>
        <div className="mt-4 flex w-fit items-center gap-1.5 rounded-full border border-black/60 bg-black/40 px-2 py-0.5 text-2xs font-bold uppercase leading-none opacity-60 transition group-hover:opacity-100">
          <IoLanguageSharp className="text-base" />
          <span>Talk in {talk.data.language}</span>
        </div>
      </div>
    </a>
  );
};
