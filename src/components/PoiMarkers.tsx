import React, { useState, useCallback } from "react";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { getFirstSentence } from "../utils/getFirstSentence";

type Poi = {
  key: string;
  location: google.maps.LatLngLiteral;
  title: string;
  description: string;
  image: string;
  id: string;
};

const PoiMarkers: React.FC<{ pois: Poi[]; color: string }> = ({
  pois = [],
  color = "",
}) => {
  const map = useMap();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

  const handleClick = useCallback(
    (poi: Poi) => {
      if (!map) return;

      // Close previous InfoWindow
      infoWindow?.close();

      // Validate POI data
      const sanitizedTitle = poi.title
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      const sanitizedDescription = getFirstSentence(poi.description)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      const newInfoWindow = new google.maps.InfoWindow({
        content: `
        <div style="max-width: 200px; font-family: Arial; line-height: 20px;">
          <h4 style="font-size: 19px; font-weight: 600;">${sanitizedTitle}</h4>
          <img src="${poi.image}" alt="${sanitizedTitle}" 
               style="width: 100%; height: 150px; object-fit: cover; border-radius: 5px; margin-top: 5px; margin-bottom: 5px;" 
               onError="this.src='/default-image.jpg'"/>
          <p>${sanitizedDescription}</p>
          <a href="/selectedLocation/${poi.id}" target="_blank" 
             style="display: inline-block; text-align: center; text-decoration: none; padding: 10px 15px; background-color: #007BFF; color: #fff; border-radius: 5px; font-size: 14px; margin-top: 10px;">
             En savoir plus
          </a>
        </div>
      `,
      });

      newInfoWindow.setPosition(poi.location);
      newInfoWindow.open(map);
      setInfoWindow(newInfoWindow);
    },
    [map, infoWindow]
  );

  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={() => handleClick(poi)}
        >
          <Pin background={color} glyphColor={"#000"} borderColor={"#000"} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PoiMarkers;
