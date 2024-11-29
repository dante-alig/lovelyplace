import React from "react";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import PoiMarkers from "./PoiMarkers";
import { useContext, useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchLocations = async () => {
      // Création d'une liste de Promises
      const promises = items.map(async (item) => {
        const key = item.locationName;
        const locationAdress = `${item.locationAddress} ${item.postalCode}`; // Ajout d'un espace
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

      // Résolution des Promises et suppression des valeurs nulles
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
          defaultCenter={{ lat: 48.8566, lng: 2.3522 }}
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
          <PoiMarkers pois={locations} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapLocation;
