import { EventFrontmatter } from "@/content/collections";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PostEvent(
  props: Readonly<{
    event: Omit<EventFrontmatter, "date"> & { date?: string };
  }>,
) {
  return (
    <div id="post-event" className="flex flex-col gap-12 bg-gray-950 py-24">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What happend?
        </h2>
        {props.event.date && (
          <p className="text-primary">
            {formatDateTime(props.event.date)} summary!
          </p>
        )}
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-4 px-4 lg:grid-cols-2">
        <div className="aspect-video w-full overflow-hidden">
          <YouTubeEmbed videoid="HLGnkpZ-Q1Q" style="max-width:none" />
        </div>
        <div className="grid gap-2 lg:grid-cols-2 lg:gap-0">
          {props.event.postEventPictures &&
            props.event.postEventPictures.map((picture) => (
              <Image
                key={picture.src}
                src={picture.src}
                alt={picture.alt}
                className="w-full"
                width={4220}
                height={2832}
              />
            ))}
        </div>
      </div>
      <div className="mx-auto flex flex-col justify-center gap-6 md:flex-row">
        <Button asChild>
          <Link
            href="https://www.youtube.com/playlist?list=PLnfCgE11xujteT3e9wpbecCiXp446UIlK"
            target="_blank"
          >
            Discover all the VODs
          </Link>
        </Button>
        <Button asChild>
          <Link
            href="https://drive.google.com/drive/folders/1GHA6-P3wSJti1IZxL32bQcYm6-8owEKQ"
            target="_blank"
          >
            Explore all the photos
          </Link>
        </Button>
        <Button asChild>
          <Link href="https://linktr.ee/forkit.community" target="_blank">
            All Fork it! social media
          </Link>
        </Button>
      </div>
    </div>
  );
}
