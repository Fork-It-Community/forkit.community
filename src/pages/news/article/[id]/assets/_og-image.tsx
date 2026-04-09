import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@bearstudio/astro-assets-generation";
import { BgImage } from "@/generated-assets/components/BgImage";
import { Logo } from "@/components/Logo";
import { getNewsCollection } from "@/lib/news";
import defaultBackgroundImage from "@/assets/images/news.jpeg";
import dayjs from "dayjs";
import { NotFoundAssetError } from "@bearstudio/astro-assets-generation";
import { OG_IMAGE } from "@/assets/consts";

export const config: AssetImageConfig = OG_IMAGE;

export default async function ({ params }: { params: { id: string } }) {
  const news = await getNewsCollection();
  const article = news.find((n) => n.id === params.id);

  if (!article) {
    throw new NotFoundAssetError();
  }

  const background = await getAstroImageBase64(
    article.data.featuredImage ?? defaultBackgroundImage,
  );
  return (
    <Frame {...config} style={{ padding: 128 }}>
      <BgImage
        src={background}
        width={config.width}
        height={config.height}
        gradientAngle={10}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 96,
          flex: 1,
          width: "100%",
          justifyContent: "end",
          zIndex: 100,
        }}
      >
        <Logo style={{ width: 169 * 3, height: 18 * 3 }} color="white" />

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
            {article.data.title}
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
            NEWS · {dayjs(article.data.date).format("MMMM DD, YYYY")}
          </div>
        </div>
      </div>
    </Frame>
  );
}
