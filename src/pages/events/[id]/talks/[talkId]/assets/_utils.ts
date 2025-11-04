import { NotFoundAssetError } from "@bearstudio/astro-dynamic-assets";
import { getEntry } from "astro:content";

export const getTalkData = async (talkId: string) => {
  const talk = await getEntry("talks", talkId);

  if (!talk) {
    throw new NotFoundAssetError();
  }

  const speakers = await Promise.all(
    talk.data.speakers.map(async (speaker) => {
      const speakerData = await getEntry(speaker.id);
      const country = speakerData?.data.country
        ? await getEntry("countries", speakerData.data.country.id)
        : undefined;
      return {
        ...speaker,
        ...speakerData,
        data: {
          ...speakerData.data,
          _computed: {
            country,
          },
        },
      };
    }),
  );
  return { ...talk, __speakers: speakers };
};
