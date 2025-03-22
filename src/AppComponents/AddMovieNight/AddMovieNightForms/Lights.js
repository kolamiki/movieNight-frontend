import React, { useState, useEffect } from "react";

import axios from "axios";

import "/node_modules/primeflex/primeflex.css";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";

import "./Lights.css";
import getCSRFToken from "../../get_token";
import { useAddMovieNight } from "../../../contexts/AddMovieNightContext";

function Lights({ apiOrigin, locationsList }) {
  //Get states based on the provider

  const {
    title,
    setTitle,
    location,
    setLocation,
    date,
    setDate,
    description,
    setDescription,
  } = useAddMovieNight();

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
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            locale="pl"
            // localeOption={plLocale}
            dateFormat="dd/mm/yy"
          />
        </div>
        <div class="field col">
          <p className="light-form">Czy wiesz, że...</p>
          <MovieTrivia apiOrigin={apiOrigin} />
        </div>
      </div>
      <div
        class="formgrid grid"
        style={{ marginLeft: "15px", marginTop: "-45px" }}
      >
        <div class="field col">
          <p className="light-form">Opis</p>
          <InputTextarea
            style={{
              backgroundColor: description.length <= 490 ? "white" : "#ffcccc",
            }}
            autoResize
            value={description}
            // maxLength={490}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={80}
            placeholder="Wpisz tekst (max 490 znaków)"
          />
        </div>
      </div>
    </>
  );
}

export default Lights;

function MovieTrivia({ apiOrigin }) {
  const [trivia, setTrivia] = useState("");
  const [triviaSource, setTriviaSource] = useState("");

  function get_random_number(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(function () {
    fetch(`${apiOrigin}/getTrivia/`)
      .then((response) => response.json())
      .then((data) => {
        const triviaNumber = get_random_number(0, data.length - 1);
        setTrivia(data[triviaNumber].triviaContent);
        setTriviaSource(data[triviaNumber].triviaSource);
      });
  }, []);

  return (
    <>
      <p className="movie-trivia-content">{trivia}</p>
      <p className="movie-trivia-source">{triviaSource}</p>
    </>
  );
}
