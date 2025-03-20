import React, { useState, useEffect } from "react";

import "./Action.css";
import { useAddMovieNight } from "../../../contexts/AddMovieNightContext";
import Category from "../../MovieNight/Category";
import Location from "../../MovieNight/Location";
import MovieNightDate from "../../MovieNight/MovieNightDate";

import "./Action.css";

function Action() {
  const { title, location, date, description, pickedMovies } =
    useAddMovieNight();

  // Format the date to the proper structure
  const formattedDate = (() => {
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Miesiące są indeksowane od 0
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  })();
  console.log("formattedDate", formattedDate);

  return (
    <div>
      <div class="grid">
        <div class="col-6">
          <Category>{title}</Category>
        </div>
        <div class="col-2">
          <Location>{location.locationName}</Location>
        </div>
        <div class="col-3">
          <MovieNightDate>{formattedDate}</MovieNightDate>
        </div>
      </div>
    </div>
  );
}

export default Action;
