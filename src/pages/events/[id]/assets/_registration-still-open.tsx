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
import { SponsorLogos } from "@/generated-assets/components/SponsorLogos";

export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

export function registrationStillOpen(options: {
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

    const coOrganizersIds = event.__coOrganizers.map(
      (coOrganiser) => coOrganiser.id,
    );
    const sponsorLogos = await Promise.all(
      event.__sponsors
        .filter((sponsor) => !coOrganizersIds.includes(sponsor.id))
        .map(
          async (sponsor) => await getAstroImageBase64(sponsor.data.logos.noBg),
        ),
    );
    const displaySponsors =
      event.data.type === "event" && !!sponsorLogos.length;

    return (
      <Frame
        {...options}
        style={{
          paddingTop: 96,
          paddingLeft: 96,
          paddingRight: 96,
          paddingBottom: displaySponsors ? 0 : 96,
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 80,
            }}
          >
            <LogoWithFriends logos={coOrganizersLogos} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  fontSize: 50,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: 4,
                  paddingTop: coOrganizersLogos.length ? 0 : 60,
                }}
              >
                Registrations are still open
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: 172,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: COLORS.primary,
                  marginLeft: -6, // Visual alignment
                  textTransform: "uppercase",
                }}
              >
                Join Us Now
              </div>
              <div
                style={{
                  fontSize: 46,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: 4,
                  opacity: 0.82,
                }}
              >
                {getEventDisplayType(event.data.type)}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  fontSize: 42,
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                <svg
                  style={{
                    flex: "none",
                    opacity: 0.6,
                    width: "1em",
                    height: "1em",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                </svg>

                {getEventDisplayDate(event)}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 48,
                fontWeight: 500,
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
                fontSize: 48,
                fontWeight: 500,
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              www.forkit.community
            </div>
          </div>
        </div>
        {displaySponsors && <SponsorLogos logos={sponsorLogos} />}
      </Frame>
    );
  };
}

export default registrationStillOpen(config);
