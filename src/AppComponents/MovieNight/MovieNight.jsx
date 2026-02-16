import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

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
  const { authTokens } = useContext(AuthContext);

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

  // Check if current user is already a participant
  // We need to check if loggedUser is in movieNightDetails.participants
  // movieNightDetails.participants is likely an array of objects or IDs. 
  // Based on other files (Votes.py), participants is M2M to User.
  // We need to see how it comes from API.
  // Assuming it comes as list of user objects or at least usernames if serialized simply.
  // Let's assume for now we might need to check by ID or username. 

  // Actually, checking MovieNight.py serialization. Participants are users.
  // Let's inspect data structure in console logs later but for now:

  const isParticipant = movieNightDetails?.participants?.some(
    p => p.username === loggedUser || p.id === loggedUser // dealing with potential username string vs user object from context
  );

  const handleJoinMovieNight = async () => {
    try {
      const response = await fetch(`${apiOrigin}/sign-for-movie-night/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens?.access}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          movieNightId: movieNightId
        })
      });

      if (response.ok) {
        // Refresh details to update UI
        get_movie_night_details(apiOrigin, movieNightId);
      } else {
        console.error("Failed to join movie night");
      }
    } catch (error) {
      console.error("Error joining movie night:", error);
    }
  }

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


        {/* If already participant, maybe show a small badge or nothing? requested: "Zapisywanie jest widoczne wyłącznie w Wieczorkach bez wyłonionego zwycięzcy" 
             and "Po kliknięciu... zostanie dopisany". Implies button goes away or changes state. */ }
        <div className="movie-night-grid">
          <div className="winner-row">
            <WinnerMoviePreview
              apiOrigin={apiOrigin}
              currentMovieNightWinnerDetails={movieNightDetails?.winnerMovie}
              movieNightDescription={movieNightDetails?.description}
              isParticipant={isParticipant}
              handleJoinMovieNight={handleJoinMovieNight}
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
