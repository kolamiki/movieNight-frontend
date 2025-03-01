import React, { useEffect, useState } from "react";

import { PickList } from "primereact/picklist";

import "./Camera.css";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";

function Camera({ apiOrigin }) {
  // Provided phrases by the user
  const [searchedMovieTitle, setSearchedMovieTitle] = useState("");

  // Searched and Picked Movies Lists

  const [fetchedMovies, setFetchedMovie] = useState([]);
  const [pickedMovies, setPickedMovies] = useState(["", "", ""]);

  function onChange(event) {
    setFetchedMovie(event.source);
    setPickedMovies(event.target);
  }

  function search_movie() {}

  function render_search_results() {
    return <div className="search-results-box"></div>;
  }

  function render_empty_candidate(key) {
    return <div className="empty-candidate-record">Kandydat {key + 1}</div>;
  }

  function render_candidates_column() {
    return (
      <div className="candidates-column">
        {" "}
        {pickedMovies.map((movie, key) => {
          return movie.length === 0 ? render_empty_candidate(key) : "";
        })}
        ;
      </div>
    );
  }

  return (
    <div class="formgrid grid">
      <div class="field col">
        <p className="search-movie-header">Znajdź film</p>

        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            id="searched-movie-title"
            placeholder="Wpisz tytuł"
            value={searchedMovieTitle}
            onChange={(e) => setSearchedMovieTitle(e.target.value)}
          />
        </IconField>
        {render_search_results()}
      </div>
      <div class="field col">
        <p className="search-movie-candidates">Kandydaci</p>
        {render_candidates_column()}
      </div>
      {/* <PickList dataKey="id" source={fetchedMovies} /> */}
    </div>
  );
}

export default Camera;

function SearchedMovieCard({ apiOrigin }) {
  return <div></div>;
}
