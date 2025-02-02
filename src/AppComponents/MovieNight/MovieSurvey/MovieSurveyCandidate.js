import React, { useState, useEffect } from "react";

function MovieSurveyCandidate({ movieTitle, moviePosterMini, votes }) {
  return (
    <div>
      <p>
        {movieTitle} - {votes}
      </p>
    </div>
  );
}

export default MovieSurveyCandidate;
