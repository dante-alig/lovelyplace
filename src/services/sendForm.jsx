import axios from "axios";

export const sendForm = async (
  locationName,
  locationAddress,
  locationDescription,
  tips,
  socialmedia,
  mediaLink,
  photos,
  hours,
  priceRange,
  keywords,
  filters,
  postalCode,
  placeCategory
) => {
  // Vérification des champs obligatoires
  if (
    !locationName ||
    !locationAddress ||
    !locationDescription ||
    !priceRange
  ) {
    alert("Vous devez remplir tous les champs obligatoires.");
    return;
  }

  // Validation des types pour certains champs
  if (
    typeof mediaLink !== "object" ||
    typeof hours !== "object" ||
    typeof filters !== "object" ||
    typeof keywords !== "object"
  ) {
    alert(
      "Les champs mediaLink, hours, filters, et keywords doivent être des objets ou des tableaux."
    );
    return;
  }

  try {
    const formData = new FormData();

    // Ajout des champs au formData
    formData.append("locationName", locationName);
    formData.append("locationAddress", locationAddress);
    formData.append("locationDescription", locationDescription);
    formData.append("tips", JSON.stringify(tips));
    formData.append("socialmedia", socialmedia || "");
    formData.append("mediaLink", JSON.stringify(mediaLink));
    formData.append("hours", JSON.stringify(hours));
    formData.append("priceRange", priceRange);
    formData.append("keywords", JSON.stringify(keywords));
    formData.append("filters", JSON.stringify(filters));
    formData.append("postalCode", postalCode || "");
    formData.append("placeCategory", placeCategory || "");

    // Ajout des fichiers photo au FormData individuellement
    if (photos && photos.length) {
      photos.forEach((photo) => {
        formData.append("photos", photo);
        console.log("la photo existe>>>", photo);
      });
    }

    // Envoi de la requête
    const response = await axios.post(
      "http://localhost:3000/location",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Données enregistrées avec succès !");
    console.log("Réponse du serveur:", response.data);
    console.log("Données envoyées:", {
      locationName,
      locationAddress,
      locationDescription,
      tips,
      socialmedia,
      mediaLink,
      hours,
      priceRange,
      keywords,
      filters,
      postalCode,
      placeCategory,
      photos,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire:", error);

    if (error.response) {
      console.error("Détails de l'erreur:", error.response.data);
      alert(
        `Une erreur est survenue: ${
          error.response.data.message || "Erreur inconnue"
        }`
      );
    } else {
      alert("Une erreur est survenue lors de l'enregistrement des données.");
    }
  }
};

export const editPhotosForm = async (idLocation, selectedFile) => {
  try {
    // Créer un objet FormData
    const formData = new FormData();

    // Ajouter les fichiers photo
    if (selectedFile) {
      console.log("selectedFile>>>", selectedFile);
      formData.append("photos", selectedFile);
    }

    // Configurer les en-têtes pour l'upload de fichiers
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // Envoyer la requête PUT
    const response = await axios.put(
      `http://localhost:3000/items/${idLocation}`,
      formData,
      config
    );

    console.log("Réponse du serveur:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la location:", error);
    throw error;
  }
};

export const deletePhoto = async (idLocation, photoUrl) => {
  try {
    // Effectuer la requête DELETE
    const response = await axios.delete(
      `http://localhost:3000/items/${idLocation}/photo`,
      {
        data: { photoUrl }, // Le corps de la requête pour envoyer l'URL de la photo
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Photo supprimée avec succès :", response.data);
      return response.data.photos; // Retourne la liste des photos mise à jour
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la photo :", error);
    alert("Une erreur est survenue lors de la suppression de la photo.");
  }
};
