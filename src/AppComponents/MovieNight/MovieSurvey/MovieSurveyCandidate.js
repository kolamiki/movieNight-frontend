import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";

import { Tooltip } from "primereact/tooltip";

import axios from "axios";

import "./MovieSurveyCandidate.css";
import ProgressBar from "./ProgressBar";

function MovieSurveyCandidate({
  apiOrigin,
  movieTitle,
  movieNightCategory,
  moviePosterMini,
  votes,
  participants,
  isMovieNightActive,
  setIsVoted,
  loggedUser,
}) {
  // const [isVoted, setIsVoted] = useState(false);
  // const [loggedUser, setLoggedUser] = useState("tester");

  //!! DODAĆ
  //! Popup, gdy niezalogowany użytkownik najedzie myszką na przycisk GŁOSUJ

  function send_vote() {
    const post_data = async () => {
      const response = await axios.post(
        `${apiOrigin}/createVote/`,
        { user: loggedUser, movie: movieTitle, movieNight: movieNightCategory },
        { headers: { "Content-Type": "application/json" } }
      );
    };

    // Change voted status to True
    setIsVoted(true);
    post_data();
  }

  function count_votes() {
    let totalVotes = 0;

    votes.forEach((vote) => {
      if (vote.movie.includes(movieTitle)) {
        totalVotes += 1;
      }
    });
    return totalVotes;
  }

  function check_is_voted() {
    // Function to check if user voted to the one of the movie candidates
    let isVoted = false;
    votes.map((vote) => {
      if (vote.user.includes(loggedUser) && vote.movie.includes(movieTitle)) {
        console.log("Voted User", vote.user);
        isVoted = true;
      }
    });
    return isVoted;
  }

  function render_vote_button() {
    return (
      <>
        {loggedUser === null ? (
          <Tooltip target=".button-disabled" mouseTrack mouseTrackTop={10}>
            Zaloguj się, aby zagłosować
          </Tooltip>
        ) : (
          ""
        )}
        {check_is_voted() ? (
          <div className={"button" + (loggedUser === null ? "-disabled" : "")}>
            <Button
              style={{
                fontFamily: "Antonio",
                border: "solid 1px",
                backgroundColor: "white",
                height: "30%",
                display: "flex",
                color: "black", // Kolor tekstu
                fontSize: "20px",
                // mixBlendMode: "destination-out",
              }}
              label="Twój Głos"
              disabled={isMovieNightActive === false || loggedUser === null}
            />
          </div>
        ) : (
          <div className={"button" + (loggedUser === null ? "-disabled" : "")}>
            <Button
              // className={"button" + (loggedUser === null ? "-disabled" : "")}
              style={{
                fontFamily: "Antonio",
                border: "solid 1px",
                backgroundColor: "transparent",
                height: "30%",
                display: "flex",
                fontSize: "20px",
              }}
              label="Głosuj"
              disabled={isMovieNightActive === false || loggedUser === null}
              onClick={() => send_vote()}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="movie-candidate-row">
      <img src={moviePosterMini} alt={movieTitle} />
      <div style={{ width: "150px", padding: "10px" }}>
        <ProgressBar
          percentage={(count_votes(votes) / participants).toFixed(2) * 100}
        />
      </div>

      {render_vote_button()}
    </div>
  );
}

export default MovieSurveyCandidate;
