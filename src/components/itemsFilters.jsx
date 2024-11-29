import { useState } from "react";

const ItemsFilters = ({
  filterData,
  setFilterParams,
  buttonActiv,
  setButtonActiv,
  numberTab,
}) => {
  const [activ, setActiv] = useState(true);
  return (
    <div
      className={
        buttonActiv === numberTab
          ? "itemFilters-container-hover"
          : "itemFilters-container"
      }
      onClick={() => {
        if (activ) {
          setButtonActiv(numberTab);
          setActiv(false);
          setFilterParams({
            filters: [
              `${filterData.filterCategorieKey}:${filterData.filterCategorieValue}`,
            ],
          });
        } else {
          setButtonActiv("");
          setActiv(true);
          setFilterParams(null);
        }
      }}
    >
      <p>{filterData.name}</p>
    </div>
  );
};

export default ItemsFilters;
