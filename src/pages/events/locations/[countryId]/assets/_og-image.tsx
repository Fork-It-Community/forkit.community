import { Frame } from "@/generated-assets/components/Frame";
import { BgImage } from "@/generated-assets/components/BgImage";
import { Logo } from "@/components/Logo";
import { getCountryData } from "@/pages/events/locations/[countryId]/[cityId]/assets/_utils";
import type { ExtractParams } from "@bearstudio/lunalink";
import type { ROUTES } from "@/routes.gen";
import type { AssetImageConfig } from "@bearstudio/astro-dynamic-assets";
import DynamicAssets from "@/lib/astro-dynamic-assets";
export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

export default async function ({
  params,
}: {
  params: ExtractParams<
    (typeof ROUTES.events.locations)[":countryId"][":cityId"]["__path"]
  >;
}) {
  const country = await getCountryData(params.countryId);
  const postCover = await DynamicAssets.getAstroImageBase64(
    country.data.cover.media,
  );

  return (
    <Frame {...config} style={{ padding: 128 }}>
      <BgImage src={postCover} width={config.width} height={config.height} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 128,
          width: "100%",
          justifyContent: "center",
          zIndex: 100,
        }}
      >
        <Logo style={{ width: 169 * 3, height: 18 * 3 }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 148,
              fontWeight: 500,
              marginLeft: -6, // Visual alignment
            }}
          >
            {country.data.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 500,
              opacity: 0.6,
              marginTop: -16,
              marginLeft: -2, // Visual alignment
            }}
          >
            All the events
          </div>
        </div>
      </div>
    </Frame>
  );
}
