import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";

import "./MovieSurveyCandidate.css";

function MovieSurveyCandidate({
  apiOrigin,
  movieTitle,
  moviePosterMini,
  votes,
}) {
  const [isVoted, setIsVoted] = useState(false);
  return (
    <div className="movie-candidate-row">
      <span>
        {<img src={apiOrigin + moviePosterMini} alt={movieTitle} />} - {votes}
        <Button
          style={{
            fontFamily: "Antonio",
            border: "solid 1px",
            backgroundColor: "transparent",
          }}
          label="Głosuj"
        />
      </span>
    </div>
  );
}

export default MovieSurveyCandidate;
