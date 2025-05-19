import Globe from "react-globe.gl";

function GlobeComponent() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        pointsData={[
          { lat: 48.8566, lng: 2.3522, size: 0.1, color: "red" }, // Paris
          { lat: 40.7128, lng: -74.006, size: 0.1, color: "blue" }, // New York
        ]}
      />
    </div>
  );
}

export default GlobeComponent;
