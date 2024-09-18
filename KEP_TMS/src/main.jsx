import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import 'primereact/resources/themes/md-light-indigo/theme.css'; // Choose a theme
import 'primereact/resources/primereact.min.css';         // Core PrimeReact styles
import 'primeicons/primeicons.css';             
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";          // PrimeIcons styles

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
