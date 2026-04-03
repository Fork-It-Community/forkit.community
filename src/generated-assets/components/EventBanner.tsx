import type { EventComputed } from "@/lib/events";
import dayjs from "dayjs";

export const EventBanner = ({
  event,
  width,
}: {
  event: EventComputed;
  width: number;
}) => {
  if (event.data.type !== "event" || !event.data.assets) return null;

  const { backgroundColor, color } = event.data.assets;
  const cityName = event.data._computed.city?.data.name;
  const year = dayjs(event.data.date).format("YY");

  if (!cityName) return null;

  const isNarrow = width < 1200;

  const bannerHeight = isNarrow ? 85 : 80;
  const fontSize = isNarrow ? 40 : 42;
  const textTop = isNarrow ? 30 : 32;
  const letterSpacing = 2;

  const text = `${cityName.toUpperCase()}'${year}`;
  const avgCharWidth = 0.57 * fontSize;
  const textContentWidth = text.length * (avgCharWidth + letterSpacing);
  const notchWidthPx = textContentWidth + 2 * 35; // 15 CSS padding + 20 extra each side
  const notchWidthSvg = (notchWidthPx / width) * 1000;

  const tabRightEdge = isNarrow ? 910 : 950; // fixed right anchor (SVG units, = notch right edge)
  const tabLeft = Math.round(tabRightEdge - notchWidthSvg);
  const r = 20; // top corner radius where notch meets the line
  const bottomCornerR = isNarrow ? 30 : 21; // smaller on large to compensate for wider aspect ratio
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
            H${tabRightEdge + 26}
            Q${tabRightEdge - 2} 15 ${tabRightEdge} ${20 + r}
            V${85 - bottomCornerR}
            Q${tabRightEdge - 1} 82 ${tabRightEdge - bottomCornerR} 85
            H${tabLeft + bottomCornerR}
            Q${tabLeft - 4} 87 ${tabLeft} ${85 - bottomCornerR}
            V${20 + r}
            Q${tabLeft - 2} 15 ${tabLeft - 26} 20
            H0
            Z
          `}
          fill={backgroundColor}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          display: "flex",
          top: textTop,
          left: `${((tabLeft + tabRightEdge) / 2 / 1000) * 100}%`,
          transform: "translateX(-50%)",
          color: color,
          fontSize,
          fontWeight: 500,
          textTransform: "uppercase",
          lineHeight: 0,
          letterSpacing,
          whiteSpace: "nowrap",
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        {cityName.toUpperCase()}'{year}
      </div>
    </div>
  );
};
