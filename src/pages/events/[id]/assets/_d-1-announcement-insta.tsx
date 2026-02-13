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
import { RoundedSpeakers } from "@/generated-assets/components/RoundedSpeakers";
import { SponsorLogosInsta } from "@/generated-assets/components/SponsorLogos";
import type { ImageMetadata } from "astro";
import { getNumberOfApprovedGuests } from "@/lib/luma/utils";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1350,
};

export function d1announcementInsta(options: {
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

    const speakerImages = await Promise.all(
      event.data._computed.speakers
        .filter(
          (s): s is typeof s & { data: { avatar: ImageMetadata } } =>
            s.data.avatar != null,
        )
        .slice(0, 3)
        .map((s) => getAstroImageBase64(s.data.avatar)),
    );

    const approvedGuestsNumber = await getNumberOfApprovedGuests(event);

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
        tw="pt-24 px-24"
        style={{ paddingBottom: displaySponsors ? 0 : 96 }}
      >
        <BgImage
          src={postCover}
          width={options.width}
          height={options.height}
        />

        <div tw="z-[100] flex flex-1 flex-col gap-10 w-full justify-between">
          <LogoWithFriends logos={coOrganizersLogos} />
          <div tw="flex flex-col gap-6">
            <div tw="flex items-center gap-6">
              <div
                tw="flex font-medium leading-none"
                style={{ fontSize: 192, color: COLORS.primary }}
              >
                01
              </div>
              <div tw="flex flex-col">
                <div
                  tw="flex font-medium leading-none uppercase"
                  style={{ fontSize: 76, color: COLORS.primary }}
                >
                  Days left
                </div>
                <div
                  tw="flex font-medium leading-none uppercase"
                  style={{ fontSize: 76, color: COLORS.white }}
                >
                  Until the event
                </div>
              </div>
            </div>
            <div
              tw="flex flex-col font-medium leading-none uppercase opacity-80"
              style={{ fontSize: 44 }}
            >
              <div tw="flex gap-3 items-center">
                <RoundedSpeakers speakerImages={speakerImages} />
                <div tw="flex h-fit">
                  Join us to meet {approvedGuestsNumber} people
                </div>
              </div>
              <div tw="flex">sharing real-life experiences</div>
            </div>
          </div>
          <div tw="flex flex-col flex-wrap gap-3">
            <div
              tw="flex items-center gap-3 font-medium leading-none"
              style={{ fontSize: 40 }}
            >
              <svg
                viewBox="0 0 24 24"
                tw="flex-none opacity-60 w-[1em] h-[1em]"
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
                tw="flex gap-3 items-center font-medium leading-tight text-balance"
                style={{ fontSize: 40 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  tw="flex-none opacity-60 w-[1em] h-[1em]"
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

          <div tw="flex justify-between items-end">
            <div
              tw="flex font-medium leading-tight uppercase opacity-60"
              style={{ fontSize: 26 }}
            >
              {event.data._computed.city?.data.name},{" "}
              {event.data._computed.country?.data.name}
            </div>
            <div
              tw="flex font-medium leading-tight uppercase opacity-60"
              style={{ fontSize: 26 }}
            >
              www.forkit.community
            </div>
          </div>
        </div>
        {displaySponsors && <SponsorLogosInsta logos={sponsorLogos} />}
      </Frame>
    );
  };
}

export default d1announcementInsta(config);
