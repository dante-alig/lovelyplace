import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { useContext } from "react";
import { getFirstSentence } from "../utils/getFirstSentence";
import ContentLoader from "react-content-loader";

const Items = ({ item }) => {
  const { loadingData } = useContext(MyContext);

  if (loadingData) {
    return (
      <ContentLoader
        speed={2}
        width={276}
        height={400}
        viewBox="0 0 276 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="200" y="285" rx="0" ry="0" width="88" height="20" />
        <rect x="0" y="285" rx="0" ry="0" width="88" height="20" />
        <rect x="0" y="310" rx="0" ry="0" width="52" height="20" />
        <rect x="0" y="340" rx="0" ry="0" width="52" height="20" />
        <rect x="0" y="370" rx="0" ry="0" width="276" height="60" />
        <rect x="0" y="0" rx="0" ry="0" width="276" height="276" />
      </ContentLoader>
    );
  } else {
    return (
      <div className="item-container">
        <Link to={`/selectedLocation/${item?._id}`}>
          <div className="item-img">
            <img
              src={item?.photos?.[0] || "/default-image.jpg"}
              alt={item?.locationName || "Location"}
              className="img"
            />
          </div>
          <div className="item-box">
            <div className="item-infos">
              <div className="item-title">{item?.locationName || "N/A"}</div>
              <div className="item-postal">{item?.postalCode || "N/A"}</div>
              <div className="item-price">{item?.priceRange || "N/A"}</div>
            </div>
            <div className="note">
              <div className="star"></div>
              <div className="value">
                <FontAwesomeIcon icon={faStar} />
                4.9
              </div>
            </div>
          </div>
          <div className="description">
            {getFirstSentence(
              item?.locationDescription || "No description available."
            )}
          </div>
        </Link>
      </div>
    );
  }
};

export default Items;
