export const addressToCoordinates = async (
  address,
  key,
  locationDescription,
  photo,
  id
) => {
  const apiKey = "AIzaSyDGTAFKoRVbBsH6XN_FEXAoLcIksZd9jCU"; // Remplacez par votre clé API Google Maps
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return {
        key: key,
        location: {
          lat: location.lat,
          lng: location.lng,
        },
        title: key,
        description: locationDescription,
        image: photo,
        id: id,
      };
    } else {
      throw new Error(`Erreur lors de la géolocalisation : ${data.status}`);
    }
  } catch (error) {
    console.error("Erreur :", error.message);
    return null;
  }
};

// Exemple d'utilisation :
// addressToCoordinates("Eiffel Tower, Paris", "eiffelTower").then(console.log);
