import type { EventComputed } from "@/lib/events";
import dayjs from "dayjs";

const BAR_HEIGHT = 16;
const NOTCH_HEIGHT = 64;
const FONT_SIZE = 42;
const LETTER_SPACING = 2;
const BORDER_RADIUS = 20;
const INVERTED_BORDER_RADIUS = 16;
const NOTCH_MARGIN_RIGHT = 96;
const NOTCH_PADDING = 35;
const TOTAL_HEIGHT = BAR_HEIGHT + NOTCH_HEIGHT;

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

  // Estimate notch width from text
  const text = `${cityName.toUpperCase()}'${year}`;
  const avgCharWidth = 0.57 * FONT_SIZE;
  const textWidth = text.length * (avgCharWidth + LETTER_SPACING);
  const notchW = textWidth + 2 * NOTCH_PADDING;

  // Notch position in pixels
  const notchLeft = Math.max(0, width - NOTCH_MARGIN_RIGHT - notchW);

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        top: 0,
        left: 0,
        width: width,
        height: TOTAL_HEIGHT,
        zIndex: 200,
      }}
    >
      {/* Shape: bar + notch with inverted top corners and rounded bottom corners */}
      <svg
        viewBox={`0 0 ${width} ${TOTAL_HEIGHT}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: width,
          height: TOTAL_HEIGHT,
        }}
      >
        <path
          d={`
            M0 0
            H${width}
            V${BAR_HEIGHT}
            H${notchLeft + notchW + INVERTED_BORDER_RADIUS}
            Q${notchLeft + notchW} ${BAR_HEIGHT} ${notchLeft + notchW} ${BAR_HEIGHT + INVERTED_BORDER_RADIUS}
            V${TOTAL_HEIGHT - BORDER_RADIUS}
            Q${notchLeft + notchW} ${TOTAL_HEIGHT} ${notchLeft + notchW - BORDER_RADIUS} ${TOTAL_HEIGHT}
            H${notchLeft + BORDER_RADIUS}
            Q${notchLeft} ${TOTAL_HEIGHT} ${notchLeft} ${TOTAL_HEIGHT - BORDER_RADIUS}
            V${BAR_HEIGHT + INVERTED_BORDER_RADIUS}
            Q${notchLeft} ${BAR_HEIGHT} ${notchLeft - INVERTED_BORDER_RADIUS} ${BAR_HEIGHT}
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
          top: BAR_HEIGHT,
          left: notchLeft,
          width: notchW,
          height: NOTCH_HEIGHT,
          paddingBottom: 12,
        }}
      >
        <div
          style={{
            color: color,
            fontFamily: "Tomorrow",
            fontSize: FONT_SIZE,
            fontWeight: 500,
            textTransform: "uppercase",
            lineHeight: 1,
            letterSpacing: LETTER_SPACING,
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          {cityName.toUpperCase()}'{year}
        </div>
      </div>
    </div>
  );
};
