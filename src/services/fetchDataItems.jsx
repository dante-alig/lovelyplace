import axios from "axios";

export const fetchDataItems = async (
  setItems,
  setLoadingData,
  categorieItems,
  filterParams
) => {
  try {
    setLoadingData(true); // Commence le chargement

    // Construction de l'URL avec les paramètres de requête
    const queryString = new URLSearchParams(filterParams).toString();
    const url = `http://localhost:3000/${categorieItems}${
      queryString ? `?${queryString}` : ""
    }`;
    console.log("filterParams>>>>", filterParams);
    const response = await axios.get(url);
    const data = response.data;
    console.log("Données récupérées avec succès :", data);

    setItems(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  } finally {
    setLoadingData(false); // Termine le chargement
  }
};

export const fetchDataSelectedItem = async (idLocation, setSelectedItem) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/items/${idLocation}`
    );
    const location = response.data;
    console.log("Location récupérée :", location);
    setSelectedItem(location);
    return location;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'élément :", error);
    alert("Une erreur est survenue lors de la récupération de la location.");
    return null;
  }
};
