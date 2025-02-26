import React, { useState, useEffect } from "react";

import axios from "axios";

import "/node_modules/primeflex/primeflex.css";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import "./Lights.css";
import getCSRFToken from "../../get_token";

function Lights({ apiOrigin }) {
  const [title, setTitle] = useState("");
  const [locationsList, setLocationsList] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(function () {
    const csrfToken = getCSRFToken();

    async function get_locations() {
      fetch(`${apiOrigin}/getLocations/`)
        .then((response) => response.json())
        .then((data) => setLocationsList(data));
    }

    get_locations();
  }, []);

  return (
    <>
      <div class="formgrid grid" style={{ marginLeft: "15px" }}>
        <div class="field col">
          <p className="light-form">Tytuł</p>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="field col">
          <p className="light-form">Lokalizacja</p>
          <Dropdown
            value={location}
            onChange={(e) => setLocation(e.value)}
            options={locationsList}
            optionLabel="locationName"
            placeholder="U kogo wieczorek?"
          />
        </div>
      </div>
      <div class="formgrid grid" style={{ marginLeft: "15px" }}>
        <div class="field col">
          <p className="light-form">Data</p>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="field col">
          <p className="light-form">Czy wiesz, że...</p>
          <p>Tu będzie ciekawostka</p>
        </div>
      </div>
      <div class="formgrid grid" style={{ marginLeft: "15px" }}>
        <div class="field col">
          <p className="light-form">Opis</p>
          <InputTextarea
            autoResize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={80}
          />
        </div>
      </div>
    </>
  );
}

export default Lights;

function MovieTrivia({ apiOrigin }) {
  useEffect(function () {
    // Get movie trivia from database
  }, []);
}
