import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { useEffect, useContext, useState } from "react";
import { fetchDataSelectedItem } from "../services/fetchDataItems";
import { editPhotosForm } from "../services/sendForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deletePhoto } from "../services/sendForm";

const SelectedLocation = () => {
  const { idLocation } = useParams();
  const {
    selectedItem = {},
    setSelectedItem,
    adminLogin,
  } = useContext(MyContext) || {};

  // État pour contrôler l'affichage de la modale
  const [showModal, setShowModal] = useState(false);

  // État pour l'image sélectionnée
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fonction pour ouvrir et fermer la modale
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  // Fonction pour gérer la sélection du fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Générer une URL temporaire pour prévisualiser l'image
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Veuillez sélectionner une image avant de soumettre.");
      return;
    }

    // Envoyer le formulaire après la validation
    editPhotosForm(idLocation, selectedFile);
    console.log("Image envoyée :", selectedFile);

    // Réinitialiser l'état après l'envoi
    setSelectedFile(null);
    setPreviewImage(null);
    setShowModal(false);
  };

  useEffect(() => {
    setSelectedItem("");
  }, []);

  useEffect(() => {
    fetchDataSelectedItem(idLocation, setSelectedItem);
  }, []);

  useEffect(() => {
    const existingScript = document.querySelector(
      "script[src='https://www.instagram.com/embed.js']"
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    } else if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, [selectedItem]);

  return (
    <div className="selected-container">
      <h2>{selectedItem.locationName}</h2>
      <div className="img-box">
        <div className="img1">
          {adminLogin && (
            <div
              className="deleted"
              aria-label={`Supprimer la photo 1`}
              onClick={() => {
                if (selectedItem.photos && selectedItem.photos[0])
                  deletePhoto(idLocation, selectedItem.photos[0]);
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </div>
          )}
          {selectedItem.photos && selectedItem.photos[0] ? (
            <img src={selectedItem.photos[0]} alt={`Photo1`} />
          ) : (
            <p>image1</p>
          )}
        </div>

        <div className="img2">
          {adminLogin && (
            <div
              className="deleted"
              aria-label={`Supprimer la photo 2`}
              onClick={() => {
                if (selectedItem.photos && selectedItem.photos[1])
                  deletePhoto(idLocation, selectedItem.photos[1]);
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </div>
          )}
          {selectedItem.photos && selectedItem.photos[1] ? (
            <img src={selectedItem.photos[1]} alt={`Photo2`} />
          ) : (
            <p>image2</p>
          )}
        </div>

        <div className="img-box2">
          <div className="img3">
            {adminLogin && (
              <div
                className="deleted"
                aria-label={`Supprimer la photo 3`}
                onClick={() => {
                  if (selectedItem.photos && selectedItem.photos[2])
                    deletePhoto(idLocation, selectedItem.photos[2]);
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </div>
            )}
            {selectedItem.photos && selectedItem.photos[2] ? (
              <img src={selectedItem.photos[2]} alt={`Photo3`} />
            ) : (
              <p>image3</p>
            )}
          </div>

          <div className="img4">
            {adminLogin && (
              <div
                className="deleted"
                aria-label={`Supprimer la photo 4`}
                onClick={() => {
                  if (selectedItem.photos && selectedItem.photos[3])
                    deletePhoto(idLocation, selectedItem.photos[3]);
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </div>
            )}
            {selectedItem.photos && selectedItem.photos[3] ? (
              <img src={selectedItem.photos[3]} alt={`Photo4`} />
            ) : (
              <p>image4</p>
            )}
          </div>
        </div>

        {adminLogin && (
          <div className="modal-box">
            <p onClick={handleToggleModal}>éditer</p>
          </div>
        )}
      </div>
      <div className="selected-box">
        <div className="about">
          <h3>À propos de ce lieu</h3>
          <p>{selectedItem.locationDescription}</p>
          <p>
            <span>Adresse :</span>
            <Link to="#">
              {`${selectedItem.locationAddress}, ${selectedItem.postalCode}`}
            </Link>
          </p>
          <div className="line"></div>
          <div className="tips">
            <h4>Conseils</h4>
            <ul>
              {selectedItem.tips && JSON.parse(selectedItem.tips).length > 0 ? (
                JSON.parse(selectedItem.tips).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))
              ) : (
                <li>Aucun conseil disponible pour cet endroit.</li>
              )}
            </ul>
          </div>
          <div className="line"></div>
          <div className="instagram">
            <div className="insta-title">
              <FontAwesomeIcon icon="fa-brands fa-instagram" />
              <span>{selectedItem.socialmedia}</span>
            </div>
            <div className="insta-box">
              <div className="insta-line1">
                {Array.isArray(selectedItem.mediaLink) &&
                  selectedItem.mediaLink.length > 0 &&
                  selectedItem.mediaLink.map((link, index) => {
                    if (typeof link !== "string" || !link.trim()) {
                      // Si le lien n'est pas valide (non chaîne ou vide), on passe à l'élément suivant
                      return null;
                    }

                    return (
                      <div key={index}>
                        <blockquote
                          className="instagram-media"
                          data-instgrm-permalink={link}
                          data-instgrm-version="14"
                          style={{ maxWidth: "540px", margin: "auto" }}
                        ></blockquote>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="horaires-box">
          <div className="horaires">
            <h3>
              <FontAwesomeIcon icon="fa-regular fa-clock" />
              Horaires
            </h3>
            {selectedItem.hours &&
              Object.entries(selectedItem.hours).map(
                ([jour, plages], index) => {
                  // Vérifie si le jour est "Fermé"
                  const isClosed = !Object.values(plages).some(
                    (horaires) => horaires.ouverture && horaires.fermeture
                  );

                  return (
                    <li key={index}>
                      <strong>
                        {jour.charAt(0).toUpperCase() + jour.slice(1)} :
                      </strong>
                      {isClosed ? (
                        <span>Fermé</span>
                      ) : (
                        <ul>
                          {Object.values(plages).map((horaires, idx) =>
                            horaires.ouverture && horaires.fermeture ? (
                              <li key={idx}>
                                {horaires.ouverture} - {horaires.fermeture}
                              </li>
                            ) : null
                          )}
                        </ul>
                      )}
                    </li>
                  );
                }
              )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={handleToggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Éditer l'emplacement</h2>
            <p>Contenu de la modale ici</p>

            {/* Input file */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            {/* Afficher la prévisualisation de l'image */}
            {previewImage && (
              <div className="image-preview">
                <img
                  src={previewImage}
                  alt="Prévisualisation"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}

            {/* Boutons pour envoyer le formulaire et fermer la modale */}
            <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
              Envoyer
            </button>
            <button onClick={handleToggleModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedLocation;
