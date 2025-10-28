import { Frame } from "@/generated-assets/components/Frame";
import { COLORS } from "@/generated-assets/theme";
import { getEventData } from "./_utils";
import { LogoIcon } from "@/components/LogoIcon";
import { CfpCoverNoFlag } from "@/generated-assets/components/CfpCoverNoFlag";
import { getCoverImage } from "@/lib/events";
import type { AssetImageConfig } from "@bearstudio/astro-dynamic-assets";
import { getAstroImageBase64 } from "@/lib/astro-dynamic-assets";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1080,
};

export default async function cfpCover({ params }: { params: { id: string } }) {
  const event = await getEventData(params.id);
  const flag = event.data._computed.country?.data.flag;

  if (!flag) {
    // because of a type issue, calling first then display (await component)
    const noFlagElement = await CfpCoverNoFlag({ config });

    return (
      <Frame {...config} style={{ padding: 128 }}>
        {noFlagElement}
      </Frame>
    );
  }
  const cover = await getCoverImage("events", event.id);
  const eventflag = await getAstroImageBase64(flag);
  const postCover = await getAstroImageBase64(cover.media);

  return (
    <Frame {...config} style={{ padding: 128 }}>
      <img
        src={postCover}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: config.width,
          height: config.height,
          objectFit: "cover",
          filter: "grayscale(1)",
        }}
      />
      <div
        style={{
          background:
            "linear-gradient(220deg, rgba(23, 23, 23, 0.00) -48.38%, #171717 100%)",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          zIndex: 100,
        }}
      >
        <img
          src={eventflag}
          alt=""
          style={{
            justifyContent: "center",
            alignSelf: "center",
            width: 900,
            borderRadius: 70,
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            flex: 1,
            right: -50,
            bottom: -100,
            overflow: "hidden",
            borderRadius: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              borderColor: "rgba(0,0,0,0.9)",
              borderWidth: 4,
              borderStyle: "solid",
              filter: "blur(4px)",
              backdropFilter: "blur(4px)",
              borderRadius: 20,
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <LogoIcon
            style={{
              width: 118 * 2,
              height: 82 * 2,
              color: COLORS.primary,
              inset: 0,
              margin: 40,
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </Frame>
  );
}
