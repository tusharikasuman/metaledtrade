import React from "react";

export const WorldMap = () => {
  // The Wikimedia "World_map_blank_without_borders.svg" uses an
  // equirectangular projection with viewBox="0 0 2058 1050" 
  // and covers exactly -180 to 180 lng / 90 to -90 lat.
  // We convert lat/lng → percentage of the SVG canvas.
  const getCoordinates = (lat, lng) => {
    // X: lng -180..180 maps to 0..100%
    const x = ((lng + 180) / 360) * 100;
    // Y: lat 90..-90 maps to 0..100% (north at top)
    const y = ((90 - lat) / 180) * 100;
    return { left: `${x.toFixed(3)}%`, top: `${y.toFixed(3)}%` };
  };

  const markers = [
    { name: "Dubai", lat: 25.2048, lng: 55.2708, isHQ: true },
    { name: "London", lat: 51.5074, lng: -0.1278, isHQ: false },
    { name: "New York", lat: 40.7128, lng: -74.006, isHQ: false },
    { name: "Singapore", lat: 1.3521, lng: 103.8198, isHQ: false },
    { name: "Shanghai", lat: 31.2304, lng: 121.4737, isHQ: false },
    { name: "Johannesburg", lat: -26.2041, lng: 28.0473, isHQ: false },
  ];

  return (
    <div className="w-full relative select-none pointer-events-none mt-8" style={{ aspectRatio: "2 / 1" }}>
      {/* Map — using object-fill so markers align with the actual SVG coordinates */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
        alt="World Map"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",   // IMPORTANT: fill, not contain, so the image matches the coordinate system
          opacity: 0.18,
          filter: "invert(1)",
        }}
      />

      {/* Marker Overlay — positioned relative to the same box */}
      <div style={{ position: "absolute", inset: 0 }}>
        {markers.map((marker) => {
          const { left, top } = getCoordinates(marker.lat, marker.lng);
          return (
            <div
              key={marker.name}
              style={{
                position: "absolute",
                left,
                top,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: marker.isHQ ? "10px" : "6px",
                  height: marker.isHQ ? "10px" : "6px",
                  borderRadius: "50%",
                  backgroundColor: marker.isHQ ? "#ffe088" : "#8e9192",
                  opacity: marker.isHQ ? 1 : 0.45,
                  boxShadow: marker.isHQ ? "0 0 18px 4px rgba(255,224,136,0.9)" : "none",
                  animation: marker.isHQ ? "pulse 2s infinite" : "none",
                }}
              />

              {/* "WE ARE HERE" tooltip above the pin */}
              {marker.isHQ && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgba(42,42,42,0.95)",
                      border: "1px solid #444748",
                      color: "#fff",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      marginBottom: "4px",
                    }}
                  >
                    WE ARE HERE
                  </div>
                  {/* Connector line */}
                  <div
                    style={{
                      width: "1px",
                      height: "32px",
                      background: "linear-gradient(to bottom, #ffe088, transparent)",
                      opacity: 0.7,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
