import React, { useEffect, useState } from "react";

import { Carousel } from "primereact/carousel";
import "primeflex/primeflex.css";

//*** IMPORT STYLES */
import "./MovieNight.css";

//*** IMPORT COMPONENTS */
import WinnerMoviePreview from "./WinnerMoviePreview";
import Category from "./Category";
import Location from "./Location";
import Date from "./Date";
import MovieSurveyResults from "./MovieSurvey/MovieSurveyResults";

function MovieNight() {
  const [movieNight, setMovieNight] = useState({});

  useEffect(function () {}, []);

  return (
    <div className="movie-night-position">
      <div class="grid">
        <div class="col-6">
          <Category>CIECZE</Category>
        </div>
        <driv class="col-2">
          <Location>Krzysiu i Marta</Location>
        </driv>
        <div class="col-3">
          <Date>
            <p>
              30 <br /> luty
            </p>
          </Date>
        </div>
        {/* <div class="col-2"></div> */}
      </div>
      <div class="grid">
        <div class="col-5">
          <WinnerMoviePreview />
        </div>
        <div class="col-7">
          <MovieSurveyResults />
        </div>
      </div>
    </div>
  );
}

export default MovieNight;
