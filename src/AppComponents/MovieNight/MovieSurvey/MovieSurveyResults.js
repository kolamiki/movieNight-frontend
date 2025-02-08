import React, { useState, useEffect } from "react";

import "primeflex/primeflex.css";

import "./MovieSurveyResults.css";

import MovieSurveyCandidate from "./MovieSurveyCandidate";

function MovieSurveyResults({ apiOrigin, movieNightCandidatesData }) {
  const [movieCandidates, setMovieCandidates] = useState([
    { movieTitle: "Movie1", moviePosterMini: "", votes: 10 },
    { movieTitle: "Movie2", moviePosterMini: "", votes: 5 },
    { movieTitle: "Movie3", moviePosterMini: "", votes: 1 },
  ]); // use setMovieCandidates to assign fetched voting results

  // useEffect(function () {}, []);

  return (
    <div className="movie-survey-results">
      <div class="flex flex-column">
        {movieNightCandidatesData?.map((movieCandidate, index) => {
          console.log(movieCandidate);
          return (
            <MovieSurveyCandidate
              key={index}
              apiOrigin={apiOrigin}
              movieTitle={movieCandidate?.title}
              moviePosterMini={movieCandidate?.coverSmall}
              votes={movieCandidate?.votes}
            />
          );
        })}
        {/* <MovieSurveyCandidate
          movieTitle={movieNightCandidatesData[0]?.title}
          moviePosterMini={movieNightCandidatesData[0]}
          votes={movieNightCandidatesData[0]?.votes}
        />
        <MovieSurveyCandidate
          movieTitle={movieNightCandidatesData[1]?.title}
          votes={movieNightCandidatesData[1]?.votes}
        />

        <MovieSurveyCandidate
          movieTitle={movieNightCandidatesData[2]?.title}
          votes={movieNightCandidatesData[2]?.votes}
        /> */}
      </div>
    </div>
  );
}

export default MovieSurveyResults;
