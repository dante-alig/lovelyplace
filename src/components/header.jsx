import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/lovelyplaceparis.png";

const Header = () => {
  const location = useLocation(); // Obtient l'emplacement actuel

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
          <div className="header-profil">
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
    </div>
  );
};

export default Header;
