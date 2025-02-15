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
}) {
  const [isVoted, setIsVoted] = useState(false);

  //!! DODAĆ SERIALIZER DO POBIERANIA LISTY SAMYCH WIECZORKÓW
  //!! DODAĆ GŁOSOWANIE
  function count_votes() {
    let totalVotes = 0;

    votes.forEach((vote) => {
      if (vote.movie.includes(movieTitle)) {
        totalVotes += 1;
      }
    });
    return totalVotes;
  }

  return (
    <div className="movie-candidate-row">
      <img src={moviePosterMini} alt={movieTitle} />
      <div style={{ width: "150px", padding: "10px" }}>
        <ProgressBar percentage={(count_votes(votes) / participants) * 100} />
      </div>
      <Button
        style={{
          fontFamily: "Antonio",
          border: "solid 1px",
          backgroundColor: "transparent",
          height: "30%",
          display: "flex",
        }}
        label="Głosuj"
      />
    </div>
  );
}

export default MovieSurveyCandidate;
