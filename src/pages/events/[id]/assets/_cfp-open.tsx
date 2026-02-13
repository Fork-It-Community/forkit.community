import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@bearstudio/astro-assets-generation";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";
import { getEventDisplayDate } from "@/lib/events";
import { getEventData } from "./_utils";
import { LogoWithFriends } from "@/generated-assets/components/LogoWithFriends";
import { SponsorLogos } from "@/generated-assets/components/SponsorLogos";

export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

export function cfpOpen(options: {
  width: number;
  height: number;
  fontScaling: number;
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

        <div tw="z-[100] flex flex-1 flex-col w-full justify-between">
          <LogoWithFriends logos={coOrganizersLogos} />

          <div tw="flex flex-col gap-8 justify-center">
            <div tw="flex flex-col gap-6">
              <div
                tw="font-medium uppercase tracking-[6px] opacity-90"
                style={{ fontSize: 72 * options.fontScaling }}
              >
                Call for Papers
              </div>

              <div
                tw="font-medium leading-[0.95] uppercase -ml-1.5"
                style={{
                  fontSize: 180 * options.fontScaling,
                  color: COLORS.primary,
                }}
              >
                Now Open
              </div>
            </div>

            <div
              tw="font-normal opacity-95"
              style={{ fontSize: 56 * options.fontScaling }}
            >
              Submit your talk proposals
            </div>
          </div>

          <div tw="flex justify-between items-center w-full">
            <div tw="flex flex-col gap-4">
              <div
                tw="flex items-center gap-3 font-medium opacity-60"
                style={{ fontSize: 48 * options.fontScaling }}
              >
                <svg viewBox="0 0 24 24" tw="h-[1em] w-[1em] opacity-60">
                  <path
                    fill="white"
                    d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z"
                  />
                </svg>
                {getEventDisplayDate(event)}
              </div>

              <div
                tw="flex gap-3 items-center font-medium opacity-60"
                style={{ fontSize: 48 * options.fontScaling }}
              >
                <svg
                  viewBox="0 0 24 24"
                  tw="h-[1em] w-[1em] flex-none opacity-60"
                >
                  <path
                    fill="white"
                    d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                  />
                </svg>
                <span>
                  {event.data._computed.city?.data.name},{" "}
                  {event.data._computed.country?.data.name}
                </span>
              </div>
            </div>

            <div
              tw="font-medium uppercase opacity-50"
              style={{ fontSize: 38 * options.fontScaling }}
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

export default cfpOpen({ ...config, fontScaling: 1 });
