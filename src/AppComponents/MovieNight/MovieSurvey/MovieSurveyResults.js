import React, { useState, useEffect } from "react";

import "primeflex/primeflex.css";

import "./MovieSurveyResults.css";

import MovieSurveyCandidate from "./MovieSurveyCandidate";

function MovieSurveyResults() {
  const [movieCandidates, setMovieCandidates] = useState([
    { movieTitle: "Movie1", votes: 10 },
    { movieTitle: "Movie2", votes: 5 },
    { movieTitle: "Movie3", votes: 1 },
  ]); // use setMovieCandidates to assign fetched voting results

  console.log("Movie Candidates", movieCandidates[1]);
  return (
    <div className="movie-survey-results">
      <div class="flex flex-column">
        <MovieSurveyCandidate
          movieTitle={movieCandidates[0]?.movieTitle}
          votes={movieCandidates[0]?.votes}
        />
        <MovieSurveyCandidate
          movieTitle={movieCandidates[1]?.movieTitle}
          votes={movieCandidates[1]?.votes}
        />

        <MovieSurveyCandidate
          movieTitle={movieCandidates[2]?.movieTitle}
          votes={movieCandidates[2]?.votes}
        />
      </div>
    </div>
  );
}

export default MovieSurveyResults;
