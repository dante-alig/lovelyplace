import React, { useContext, useState, useRef } from "react";
import { MyContext } from "../context/myContext";

const ModalFilter = () => {
  const [address, setAddress] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [season, setSeason] = useState("été");
  const [cuisine, setCuisine] = useState("");

  const { setFilterParams, setShowModal } = useContext(MyContext);

  const modalRef = useRef(null);

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

  return (
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
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
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
  );
};

export default ModalFilter;
