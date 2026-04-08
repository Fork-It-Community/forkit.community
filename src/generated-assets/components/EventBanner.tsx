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

  const barH = 16;
  const notchH = 64;
  const fontSize = 42;
  const letterSpacing = 2;
  const radius = 20; // bottom corners radius
  const invertedRadius = 16; // inverted (concave) top corners radius
  const notchMarginRight = 96;
  const notchPadding = 35;
  const totalH = barH + notchH;

  // Estimate notch width from text
  const text = `${cityName.toUpperCase()}'${year}`;
  const avgCharWidth = 0.57 * fontSize;
  const textWidth = text.length * (avgCharWidth + letterSpacing);
  const notchW = textWidth + 2 * notchPadding;

  // Notch position in pixels
  const notchRight = notchMarginRight;
  const notchLeft = Math.max(0, width - notchRight - notchW);

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        top: 0,
        left: 0,
        width: width,
        height: totalH,
        zIndex: 200,
      }}
    >
      {/* Shape: bar + notch with inverted top corners and rounded bottom corners */}
      <svg
        viewBox={`0 0 ${width} ${totalH}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: width,
          height: totalH,
        }}
      >
        <path
          d={`
            M0 0
            H${width}
            V${barH}
            H${notchLeft + notchW + invertedRadius}
            Q${notchLeft + notchW} ${barH} ${notchLeft + notchW} ${barH + invertedRadius}
            V${totalH - radius}
            Q${notchLeft + notchW} ${totalH} ${notchLeft + notchW - radius} ${totalH}
            H${notchLeft + radius}
            Q${notchLeft} ${totalH} ${notchLeft} ${totalH - radius}
            V${barH + invertedRadius}
            Q${notchLeft} ${barH} ${notchLeft - invertedRadius} ${barH}
            H0
            Z
          `}
          fill={backgroundColor}
        />
      </svg>

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: barH,
          left: notchLeft,
          width: notchW,
          height: notchH,
          paddingBottom: 16,
          color: color,
          fontFamily: "Tomorrow",
          fontSize,
          fontWeight: 500,
          textTransform: "uppercase",
          lineHeight: 1,
          letterSpacing,
          whiteSpace: "nowrap",
        }}
      >
        {cityName.toUpperCase()}'{year}
      </div>
    </div>
  );
};
