import React, { useEffect, useState } from "react";

import { Carousel } from "primereact/carousel";
import WinnerMoviePreview from "./WinnerMoviePreview";
import Category from "./Category";

//*** IMPORT STYLES */
import "./MovieNight.css";
import Location from "./Location";
import Date from "./Date";

function MovieNight() {
  const [movieNight, setMovieNight] = useState({});

  useEffect(function () {}, []);

  return (
    <div className="movie-night-position">
      <Category>CIECZE</Category>
      <Location>Krzysiu i Marta</Location>
      <Date>
        <p>
          30 <br /> luty
        </p>
      </Date>
      <WinnerMoviePreview />
    </div>
  );
}

export default MovieNight;
