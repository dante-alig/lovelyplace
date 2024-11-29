import React, { createContext, useState } from "react";
export const MyContext = createContext();
export const MyContextProvider = ({ children }) => {
  const [items, setItems] = useState("");
  const [loadingData, setLoadingData] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [adminLogin, setAdminLogin] = useState(false);
  const [categorieItems, setCategorieItems] = useState("drink");
  const [filterParams, setFilterParams] = useState(null);

  return (
    <MyContext.Provider
      value={{
        items,
        setItems,
        loadingData,
        setLoadingData,
        selectedItem,
        setSelectedItem,
        adminLogin,
        setAdminLogin,
        categorieItems,
        setCategorieItems,
        filterParams,
        setFilterParams,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
