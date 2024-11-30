import React, { useState, useContext, useEffect, useRef } from "react";
import Items from "../components/items";
import ItemsFilters from "../components/itemsFilters";
import { MyContext } from "../context/myContext";
import { fetchDataItems } from "../services/fetchDataItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { itemsFiltersData } from "../utils/itemsFiltersData";
import MapLocation from "../components/mapLocation";
import loadingAnimation from "../assets/loading.webm";

const Home = () => {
  const {
    items,
    setItems,
    loadingData,
    setLoadingData,
    categorieItems,
    setCategorieItems,
    filterParams,
    setFilterParams,
    userLocation,
    setUserLocation,
  } = useContext(MyContext);

  const [buttonActiv, setButtonActiv] = useState("1");
  const [openMap, setOpenMap] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [address, setAddress] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [season, setSeason] = useState("été");
  const [cuisine, setCuisine] = useState("");

  const modalRef = useRef(null);

  useEffect(() => {
    fetchDataItems(setItems, setLoadingData, categorieItems, filterParams);
  }, [categorieItems, filterParams]);

  const handleApplyFilters = () => {
    setFilterParams((prev) => ({
      ...prev,
      address,
      priceRange,
      season,
      cuisine,
    }));
    setShowModal(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="home-container">
      <div className="category-bar-box">
        <div className="category-bar">
          <div
            className={categorieItems === "drink" ? "drink-activ" : "drink"}
            onClick={() => setCategorieItems("drink")}
          >
            Prendre un verre
            <FontAwesomeIcon icon="fa-solid fa-martini-glass" />
          </div>
          <div
            className={categorieItems === "eat" ? "eat-activ" : "eat"}
            onClick={() => setCategorieItems("eat")}
          >
            Manger ensemble
            <FontAwesomeIcon icon="fa-solid fa-utensils" />
          </div>
          <div
            className={categorieItems === "fun" ? "fun-activ" : "fun"}
            onClick={() => setCategorieItems("fun")}
          >
            Partager une activité <FontAwesomeIcon icon="fa-solid fa-ticket" />
          </div>
        </div>
      </div>
      <div className="filters-bar">
        <div className="direct-filters">
          {Array.isArray(itemsFiltersData) &&
            itemsFiltersData.map((filter) => (
              <ItemsFilters
                key={filter.id}
                filterData={filter}
                setFilterParams={setFilterParams}
                setButtonActiv={setButtonActiv}
                buttonActiv={buttonActiv}
                numberTab={filter.id}
              />
            ))}
        </div>
        <div
          className={!openMap ? "map" : "map-closed"}
          onClick={() => setOpenMap(!openMap)}
        >
          {!openMap ? "Regarder sur une carte" : "Fermer la carte"}
          <FontAwesomeIcon className="fa-map" icon="fa-regular fa-map" />
        </div>
        <div className="filter-icon" onClick={() => setShowModal(true)}>
          Filtres
          <FontAwesomeIcon icon="fa-solid fa-sliders" />
        </div>
      </div>

      {!openMap ? (
        <div className="items-container">
          <div className="items-box">
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item) => <Items key={item._id} item={item} />)
            ) : (
              <div>Aucun item trouvé</div>
            )}
          </div>
        </div>
      ) : (
        <div className="geoloc-container">
          <MapLocation />
          <div className="geoloc"></div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <h2>Filtres</h2>
            <div>
              <label>Adresse :</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label>Prix :</label>
              <input
                type="text"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />
            </div>
            <div>
              <label>Saison :</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                <option value="été">Été</option>
                <option value="hiver">Hiver</option>
              </select>
            </div>
            <div>
              <label>Type de cuisine :</label>
              <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              />
            </div>
            <button onClick={handleApplyFilters}>Appliquer</button>
            <button onClick={() => setShowModal(false)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
