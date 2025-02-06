import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";

function MovieSurveyCandidate({ movieTitle, moviePosterMini, votes }) {
  const [isVoted, setIsVoted] = useState(false);
  return (
    <div>
      <span>
        {<img src={moviePosterMini} alt={movieTitle} />} - {votes}
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
