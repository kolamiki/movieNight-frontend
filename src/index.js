import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api"; // Import PrimeReactProvider
import "./index.css";
import App from "./App";

// Konfiguracja globalnych ustawień PrimeReact
const primeReactConfig = {
  ripple: true,
  inputStyle: "outlined",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PrimeReactProvider value={primeReactConfig}>
    <App />
  </PrimeReactProvider>
);
