import type { EventComputed } from "@/lib/events";
import dayjs from "dayjs";

export const EventBanner = ({
  event,
  width,
}: {
  event: EventComputed;
  width: number;
}) => {
  if (event.data.type !== "event" || !event.data.banner) return null;

  const { color, textColor } = event.data.banner;
  const cityName = event.data._computed.city?.data.name;
  const year = dayjs(event.data.date).format("YY");

  if (!cityName) return null;

  const isNarrow = width < 1200;

  const bannerHeight = isNarrow ? 85 : 80;
  const fontSize = isNarrow ? 40 : 42;
  const textTop = isNarrow ? 30 : 32;
  const textPadding = isNarrow ? 20 : 16;

  // TODO: tabLeft should be computed dynamically from city name length so the notch
  // always fits the text with consistent padding, regardless of which city is displayed
  const tabLeft = isNarrow ? 690 : 760; // left edge of the notch (SVG units, 0–1000)
  const tabRight = isNarrow ? 920 : 900; // right edge of the notch — 80 units from right (instagram), 100 units (large)
  const r = 20; // top corner radius where notch meets the line
  const bottomCornerR = isNarrow ? 30 : 25; // bottom corner radius of the notch

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: bannerHeight,
      }}
    >
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <path
          shapeRendering="geometricPrecision"
          d={`
            M0 0
            H1000
            V20
            H${tabRight + 20}
            Q${tabRight} 20 ${tabRight} ${20 + r}
            V${85 - bottomCornerR}
            Q${tabRight - 6} 85 ${tabRight - bottomCornerR} 85
            H${tabLeft + bottomCornerR}
            Q${tabLeft + 6} 85 ${tabLeft} ${85 - bottomCornerR}
            V${20 + r}
            Q${tabLeft} 20 ${tabLeft - 20} 20
            H0
            Z
          `}
          fill={color}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          display: "flex",
          top: textTop,
          left: `${((tabLeft + tabRight) / 2 / 1000) * 100}%`,
          transform: "translateX(-50%)",
          color: textColor,
          fontSize,
          fontWeight: 500,
          textTransform: "uppercase",
          lineHeight: 0,
          letterSpacing: 2,
          whiteSpace: "nowrap",
          padding: textPadding,
        }}
      >
        {cityName.toUpperCase()}'{year}
      </div>
    </div>
  );
};
