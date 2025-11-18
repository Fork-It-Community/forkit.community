import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@/generated-assets/image";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";
import { getEventDisplayDate, getEventDisplayType } from "@/lib/events";
import { getEventData } from "./_utils";
import { LogoWithFriends } from "@/generated-assets/components/LogoWithFriends";
import { getTalkData } from "../talks/[talkId]/assets/_utils";
import peoplePlaceholder from "@/assets/images/people-placeholder.jpeg";

export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

export function scheduleShort(options: { width: number; height: number }) {
  return async ({ params }: { params: { id: string } }) => {
    const event = await getEventData(params.id);
    const postCover = await getAstroImageBase64(event.data.image.media);
    const coOrganizersLogos = await Promise.all(
      event.__coOrganizers.map(
        async (coOrganiser) =>
          await getAstroImageBase64(coOrganiser.data.logos.noBgSquare),
      ),
    );

    const talks = await Promise.all(
      event.__talks.slice(0, 3).map(async (talk) => await getTalkData(talk.id)),
    );

    return (
      <Frame {...options} style={{ padding: 96 }}>
        <BgImage
          src={postCover}
          width={options.width}
          height={options.height}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",

            width: "100%",
            justifyContent: "space-between",
            zIndex: 100,
            height: "100%",
          }}
        >
          <LogoWithFriends logos={coOrganizersLogos} />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 124,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: COLORS.primary,
                  marginTop: -16,
                  marginLeft: -6, // Visual alignment
                  textTransform: "uppercase",
                  textShadow: "0 12px 40px rgba(0,0,0,0.7)",
                  maxWidth: 800,
                }}
              >
                {event.data._computed.city?.data.name}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 60,
                  fontWeight: 500,
                  lineHeight: 1,
                  marginBottom: 48,
                  marginTop: -8,
                  color: COLORS.primary,
                  textTransform: "uppercase",
                  textShadow: "0 8px 30px rgba(0,0,0,0.6)",
                }}
              >
                {getEventDisplayType(event.data.type)}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  columnGap: 48,
                  rowGap: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 48,
                    fontWeight: 500,
                    lineHeight: 1,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      flex: "none",
                      opacity: 0.7,
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
                      fontSize: 48,
                      fontWeight: 500,
                      lineHeight: 1.2,
                      textWrap: "balance",
                      maxWidth: 800,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      style={{
                        flex: "none",
                        opacity: 0.7,
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

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              {await Promise.all(
                talks.map(async (talk) => (
                  <div
                    key={talk.id}
                    style={{
                      display: "flex",
                      gap: 20,
                      padding: 24,
                      borderRadius: 32,
                      background: "rgba(0,0,0,0.55)",
                      boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
                      alignItems: "center",
                      maxWidth: 900,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      {await Promise.all(
                        talk.__speakers.map(async (speaker, index) => {
                          const image = await getAstroImageBase64(
                            speaker.data.avatar ?? peoplePlaceholder,
                          );
                          return (
                            <img
                              key={speaker.data.name}
                              src={image}
                              style={{
                                borderRadius: 100,
                                width: 120,
                                height: 120,
                                marginLeft: index === 0 ? 0 : -25,
                                boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
                              }}
                            />
                          );
                        }),
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          fontSize: 36,
                          fontWeight: 500,
                          lineHeight: 1.1,
                          flexWrap: "wrap",
                          maxWidth: 700,
                          textWrap: "balance",
                          wordBreak: "break-word",
                        }}
                      >
                        {talk.data.title}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          fontSize: 32,
                          fontWeight: 500,
                          lineHeight: 1.2,
                          opacity: 0.9,
                        }}
                      >
                        {talk.__speakers
                          .map((speaker) => speaker.data.name)
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                )),
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 500,
                lineHeight: 1.2,
                textTransform: "uppercase",
                opacity: 0.7,
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
                opacity: 0.7,
              }}
            >
              www.forkit.community
            </div>
          </div>
        </div>
      </Frame>
    );
  };
}

export default scheduleShort(config);
