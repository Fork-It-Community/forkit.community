import type { zLocation } from "@/schemas/locations";
import Globe from "react-globe.gl";

/**
 * @param {{ points: { lat: number; lng: number; size: number; color: string }[] }} props
 */
export default function GlobeComponent({ points }: { points: zLocation[] }) {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="#000"
        labelText={String(points.length)}
        pointsData={points}
        pointAltitude="size"
        pointColor="color"
      />
    </div>
  );
}
