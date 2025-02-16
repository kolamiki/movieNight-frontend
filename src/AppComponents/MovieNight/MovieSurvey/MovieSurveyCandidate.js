import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";

import "./MovieSurveyCandidate.css";
import ProgressBar from "./ProgressBar";

function MovieSurveyCandidate({
  apiOrigin,
  movieTitle,
  moviePosterMini,
  votes,
  participants,
  isMovieNightActive,
}) {
  const [isVoted, setIsVoted] = useState(false);
  const [loggedUser, setLoggedUser] = useState("tester");

  //!! DODAĆ GŁOSOWANIE
  //! Dodać zczytywanie głosów od aktualnie zalogowanego użytownika
  // ! Dodać funkcję wysyłającą głos na film
  //! Dodać funkcję spradzającą, czy użytkownik oddał głos na jeden film

  function send_vote() {
    // This function sends the vote to the selected movie
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
        {check_is_voted() ? (
          <Button
            style={{
              fontFamily: "Antonio",
              border: "solid 1px",
              backgroundColor: "white",
              height: "30%",
              display: "flex",
              color: "black", // Kolor tekstu
              // mixBlendMode: "destination-out",
            }}
            label="Twój Głos"
            disabled={isMovieNightActive === false}
          />
        ) : (
          <Button
            style={{
              fontFamily: "Antonio",
              border: "solid 1px",
              backgroundColor: "transparent",
              height: "30%",
              display: "flex",
            }}
            label="Głosuj"
            disabled={isMovieNightActive === false}
            onClick={() => send_vote()}
          />
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
