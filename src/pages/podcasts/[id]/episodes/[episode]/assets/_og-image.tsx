import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@/generated-assets/image";
import { BgImage } from "@/generated-assets/components/BgImage";
import { Logo } from "@/components/Logo";
import dayjs from "dayjs";
import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import backgroundImage from "@/assets/images/podcasts.jpeg";
import { COLORS } from "@/generated-assets/theme";
import { NotFoundAssetError } from "@/generated-assets/api";
import { OG_IMAGE } from "@/assets/consts";

export const config: AssetImageConfig = OG_IMAGE;

export default async function ({
  params,
}: {
  params: { id: string; episode: string };
}) {
  const episodes = await getPodcastsEpisodesCollection();
  const episode = episodes.find(
    (e) => e.id === `${params.id}/episodes/${params.episode}`,
  );

  if (!episode) {
    throw new NotFoundAssetError();
  }

  const episodeCover = await getAstroImageBase64(episode.data.cover);
  const background = await getAstroImageBase64(backgroundImage);
  return (
    <Frame {...config} style={{ flexDirection: "row", padding: 128 }}>
      <BgImage src={background} width={config.width} height={config.height} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 128,
          flex: 1,
          width: "100%",
          minWidth: 0,
          justifyContent: "center",
          zIndex: 100,
          paddingRight: 60,
        }}
      >
        <Logo style={{ width: 169 * 3, height: 18 * 3 }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 48,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 500,
              textTransform: "uppercase",
              opacity: 0.6,
              letterSpacing: 4,
            }}
          >
            {dayjs(episode.data.releaseDate).format("MMMM DD, YYYY")}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 500,
              lineHeight: 1.1,
              marginLeft: -6, // Visual alignment
              textWrap: "balance",
            }}
          >
            {episode.data.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 48,
              fontWeight: 500,
              color: COLORS.primary,
              marginLeft: -2, // Visual alignment
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {episode.data.language} Podcast
          </div>
        </div>
      </div>

      <img
        src={episodeCover}
        alt=""
        style={{
          width: 600,
          height: 600,
          objectFit: "cover",
          borderRadius: 12,
          zIndex: 10,
        }}
      />
    </Frame>
  );
}
