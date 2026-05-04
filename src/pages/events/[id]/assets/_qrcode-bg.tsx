import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@bearstudio/astro-assets-generation";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";
import { getEventData } from "./_utils";
import { lunalink } from "@bearstudio/lunalink";
import { ROUTES } from "@/routes.gen";
import QRCode from "qrcode";
import type { APIContext } from "astro";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1080,
};

export default async function ({
  params,
  site,
}: { params: { id: string } } & APIContext) {
  const event = await getEventData(params.id);
  const postCover = await getAstroImageBase64(event.data.image.media);
  const url = new URL(
    lunalink(ROUTES.events[":id"].__path, { id: event.id }),
    site,
  ).toString();

  const qrCodeBase64 = await QRCode.toDataURL(url, {
    width: 880,
    margin: 1,
    color: {
      light: COLORS.white,
      dark: "#00000000",
    },
  });

  return (
    <Frame {...config}>
      <BgImage src={postCover} width={config.width} height={config.height} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
        }}
      >
        <img src={qrCodeBase64} />
      </div>
    </Frame>
  );
}
