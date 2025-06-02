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
import { getCityData } from "@/pages/events/locations/[countryId]/[cityId]/assets/_utils";

export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

export default async function ({
  params,
}: {
  params: { id: string; talkId: string };
}) {
  const event = await getEventData(params.id);
  const talk = await getTalkData(params.talkId);
  const city = await getCityData(event.data.city.id);

  const postCover = await getAstroImageBase64(city.data.cover.media);
  const coOrganizersLogos = await Promise.all(
    event.__coOrganizers.map(
      async (coOrganiser) =>
        await getAstroImageBase64(coOrganiser.data.logos.noBgSquare),
    ),
  );
  const speakersImages = (
    await Promise.all(
      talk.__speakers.map(
        async (speaker) =>
          await getAstroImageBase64(speaker.data.avatar ?? peoplePlaceholder),
      ),
    )
  ).slice(0, 4);
  return (
    <Frame {...config} style={{ padding: 96 }}>
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
        <LogoWithFriends logos={coOrganizersLogos} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 80,
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 80,
                fontWeight: 500,
                lineHeight: 1,
                marginTop: -8,
                color: COLORS.primary,
                textWrap: "balance",
              }}
            >
              {talk.data.title}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 40,
                fontWeight: 500,
                letterSpacing: 4,
                marginBottom: 48,
              }}
            >
              By{" "}
              {talk.__speakers.map((speaker) => speaker.data.name).join(", ")}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
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
          <div
            style={{
              position: "relative",
              display: "flex",
              flex: "none",
              gap: 20,
              justifyContent: "flex-end",
              flexWrap: "wrap",
              maxWidth: "50%",
            }}
          >
            {speakersImages.map((imgSrc, index) => {
              const size = speakersImages.length > 1 ? 360 : 512;
              return (
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
            })}
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
