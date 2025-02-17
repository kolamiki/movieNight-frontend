import React, { useEffect, useState } from "react";

import { Carousel } from "primereact/carousel";
import "/node_modules/primeflex/primeflex.css";

//*** IMPORT STYLES */
import "./MovieNight.css";

//*** IMPORT COMPONENTS */
import WinnerMoviePreview from "./WinnerMoviePreview";
import Category from "./Category";
import Location from "./Location";
import Date from "./Date";
import MovieSurveyResults from "./MovieSurvey/MovieSurveyResults";

function MovieNight({ apiOrigin }) {
  const [isVoted, setIsVoted] = useState(true);

  const [movieNightDetails, setMovieNightDetails] = useState(null);

  function get_movie_night_details(apiOrigin, movieNightName) {
    fetch(`${apiOrigin}/showMovieNight/${movieNightName}/`)
      .then((response) => response.json())
      .then((data) => {
        setMovieNightDetails(() => data);
      });
  }
  useEffect(
    function () {
      if (isVoted) {
        get_movie_night_details(apiOrigin, "Test");

        // Change status isVoted to false
        setIsVoted(false);
      }
    },
    [isVoted]
  );

  console.log("movie night details", movieNightDetails);

  return (
    <div className="movie-night-position">
      <div class="grid">
        <div class="col-6">
          <Category>{movieNightDetails?.categoryName}</Category>
        </div>
        <driv class="col-2">
          <Location>{movieNightDetails?.location?.locationName}</Location>
        </driv>
        <div class="col-3">
          <Date>{movieNightDetails?.date}</Date>
        </div>
        <div class="col-2"></div>
      </div>
      <div class="grid">
        <div class="col-5">
          <WinnerMoviePreview
            apiOrigin={apiOrigin}
            currentMovieNightWinnerDetails={movieNightDetails?.winnerMovie}
          />
        </div>
        <div class="col-7">
          <MovieSurveyResults
            apiOrigin={apiOrigin}
            movieNightCategory={movieNightDetails?.categoryName}
            movieNightCandidatesData={movieNightDetails?.candidates}
            participants={movieNightDetails?.participants.length}
            votes={movieNightDetails?.votes}
            isMovieNightActive={movieNightDetails?.isActive}
            setIsVoted={setIsVoted}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieNight;
