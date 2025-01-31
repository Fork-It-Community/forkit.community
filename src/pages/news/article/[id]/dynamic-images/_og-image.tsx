import { Logo } from "@/components/Logo";
import { getNewsCollection } from "@/lib/news";
import {
  generateImageMethods,
  getAstroImageBase64,
} from "@/dynamic-images/utils";
import dayjs from "dayjs";
import defaultBackgroundImage from "@/assets/images/news.jpeg";
import { Frame } from "@/dynamic-images/components/Frame";
import { BgImage } from "@/dynamic-images/components/BgImage";

export default generateImageMethods({
  width: 1920,
  height: 1080,
  getStaticPaths: async () => {
    const news = await getNewsCollection();
    return news.map((article) => {
      return {
        params: { id: article.id },
        props: {
          article,
        },
      };
    });
  },
  render: async (props) => {
    const background = await getAstroImageBase64(
      props.article.data.featuredImage ?? defaultBackgroundImage,
    );
    return (
      <Frame {...props.dynamicImage} style={{ padding: 128 }}>
        <BgImage
          src={background}
          width={props.dynamicImage.width}
          height={props.dynamicImage.height}
          gradientAngle={10}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 96,
            flex: 1,
            width: "100%",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <Logo style={{ width: 169 * 3, height: 18 * 3, marginTop: "auto" }} />

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
                fontSize: 96,
                fontWeight: 500,
                lineHeight: 1,
                marginLeft: -6, // Visual alignment
                textWrap: "balance",
              }}
            >
              {props.article.data.title}
            </div>
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
              NEWS · {dayjs(props.article.data.date).format("MMMM DD, YYYY")}
            </div>
          </div>
        </div>
      </Frame>
    );
  },
});
