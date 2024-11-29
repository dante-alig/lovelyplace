import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/lovelyplaceparis.png";
import { useState } from "react";

const Header = () => {
  const location = useLocation(); // Obtient l'emplacement actuel
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture de la modale

  // Fonction pour ouvrir/fermer la modale
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Fonction pour fermer la modale en cliquant sur l'arrière-plan
  const closeModalOnClickOutside = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="header-global">
      <div className="header-container">
        <div className="header-box">
          {/* Ajout du lien vers la page d'accueil */}
          <div className="header-logo">
            <Link to="/">
              <img src={logo} alt="logo" className="img" />
            </Link>
          </div>
          <div className="header-search"></div>
          <div className="header-profil" onClick={toggleModal}>
            <FontAwesomeIcon icon="fa-solid fa-user" />
            <p>Se connecter</p>
          </div>
        </div>
        {/* Affiche header-box2 uniquement si la route est "/" */}
        {location.pathname === "/" && (
          <div className="header-box2">
            <div className="header-sentence">
              <p>
                Découvrez les meilleurs endroits pour des rendez-vous
                mémorables, soigneusement sélectionnés pour que chaque rencontre
                devienne une expérience unique et inoubliable.
              </p>
            </div>
            <div>
              <button>Trouver le rendez-vous idéal</button>
            </div>
          </div>
        )}
      </div>

      {/* Modale */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModalOnClickOutside}>
          <div className="modal-content">
            <h2>Se connecter</h2>
            <form>
              <input type="email" placeholder="Votre email" required />
              <input
                type="password"
                placeholder="Votre mot de passe"
                required
              />
              <button type="submit">Connexion</button>
              <button className="premium">
                <p>Devenir membre Premium</p>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
