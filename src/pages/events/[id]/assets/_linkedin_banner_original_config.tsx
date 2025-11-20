import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@/generated-assets/image";
import { COLORS } from "@/generated-assets/theme";
import { getEventData } from "./_utils";
import { getEventDisplayDate, getEventDisplayType } from "@/lib/events";
import { BgImage } from "@/generated-assets/components/BgImage";
import youtubeBannerCover from "@/assets/images/youtube.jpg";

export const config: AssetImageConfig = {
  width: 1128,
  height: 191,
};

export function linkedinBanner(options: { width: number; height: number }) {
  return async ({ params }: { params: { id: string } }) => {
    const event = await getEventData(params.id);
    const eventCover = await getAstroImageBase64(event.data.image.media);
    const postCover = await getAstroImageBase64(youtubeBannerCover);

    return (
      <Frame {...options} style={{ paddingRight: 48 }}>
        <BgImage
          src={postCover}
          width={options.width}
          height={options.height}
        />

        <div
          style={{
            zIndex: 100,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                textTransform: "uppercase",
                width: 350,
                lineHeight: 1.1,
              }}
            >
              global developer conferences
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 14,
                letterSpacing: "0.03rem",
                gap: 6,
              }}
            >
              <div
                style={{
                  opacity: 0.6,
                }}
              >
                keep in touch on
              </div>
              <div
                style={{
                  color: COLORS.primary,
                }}
              >
                www.forkit.community
              </div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              width: 340,
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <img
              src={eventCover}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 1,
                borderRadius: 8,
              }}
            />
            <div
              style={{
                position: "absolute",
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 2,
                opacity: 1,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 10,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    opacity: 0.9,
                    display: "flex",
                  }}
                >
                  Next {getEventDisplayType(event.data.type)}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                  }}
                >
                  {getEventDisplayDate(event)}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    display: "flex",
                  }}
                >
                  {event.data._computed.city?.data.name},{" "}
                  {event.data._computed.country?.data.name}
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  fontSize: 10,
                  padding: "6px 12px",
                  border: "1px solid rgba(0, 0, 0, 0)",
                  marginRight: "auto",
                  borderRadius: 4,
                  marginTop: 18,
                }}
              >
                Tickets available soon
              </div>
            </div>
          </div>
        </div>
      </Frame>
    );
  };
}

export default linkedinBanner(config);
