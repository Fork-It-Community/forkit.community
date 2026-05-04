import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@bearstudio/astro-assets-generation";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";
import { getEventDisplayDate, getEventDisplayType } from "@/lib/events";
import { getEventData } from "./_utils";
import { LogoWithFriends } from "@/generated-assets/components/LogoWithFriends";
import { SponsorLogos } from "@/generated-assets/components/SponsorLogos";
import { EventBanner } from "@/generated-assets/components/EventBanner";

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
        <EventBanner event={event} width={options.width} />

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
                  display: "flex",
                  flexDirection: "column",
                  gap: 42,
                }}
              >
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
                    flexWrap: "wrap",
                    alignItems: "center",
                    rowGap: 48,
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
                        opacity: 0.8,
                        width: "1em",
                        height: "1em",
                      }}
                    >
                      <path
                        fill="white"
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
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        style={{
                          flex: "none",
                          opacity: 0.8,
                          width: "1em",
                          height: "1em",
                        }}
                      >
                        <path
                          fill="white"
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
