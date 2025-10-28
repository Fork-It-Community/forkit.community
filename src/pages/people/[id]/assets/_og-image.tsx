import { Frame } from "@/generated-assets/components/Frame";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";
import peoplePlaceholder from "@/assets/images/people-placeholder.jpeg";
import { getPersonData } from "@/pages/people/[id]/assets/_utils";
import { Logo } from "@/components/Logo";
import type { AssetImageConfig } from "@bearstudio/astro-dynamic-assets";
import { dynamicAssets } from "@/lib/astro-dynamic-assets";

export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

export default async function ({
  params,
}: {
  params: { id: string; talkId: string };
}) {
  const person = await getPersonData(params.id);

  const avatar = await dynamicAssets.getAstroImageBase64(
    person.data.avatar ?? peoplePlaceholder,
  );

  return (
    <Frame {...config} style={{ padding: 96 }}>
      <BgImage src={avatar} width={config.width} height={config.height} />

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
        <Logo style={{ width: 169 * 3, height: 18 * 3 }} />
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
              gap: 56,
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
              {person.data.name}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "flex-start",
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
                {person.data.job}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 40,
                  fontWeight: 500,
                  lineHeight: 1,
                  opacity: 0.7,
                }}
              >
                {person.data.company?.title}
              </div>
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
            <img
              src={avatar}
              style={{
                width: 768,
                height: 768,
                borderRadius: 8,
                boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
              }}
            />
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
            www.forkit.community
          </div>
        </div>
      </div>
    </Frame>
  );
}
