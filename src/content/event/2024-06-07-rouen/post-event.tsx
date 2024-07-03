import { EventFrontmatter } from "@/content/collections";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { YouTubeEmbed } from "@next/third-parties/google";

export function PostEvent(
  props: Readonly<{
    event: Omit<EventFrontmatter, "date"> & { date?: string };
  }>,
) {
  return (
    <div id="post-event" className="bg-gray-900">
      <div className="flex flex-col py-6 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What happend?
        </h2>
        {props.event.date && <p>{formatDateTime(props.event.date)} summary!</p>}
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-4 px-4 lg:grid-cols-2">
        <div className="aspect-video w-full overflow-hidden">
          <YouTubeEmbed videoid="HLGnkpZ-Q1Q" style="max-width:none" />
        </div>
        <div className="grid gap-2 lg:grid-cols-2 lg:gap-0">
          {props.event.postEventPictures &&
            props.event.postEventPictures.map((picture) => (
              <Image
                key={picture}
                src={picture}
                alt="bla"
                className="w-full"
                width={4220}
                height={2832}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
