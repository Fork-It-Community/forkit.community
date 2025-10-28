import { Frame } from "@/generated-assets/components/Frame";

import ticketBg from "./_ticket.png";
import { getEventData } from "./_utils";
import { COLORS } from "@/generated-assets/theme";
import { getEventDisplayDate } from "@/lib/events";
import type { AssetImageConfig } from "@bearstudio/astro-dynamic-assets";
import { getAstroImageBase64 } from "@/lib/astro-dynamic-assets";

export const config: AssetImageConfig = {
  width: 1920,
  height: 1080,
};

export function saveTheDate(options: { width: number; height: number }) {
  return async ({ params }: { params: { id: string; name: string } }) => {
    const event = await getEventData(params.id);
    const ticketImage = await getAstroImageBase64(ticketBg);

    return (
      <Frame {...options} style={{ padding: 0, background: "transparent" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            transform: "translate(0,-30px) scale(1.18)",
          }}
        >
          <img
            style={{ zIndex: 10, position: "relative" }}
            src={ticketImage}
            width={1600}
          />
          <div
            style={{
              zIndex: 20,
              position: "absolute",
              top: 220,
              left: 112,
              width: 820,
              height: 420,
              display: "flex",
              flexDirection: "column",
              transform: "rotate(2.7deg)",
              color: COLORS.white,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                fontSize: 68,
                fontWeight: 500,
                color: COLORS.primary,
                wordBreak: "break-word",
              }}
            >
              {params.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "auto",
                flexDirection: "column",
                rowGap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 52,
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {getEventDisplayDate(event)}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  fontSize: 48,
                  fontWeight: 400,
                  lineHeight: 1.2,
                  textWrap: "balance",
                }}
              >
                {event.data.location?.name
                  ? `${event.data.location.name}, `
                  : ""}
                {event.data._computed.city?.data.name},{" "}
                {event.data._computed.country?.data.name}
              </div>
            </div>
          </div>
        </div>
      </Frame>
    );
  };
}

export default saveTheDate(config);
