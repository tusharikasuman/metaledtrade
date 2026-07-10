import React from "react";

export const WorldMap = () => {
  // Approximate % coordinates for a standard Equirectangular projection world map
  // Adjusting bounds slightly to match the standard Wikimedia blank map SVG
  const getCoordinates = (lat, lng) => {
    const x = ((lng + 180) / 360) * 100;
    // Map bounds are roughly 85N to -60S
    const y = ((85 - lat) / 145) * 100;
    return { left: `${x}%`, top: `${y}%` };
  };

  const markers = [
    { name: "Dubai", lat: 25.2048, lng: 55.2708, isHQ: true }, // HQ
    { name: "London", lat: 51.5074, lng: -0.1278, isHQ: false },
    { name: "New York", lat: 40.7128, lng: -74.0060, isHQ: false },
    { name: "Singapore", lat: 1.3521, lng: 103.8198, isHQ: false },
    { name: "Shanghai", lat: 31.2304, lng: 121.4737, isHQ: false },
    { name: "Johannesburg", lat: -26.2041, lng: 28.0473, isHQ: false },
  ];

  return (
    <div className="w-full relative aspect-[2/1] mt-12 mb-auto select-none pointer-events-none">
      {/* Background Map Image */}
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
        alt="World Map"
        className="w-full h-full object-contain opacity-20 filter invert"
      />
      
      {/* Overlay Markers */}
      <div className="absolute inset-0">
        {markers.map((marker) => {
          const { left, top } = getCoordinates(marker.lat, marker.lng);
          return (
            <div 
              key={marker.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left, top }}
            >
              <div 
                className={`rounded-full ${marker.isHQ ? "w-2.5 h-2.5 bg-[#ffe088] shadow-[0_0_15px_rgba(255,224,136,1)] animate-pulse" : "w-1.5 h-1.5 bg-[#8e9192] opacity-50"}`}
              />
              
              {marker.isHQ && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 flex flex-col items-center">
                  <div className="bg-[#2a2a2a]/95 border border-[#444748] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-xl mb-1 whitespace-nowrap font-display">
                    WE ARE HERE
                  </div>
                  <div className="w-px h-10 bg-gradient-to-b from-[#ffe088] to-transparent opacity-60" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
