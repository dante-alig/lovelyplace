import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContextProvider } from "../src/context/myContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMap, faClock } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faSliders,
  faMartiniGlassCitrus,
  faMartiniGlass,
  faUtensils,
  faTicket,
  faStar,
  faXmark,
  faUser,
  faEuroSign,
  faUmbrellaBeach,
  faSnowflake,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Home from "./pages/home";
import Form from "./pages/form";
import Header from "./components/header";
import SelectedLocation from "./pages/selectedLocation";

// Ajout des icônes à la librairie FontAwesome
library.add(
  faMap,
  faSliders,
  faMartiniGlassCitrus,
  faMartiniGlass,
  faUtensils,
  faTicket,
  faStar,
  faInstagram,
  faClock,
  faXmark,
  faUser,
  faEuroSign,
  faSnowflake,
  faUmbrellaBeach,
  faLocationCrosshairs
);

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route
            path="/selectedLocation/:idLocation"
            element={<SelectedLocation />}
          />
        </Routes>
      </Router>
    </MyContextProvider>
  );
}

export default App;
