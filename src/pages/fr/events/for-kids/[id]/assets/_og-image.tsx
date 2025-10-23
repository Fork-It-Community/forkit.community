import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@/generated-assets/image";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";

import { getEventData } from "./_utils";
import { LogoForKids } from "@/components/LogoForKids";
import coverImage from "@/assets/images/for-kids-event.jpg";
import { getForKidsEventFrenchDisplayDate } from "@/lib/forKidsEvents";

export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

export default async function ({ params }: { params: { id: string } }) {
  const event = await getEventData(params.id);
  const postCover = await getAstroImageBase64(coverImage);
  return (
    <Frame {...config} style={{ padding: 128 }}>
      <BgImage src={postCover} width={config.width} height={config.height} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 128,
          width: "100%",
          justifyContent: "center",
          zIndex: 100,
        }}
      >
        <LogoForKids style={{ width: 169 * 3, height: 36 * 3 }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 500,
              marginLeft: -6, // Visual alignment
            }}
          >
            {getForKidsEventFrenchDisplayDate(event.data.date)}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 500,
              color: COLORS.primary,
              marginTop: -16,
              marginLeft: -2, // Visual alignment
            }}
          >
            {event.data._computed.city?.data.name},{" "}
            {event.data._computed.country?.data.name}
          </div>
        </div>
      </div>
    </Frame>
  );
}
