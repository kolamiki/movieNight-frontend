import React, { useEffect, useState } from "react";

import { Carousel } from "primereact/carousel";
import "/node_modules/primeflex/primeflex.css";

//*** IMPORT STYLES */
import "./MovieNight.css";

//*** IMPORT COMPONENTS */
import WinnerMoviePreview from "./WinnerMoviePreview";
import Category from "./Category";
import Location from "./Location";
import MovieNightDate from "./MovieNightDate";
import MovieSurveyResults from "./MovieSurvey/MovieSurveyResults";

/**
 * MovieNight component displays details of a movie night event, including its category, location, date,
 * winner movie preview, and survey results. It fetches movie night details from the API and manages
 * voting state.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.apiOrigin - The base URL of the API.
 * @param {Object} props.loggedUser - The currently logged-in user.
 * @returns {JSX.Element} The rendered MovieNight component.
 */

/**
 * Fetches the details of a specific movie night from the API and updates the state.
 *
 * @function get_movie_night_details
 * @param {string} apiOrigin - The base URL of the API.
 * @param {string} movieNightName - The name of the movie night to fetch details for.
 * @returns {void}
 */
function MovieNight({
  apiOrigin,
  loggedUser,
  movieNightId,
  currentMovieNightIndex,
}) {
  const [isVoted, setIsVoted] = useState(true);

  const [movieNightDetails, setMovieNightDetails] = useState(null);

  function get_movie_night_details(apiOrigin, movieNightId) {
    fetch(`${apiOrigin}/showMovieNight/${movieNightId}/`)
      .then((response) => response.json())
      .then((data) => {
        setMovieNightDetails(() => data);
      });
  }
  useEffect(
    function () {
      if (isVoted) {
        get_movie_night_details(apiOrigin, movieNightId);

        // Change status isVoted to false
        setIsVoted(false);
      } else {
        get_movie_night_details(apiOrigin, movieNightId);
      }
    },
    [isVoted, loggedUser, currentMovieNightIndex]
  );

  // console.log("movie night details", movieNightDetails);
  // console.log("loggedUser in MovieNight", loggedUser);

  return (
    <div class="animate__animated animate__fadeIn">
      <div className="movie-night-position" id="movie-night">
        {/* Top Info Block: Category | Location | Date */}
        <div className="flex justify-content-center align-items-start mb-5" style={{ gap: '20px' }}>
          <Category>{movieNightDetails?.categoryName}</Category>
          <div className="flex align-items-start pt-2">
            <Location>{movieNightDetails?.location?.locationName}</Location>
          </div>
          <MovieNightDate>{movieNightDetails?.date}</MovieNightDate>
        </div>

        <div className="movie-night-grid">
          <div className="winner-row">
            <WinnerMoviePreview
              apiOrigin={apiOrigin}
              currentMovieNightWinnerDetails={movieNightDetails?.winnerMovie}
              movieNightDescription={movieNightDetails?.description}
            />
          </div>
          <div className="survey-row">
            <MovieSurveyResults
              apiOrigin={apiOrigin}
              movieNightCategory={movieNightDetails?.categoryName}
              movieNightCandidatesData={movieNightDetails?.candidates}
              participants={movieNightDetails?.participants.length}
              votes={movieNightDetails?.votes}
              isMovieNightActive={movieNightDetails?.isActive}
              setIsVoted={setIsVoted}
              loggedUser={loggedUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieNight;
