import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@/generated-assets/image";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";
import { getEventDisplayDate } from "@/lib/events";
import { getEventData } from "./_utils";
import { LogoWithFriends } from "@/generated-assets/components/LogoWithFriends";
import { SponsorLogos } from "@/generated-assets/components/SponsorLogos";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1350,
};

export function d7announcementInsta(options: {
  width: number;
  height: number;
}) {
  return async ({ params }: { params: { id: string } }) => {
    const event = await getEventData(params.id);
    const postCover = await getAstroImageBase64(event.data.image.media);
    const coOrganizersLogos = await Promise.all(
      event.__coOrganizers.map(
        async (coOrganiser) =>
          await getAstroImageBase64(coOrganiser.data.logos.noBgSquare),
      ),
    );

    const sponsorLogos = await Promise.all(
      event.__sponsors.map(
        async (sponsor) => await getAstroImageBase64(sponsor.data.logos.noBg),
      ),
    );

    return (
      <Frame
        {...options}
        style={{
          paddingTop: 96,
          paddingLeft: 96,
          paddingRight: 96,
          paddingBottom: 0,
        }}
      >
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
            flexDirection: "column",
            gap: 40,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <LogoWithFriends logos={coOrganizersLogos} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 180,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: COLORS.primary,
                }}
              >
                07
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 72,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: COLORS.primary,
                    textTransform: "uppercase",
                  }}
                >
                  Days left
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 72,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: COLORS.white,
                    textTransform: "uppercase",
                  }}
                >
                  Until the event
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 44,
                fontWeight: 500,
                lineHeight: 1,
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              Secure your spot now!
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 40,
                fontWeight: 500,
                lineHeight: 1,
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
                  fontSize: 40,
                  fontWeight: 500,
                  lineHeight: 1.2,
                  textWrap: "balance",
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
                fontSize: 26,
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
                fontSize: 26,
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
        <SponsorLogos logos={sponsorLogos} height={100} />
      </Frame>
    );
  };
}

export default d7announcementInsta(config);
