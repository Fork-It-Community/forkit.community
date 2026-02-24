import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
  SVG,
  imageBufferToBase64,
} from "@/generated-assets/image";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";
import { getEventData } from "./_utils";
import { LogoWithFriends } from "@/generated-assets/components/LogoWithFriends";
import { SponsorLogos } from "@/generated-assets/components/SponsorLogos";
import { saveTheDate } from "@/pages/events/[id]/attendee/[name]/_ticket";

export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

async function earlyBirdTickets({ params }: { params: { id: string } }) {
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
  const displaySponsors = event.data.type === "event" && !!sponsorLogos.length;

  const ticketFullDayEvent = saveTheDate({
    width: 1920,
    height: 1080,
    dateFontSize: 64,
    locationFontSize: 44,
  });
  const ticketJSX = await ticketFullDayEvent({
    params: { id: event.id, name: "FULL DAY EVENT" },
  });

  const ticketSVG = await SVG(ticketJSX, { width: 1920, height: 1080 });
  const ticketImageBase64 = imageBufferToBase64(
    Buffer.from(ticketSVG),
    "svg+xml",
  );

  return (
    <Frame
      width={config.width}
      height={config.height}
      style={{
        paddingTop: 96,
        paddingLeft: 96,
        paddingRight: 0,
        paddingBottom: displaySponsors ? 0 : 96,
      }}
    >
      <BgImage src={postCover} width={config.width} height={config.height} />

      <div
        style={{
          zIndex: 100,
          flex: 1,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <LogoWithFriends logos={coOrganizersLogos} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: 4,
                paddingTop: coOrganizersLogos.length ? 0 : 60,
              }}
            >
              Tickets Are Available
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 96,
                fontWeight: 500,
                lineHeight: 1,
                color: COLORS.primary,
                marginLeft: -6,
                textTransform: "uppercase",
              }}
            >
              <div>EARLY BIRD</div>
              <div>TICKETS ONLY</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 500,
              lineHeight: 1,
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            www.forkit.community
          </div>
        </div>

        <div
          style={{
            display: "flex",
            position: "relative",
            width: 740,
            flexShrink: 0,
            alignSelf: "stretch",
          }}
        >
          <img
            src={ticketImageBase64}
            width={900}
            height={560}
            style={{
              position: "absolute",
              left: -100,
              top: 320,
              transform: "rotate(45deg)",
              zIndex: 1,
            }}
          />
          <img
            src={ticketImageBase64}
            width={900}
            height={542}
            style={{
              position: "absolute",
              left: 50,
              top: 318,
              transform: "rotate(70deg)",
              zIndex: 2,
            }}
          />
        </div>
      </div>

      {displaySponsors && (
        <div style={{ display: "flex", width: "80%", alignSelf: "flex-start" }}>
          <SponsorLogos logos={sponsorLogos} scale={0.5} />
        </div>
      )}
    </Frame>
  );
}

export default earlyBirdTickets;
