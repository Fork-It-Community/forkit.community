import { Logo } from "@/components/Logo";
import {
  COLORS,
  generateImageMethods,
  getAstroImageBase64,
} from "@/dynamic-images/utils";
import dayjs from "dayjs";
import backgroundImage from "@/assets/images/podcasts.jpeg";
import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import { Frame } from "@/dynamic-images/components/Frame";
import { BgImage } from "@/dynamic-images/components/BgImage";

export default generateImageMethods({
  width: 1920,
  height: 1080,
  getStaticPaths: async () => {
    const episodes = await getPodcastsEpisodesCollection();

    return episodes.map((e) => {
      const [id = "", _, episode] = e.id.split("/");

      return {
        params: { id, episode },
        props: {
          episode: e,
          number: episode,
        },
      };
    });
  },
  render: async (props) => {
    const episodeCover = await getAstroImageBase64(props.episode.data.cover);
    const background = await getAstroImageBase64(backgroundImage);
    return (
      <Frame
        {...props.dynamicImage}
        style={{ flexDirection: "row", padding: 128 }}
      >
        <BgImage
          src={background}
          width={props.dynamicImage.width}
          height={props.dynamicImage.height}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 128,
            flex: 1,
            width: "100%",
            minWidth: 0,
            justifyContent: "center",
            fontFamily: "Tomorrow",
            color: COLORS.white,
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
              {dayjs(props.episode.data.releaseDate).format("MMMM DD, YYYY")}
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
              {props.episode.data.title}
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
              {props.episode.data.language} Podcast
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
  },
});
