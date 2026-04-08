import { NotFoundAssetError } from "@bearstudio/astro-assets-generation";
import { getEntry } from "astro:content";

export const getTalkAssetDownloadFileName = async (
  eventId: string,
  talkId: string,
  assetName: string,
) => {
  const talk = await getEntry("talks", talkId);
  if (!talk) return `${eventId}-${talkId}-${assetName}.jpg`;
  const speakerNames = talk.data.speakers.map((s) => s.id.id).join("-");
  return `${eventId}-${speakerNames}-${assetName}.jpg`;
};

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
