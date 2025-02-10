import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@/generated-assets/image";
import { BgImage } from "@/generated-assets/components/BgImage";
import { getEntry } from "astro:content";

export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

export default async function () {
  const event = await getEntry("events", "2024-france-rouen");
  if (!event) {
    throw new Error("Not found");
  }
  const postCover = await getAstroImageBase64(event.data.image.media);
  return (
    <Frame {...config} style={{ padding: 128 }}>
      <BgImage src={postCover} width={config.width} height={config.height} />
      <div>Hello</div>
    </Frame>
  );
}
