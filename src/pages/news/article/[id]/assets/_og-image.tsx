import { Frame } from "@/generated-assets/components/Frame";
import { BgImage } from "@/generated-assets/components/BgImage";
import { Logo } from "@/components/Logo";
import { getNewsCollection } from "@/lib/news";
import defaultBackgroundImage from "@/assets/images/news.jpeg";
import dayjs from "dayjs";
import {
  NotFoundAssetError,
  type AssetImageConfig,
} from "@bearstudio/astro-dynamic-assets";
import DynamicAssets from "@/lib/astro-dynamic-assets";
export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

export default async function ({ params }: { params: { id: string } }) {
  const news = await getNewsCollection();
  const article = news.find((n) => n.id === params.id);

  if (!article) {
    throw new NotFoundAssetError();
  }

  const background = await DynamicAssets.getAstroImageBase64(
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
