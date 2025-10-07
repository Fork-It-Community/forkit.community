import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@/generated-assets/image";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";
import peoplePlaceholder from "@/assets/images/people-placeholder.jpeg";
import { getEventDisplayDate } from "@/lib/events";
import { getEventData } from "@/pages/events/[id]/assets/_utils";
import { LogoWithFriends } from "@/generated-assets/components/LogoWithFriends";
import { getTalkData } from "@/pages/events/[id]/talks/[talkId]/assets/_utils";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1350,
};

export default async function ({
  params,
}: {
  params: { id: string; talkId: string };
}) {
  const event = await getEventData(params.id);
  const talk = await getTalkData(params.talkId);

  const postCover = await getAstroImageBase64(event.data.image.media);
  const coOrganizersLogos = await Promise.all(
    event.__coOrganizers.map(
      async (coOrganiser) =>
        await getAstroImageBase64(coOrganiser.data.logos.noBgSquare),
    ),
  );
  const speakersImages = (
    await Promise.all(
      talk.__speakers.map(async (speaker) => {
        const speakerImage = await getAstroImageBase64(
          speaker.data.avatar ?? peoplePlaceholder,
        );
        const flag = speaker.data._computed.country?.data.flag;
        const speakerFlag = flag ? await getAstroImageBase64(flag) : undefined;
        return {
          speakerImage,
          speakerFlag,
        };
      }),
    )
  ).slice(0, 4);
  return (
    <Frame {...config} style={{ padding: 80 }}>
      <BgImage src={postCover} width={config.width} height={config.height} />

      <div
        style={{
          zIndex: 100,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            transform: "scale(0.8)",
            transformOrigin: "top left",
          }}
        >
          <LogoWithFriends logos={coOrganizersLogos} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 500,
              lineHeight: 1.1,
              marginTop: -32,
              color: COLORS.primary,
              textWrap: "balance",
            }}
          >
            {talk.data.title}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 48,
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                flex: "none",
                gap: 12,
                flexWrap: "wrap",
                maxWidth: "50%",
              }}
            >
              {speakersImages.map(
                ({ speakerImage: imgSrc, speakerFlag: flagSrc }, index) => {
                  const size = speakersImages.length > 1 ? 192 : 256;
                  return flagSrc ? (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        width: size,
                        height: size,
                      }}
                    >
                      <img
                        src={imgSrc}
                        style={{
                          width: size,
                          height: size,
                          borderRadius: 8,
                          boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                        }}
                      />

                      <img
                        src={flagSrc}
                        alt="Nationality flag"
                        style={{
                          position: "absolute",
                          bottom: 20,
                          right: 20,
                          width: 54,
                          borderRadius: 4,
                          boxShadow: `
                              0 0 0 8px rgba(42, 43, 43, 0.7),
                              0 4px 12px rgba(0, 0, 0, 0.5)
                            `,
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      key={index}
                      src={imgSrc}
                      style={{
                        width: size,
                        height: size,
                        borderRadius: 8,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                      }}
                    />
                  );
                },
              )}
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "space-between",
                padding: "24px 0",
                columnGap: 48,
                rowGap: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 40,
                  fontWeight: 500,
                }}
              >
                By{" "}
                {talk.__speakers.map((speaker) => speaker.data.name).join(", ")}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  columnGap: 48,
                  rowGap: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 32,
                    lineHeight: 1,
                    width: "100%",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      flex: "none",
                      opacity: 0.6,
                      width: "1em",
                      height: "1em",
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z"
                    />
                  </svg>
                  {getEventDisplayDate(event)}
                </div>
                {!!event.data.location?.name && (
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      fontSize: 32,
                      lineHeight: 1.2,
                      textWrap: "balance",
                      width: "100%",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      style={{
                        flex: "none",
                        opacity: 0.6,
                        width: "1em",
                        height: "1em",
                      }}
                    >
                      <path
                        fill="currentColor"
                        d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                      />
                    </svg>
                    {event.data.location.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.2,
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            {event.data._computed.city?.data.name},{" "}
            {event.data._computed.country?.data.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.2,
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            www.forkit.community
          </div>
        </div>
      </div>
    </Frame>
  );
}
