import { lang } from "@/lib/lang";
import { ROUTES } from "@/routes.gen";
import { lunalink } from "@bearstudio/lunalink";
import type { CollectionEntry } from "astro:content";
import { IoLanguageSharp } from "react-icons/io5";

export const VideoCard = ({ talk }: { talk: CollectionEntry<"talks"> }) => {
  return (
    <a
      href={lunalink(ROUTES.resources.videos[":id"].__path, {
        id: talk.data.vod?.youtubeId ?? "",
      })}
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
