import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api"; // Import PrimeReactProvider

import { addLocale } from "primereact/api";

import "./index.css";
import App from "./App";

// Konfiguracja globalnych ustawień PrimeReact
const primeReactConfig = {
  ripple: true,
  inputStyle: "outlined",
};

const root = ReactDOM.createRoot(document.getElementById("WieczorekFilmowy"));

const foo = document.getElementsByTagName("WieczorekFilmowy")[0];
const apiorigin = foo.attributes?.getNamedItem("apiorigin")?.value;

// console.log("apiOrigin", document);

const plLocale = {
  firstDayOfWeek: 1,
  dayNames: [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ],
  dayNamesShort: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
  dayNamesMin: ["N", "P", "W", "Ś", "C", "P", "S"],
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  monthNamesShort: [
    "Sty",
    "Lut",
    "Mar",
    "Kwi",
    "Maj",
    "Cze",
    "Lip",
    "Sie",
    "Wrz",
    "Paź",
    "Lis",
    "Gru",
  ],
  today: "Dziś",
  clear: "Wyczyść",
};

// Update prime react calendar
addLocale("pl", plLocale);

root.render(
  <PrimeReactProvider value={primeReactConfig}>
    <App apiOrigin={apiorigin} />
    {/* <App /> */}
  </PrimeReactProvider>
);
