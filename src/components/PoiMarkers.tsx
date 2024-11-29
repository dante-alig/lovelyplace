import React from "react";
import { useState, useCallback } from "react";
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

const PoiMarkers = (props: { pois: Poi[] }) => {
  const map = useMap();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

  const handleClick = useCallback(
    (poi: Poi) => {
      if (!map) return;

      // Fermez l'ancienne InfoWindow
      infoWindow?.close();

      // Créez une nouvelle InfoWindow avec du contenu personnalisé
      const newInfoWindow = new google.maps.InfoWindow({
        content: `
        <div style="max-width: 200px; font-family: Arial; line-height: 20px;">
          <h4 style="font-size: 19px; font-weight: 600;">${poi.key}</h4>
          <img src="${poi.image}" alt="${
          poi.title
        }" style="width: 100%; height: 150px; object-fit: cover; border-radius: 5px; margin-top: 5px; margin-bottom: 5px;"/>
          <p>${getFirstSentence(poi.description)}</p>
          <a href="/selectedLocation/${
            poi.id
          }" target="_blank" style="display: inline-block; text-align: center; text-decoration: none; padding: 10px 15px; background-color: #007BFF; color: #fff; border-radius: 5px; font-size: 14px; margin-top: 10px;">En savoir plus</a>
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
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={() => handleClick(poi)}
        >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PoiMarkers;
