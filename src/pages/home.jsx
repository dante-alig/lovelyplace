import Items from "../components/items";
import ItemsFilters from "../components/itemsFilters";
import { MyContext } from "../context/myContext";
import { useEffect, useContext, useState } from "react";
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
  } = useContext(MyContext);

  const [buttonActiv, setButtonActiv] = useState("1");
  const [openMap, setOpenMap] = useState(false);

  useEffect(() => {
    // Récupération des données des items
    fetchDataItems(setItems, setLoadingData, categorieItems, filterParams);
  }, [categorieItems, filterParams]);

  return (
    <div className="home-container">
      <div className="category-bar-box">
        {/* -----------Menu catégories------------- */}
        <div className="category-bar">
          <div
            className={categorieItems === "drink" ? "drink-activ" : "drink"}
            onClick={() => {
              setCategorieItems("drink");
            }}
          >
            Prendre un verre
            <FontAwesomeIcon icon="fa-solid fa-martini-glass" />
          </div>
          <div
            className={categorieItems === "eat" ? "eat-activ" : "eat"}
            onClick={() => {
              setCategorieItems("eat");
            }}
          >
            Manger ensemble
            <FontAwesomeIcon icon="fa-solid fa-utensils" />
          </div>
          <div
            className={categorieItems === "fun" ? "fun-activ" : "fun"}
            onClick={() => {
              setCategorieItems("fun");
            }}
          >
            Partager une activité <FontAwesomeIcon icon="fa-solid fa-ticket" />
          </div>
        </div>
      </div>
      {/* -----------Menu sous - catégories------------- */}
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
          className="map"
          onClick={() => {
            setOpenMap(!openMap);
          }}
        >
          {!openMap ? "Regarder sur une carte" : "fermer la carte"}
          <FontAwesomeIcon className="fa-map" icon="fa-regular fa-map" />
        </div>
        <div className="filter-icon">
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
        <MapLocation />
      )}
    </div>
  );
};

export default Home;
