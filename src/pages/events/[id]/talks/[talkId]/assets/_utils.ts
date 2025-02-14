import { NotFoundAssetError } from "@/generated-assets/api";
import { getEntry } from "astro:content";

export const getTalkData = async (talkId: string) => {
  const talk = await getEntry("talks", talkId);

  if (!talk) {
    throw new NotFoundAssetError();
  }

  const speakers = await Promise.all(
    talk.data.speakers.map(async (speaker) => ({
      ...speaker,
      ...(await getEntry(speaker.id)),
    })),
  );
  return { ...talk, __speakers: speakers };
};
