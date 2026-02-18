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
import { SponsorLogosInsta } from "@/generated-assets/components/SponsorLogos";
import { saveTheDate } from "@/pages/events/[id]/attendee/[name]/_ticket";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1350,
};

async function earlyBirdTicketsInsta({ params }: { params: { id: string } }) {
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

  const ticketFullDayEvent = saveTheDate({ width: 1920, height: 1080 });
  const ticketJSX = await ticketFullDayEvent({
    params: { id: event.id, name: "Full Day Event" },
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
        paddingRight: 96,
        paddingBottom: 0,
      }}
    >
      <BgImage src={postCover} width={config.width} height={config.height} />

      <div
        style={{
          zIndex: 100,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 48,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <LogoWithFriends logos={coOrganizersLogos} />

          <div
            style={{
              fontSize: 50,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: 4,
              paddingTop: coOrganizersLogos.length ? 0 : 96,
            }}
          >
            Tickets Are Available
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 98,
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
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flex: 1,
          }}
        >
          <img
            src={ticketImageBase64}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 34,
            fontWeight: 500,
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>
            {event.data._computed.city?.data.name},{" "}
            {event.data._computed.country?.data.name}
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            www.forkit.community
          </div>
        </div>
      </div>

      {displaySponsors && <SponsorLogosInsta logos={sponsorLogos} />}
    </Frame>
  );
}

export default earlyBirdTicketsInsta;
