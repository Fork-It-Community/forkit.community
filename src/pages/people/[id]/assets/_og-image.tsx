import { Frame } from "@/generated-assets/components/Frame";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@bearstudio/astro-assets-generation";
import { BgImage } from "@/generated-assets/components/BgImage";
import { COLORS } from "@/generated-assets/theme";
import peoplePlaceholder from "@/assets/images/people-placeholder.jpeg";
import { getPersonData } from "@/pages/people/[id]/assets/_utils";
import { Logo } from "@/components/Logo";
import { OG_IMAGE } from "@/assets/consts";

export const config: AssetImageConfig = OG_IMAGE;

export default async function ({
  params,
}: {
  params: { id: string; talkId: string };
}) {
  const person = await getPersonData(params.id);

  const avatar = await getAstroImageBase64(
    person.data.avatar ?? peoplePlaceholder,
  );

  return (
    <Frame {...config} style={{ padding: 96 }}>
      <BgImage src={avatar} width={config.width} height={config.height} />

      <div tw="z-[100] flex flex-1 flex-col w-full justify-between">
        <Logo
          style={{
            width: 169 * 3,
            height: 18 * 3,
            color: "white",
          }}
        />
        <div tw="flex items-center pb-6" style={{ gap: 80 }}>
          <div tw="flex flex-1 flex-col" style={{ gap: 56 }}>
            <div
              tw="flex font-medium leading-none -mt-2"
              style={{
                fontSize: 80,
                color: COLORS.primary,
                textWrap: "balance",
              }}
            >
              {person.data.name}
            </div>

            <div
              tw="flex flex-wrap flex-col items-start"
              style={{
                columnGap: 48,
                rowGap: 24,
              }}
            >
              <div
                tw="flex items-center gap-3 font-medium leading-none"
                style={{ fontSize: 48 }}
              >
                {person.data.job}
              </div>
              <div
                tw="flex items-center gap-3 font-medium leading-none opacity-70"
                style={{ fontSize: 40 }}
              >
                {person.data.company?.title}
              </div>
            </div>
          </div>
          <div tw="relative flex flex-none gap-5 justify-end flex-wrap max-w-[50%]">
            <img
              src={avatar}
              tw="rounded-lg"
              style={{
                width: 768,
                height: 768,
                boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
              }}
            />
          </div>
        </div>

        <div tw="flex justify-between items-end">
          <div
            tw="flex font-medium uppercase opacity-60"
            style={{
              fontSize: 32,
              lineHeight: 1.2,
            }}
          >
            www.forkit.community
          </div>
        </div>
      </div>
    </Frame>
  );
}
