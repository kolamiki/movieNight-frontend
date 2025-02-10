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
  return (
    <div className="movie-candidate-row">
      <img src={apiOrigin + moviePosterMini} alt={movieTitle} />
      <div style={{ width: "150px", padding: "10px" }}>
        <ProgressBar percentage={(votes / participants) * 100} />
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
