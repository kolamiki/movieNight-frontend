import React, { useState, useEffect } from "react";

import "./Action.css";
import { useAddMovieNight } from "../../../contexts/AddMovieNightContext";
import Category from "../../MovieNight/Category";
import Location from "../../MovieNight/Location";
import MovieNightDate from "../../MovieNight/MovieNightDate";

import MovieCard from "./MovieCard";

import "./Action.css";
import "./Lights.css";

function Action({ apiOrigin }) {
  const { title, location, date, description, pickedMovies } =
    useAddMovieNight();

  console.log("description length", description.length);

  // Format the date to the proper structure
  const formattedDate = (() => {
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Miesiące są indeksowane od 0
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  })();

  function render_selected_movies() {
    return (
      <div className="candidates-box" style={{ marginTop: "0px" }}>
        {pickedMovies.map((movie, key) => (
          <MovieCard
            apiOrigin={apiOrigin}
            title={movie.previewTitle}
            imgAddress={movie.cover}
            key={movie.id + 2 * movie.id}
            id={movie.id}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="action-header-grid">
        <div>
          <Category>{title}</Category>
        </div>
        <div className="action-location">
          <Location>{location.locationName}</Location>
        </div>
        <div>
          <MovieNightDate style={{ width: "120px" }}>
            {formattedDate}
          </MovieNightDate>
        </div>
      </div>
      <div className="action-description-and-candidates">
        <div className="description-action">
          {/* <h2>Opis</h2> */}
          {description}
        </div>
        <div className="candidates-column" style={{ marginTop: "0px" }}>
          {render_selected_movies()}
        </div>
      </div>
    </div>
  );
}

export default Action;
