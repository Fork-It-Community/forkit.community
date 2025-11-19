import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@/generated-assets/image";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";
import { getEventData } from "./_utils";
import { Logo } from "@/components/Logo";
import { getEventDisplayDate, getEventDisplayType } from "@/lib/events";
import youtubeBannerCover from "@/assets/images/youtube.jpg";

export const config: AssetImageConfig = {
  width: 2560,
  height: 1440,
};

export function youtubeBanner(options: { width: number; height: number }) {
  return async ({ params }: { params: { id: string } }) => {
    const event = await getEventData(params.id);
    console.log("youtubeBannerCover", youtubeBannerCover);
    const eventCover = await getAstroImageBase64(event.data.image.media);

    const postCover = await getAstroImageBase64(youtubeBannerCover);

    return (
      <Frame {...options} style={{ padding: 96 }}>
        <BgImage
          src={postCover}
          width={options.width}
          height={options.height}
        />

        <div
          style={{
            zIndex: 100,
            flex: 1,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            <Logo
              style={{
                width: 507,
                height: 54,
              }}
            />

            <div
              style={{
                display: "flex",
                fontSize: 86,
                fontWeight: 500,
                lineHeight: 1,
                marginTop: -16,
                marginLeft: -6,
                textTransform: "uppercase",
                width: 1000,
              }}
            >
              global developer conferences
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 40,
                letterSpacing: "0.05rem",
                gap: 8,
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
              width: 800,
              height: 400,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              borderRadius: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                top: 0,
                left: 0,
                position: "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "16px",
              }}
            >
              <img
                src={eventCover}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 1,
                  borderRadius: "16px",
                }}
              />
              <div
                style={{
                  background:
                    "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 100%)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  zIndex: 2,
                  opacity: 1,
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 10,
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "flex-start", // Use "flex-start" because Satori doesn't support "start"
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: 25,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    opacity: 0.9,
                    display: "flex",
                  }}
                >
                  Next {getEventDisplayType(event.data.type)}
                </div>
                <div
                  style={{
                    fontSize: 60,
                    fontWeight: 500,
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  {getEventDisplayDate(event)}
                </div>
                <div
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: 40,
                    fontWeight: 300,
                    marginTop: 8,
                    display: "flex",
                  }}
                >
                  {event.data._computed.city?.data.name},{" "}
                  {event.data._computed.country?.data.name}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "black",
                  fontSize: 25,
                  padding: "8px 16px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  marginRight: "auto",
                  marginTop: "auto",
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

export default youtubeBanner(config);
