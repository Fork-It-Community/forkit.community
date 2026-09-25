import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@/generated-assets/image";
import { COLORS } from "@/generated-assets/theme";
import { getEventData } from "../_utils";
import { Logo } from "@/components/Logo";
import { getEventDisplayDate, getEventDisplayType } from "@/lib/events";
import { BgImage } from "@/generated-assets/components/BgImage";
import youtubeBannerCover from "@/assets/images/youtube.jpg";
export const config: AssetImageConfig = {
  width: 2560,
  height: 1440,
};

export function youtubeBanner(options: { width: number; height: number }) {
  return async ({ params }: { params: { id: string } }) => {
    const event = await getEventData(params.id);
    const eventCover = await getAstroImageBase64(event.data.image.media);

    const postCover = await getAstroImageBase64(youtubeBannerCover);

    return (
      <Frame {...options}>
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
                fontSize: 86,
                fontWeight: 500,
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
              borderRadius: 16,
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
                borderRadius: 16,
                border: "1px solid rgba(255, 255, 255, 1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                background:
                  "linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%)",
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
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "flex-start", //  "flex-start" because Satori doesn't support "start"
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
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
                }}
              >
                {getEventDisplayDate(event)}
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 300,
                  marginTop: 8,
                  display: "flex",
                }}
              >
                {event.data._computed.city?.data.name},{" "}
                {event.data._computed.country?.data.name}
              </div>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 1)",
                  fontSize: 25,
                  padding: "8px 16px",
                  border: "1px solid rgba(0, 0, 0, 1)",
                  marginRight: "auto",
                  marginTop: 120,
                  borderRadius: 16,
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
