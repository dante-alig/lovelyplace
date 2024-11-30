import React, { useContext, useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import PoiMarkers from "./PoiMarkers";
import { MyContext } from "../context/myContext";
import { addressToCoordinates } from "../utils/addressToCoordinates";

const MapLocation = () => {
  type Poi = {
    key: string;
    location: google.maps.LatLngLiteral;
    title: string;
    description: string;
    image: string;
    id: string;
  };

  const { items } = useContext(MyContext);

  const [locations, setLocations] = useState<Poi[]>([]);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral>({
    lat: 48.8566, // Coordonnées par défaut (Paris)
    lng: 2.3522,
  });

  useEffect(() => {
    // Géolocalisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas supportée par ce navigateur."
      );
    }
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      const promises = items.map(async (item) => {
        const key = item.locationName;
        const locationAdress = `${item.locationAddress} ${item.postalCode}`;
        const locationDescription = item.locationDescription;
        const photo = item.photos[0];
        const id = item._id;
        return await addressToCoordinates(
          locationAdress,
          key,
          locationDescription,
          photo,
          id
        );
      });

      const results = (await Promise.all(promises)).filter(
        (loc) => loc !== null
      );
      setLocations(results);
    };

    fetchLocations();
    console.log(locations);
  }, [items]);

  return (
    <div className="items-container-map">
      <APIProvider
        apiKey={"AIzaSyDGTAFKoRVbBsH6XN_FEXAoLcIksZd9jCU"}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          defaultZoom={13}
          defaultCenter={userLocation} // Centré sur la position utilisateur
          mapId="55c6528e13212143"
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
        >
          {/* Affichage des POIs */}
          <PoiMarkers pois={locations} color="#FBBC04" />

          {/* Ajout d'un marqueur pour la position utilisateur */}
          <PoiMarkers
            pois={[
              {
                key: "user-location",
                location: userLocation,
                title: "Votre position",
                description: "Vous êtes ici",
                image: "",
                id: "user",
              },
            ]}
            color="#DA443B"
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapLocation;
