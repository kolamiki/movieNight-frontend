import InfiniteScroll from "./InfiniteScroll/InfiniteScroll";

import "./PreviousMovieNights.css";

import React, { useState, useEffect } from "react";

function PreviousMovieNights() {
  const movieNights = [{ content: "Wieczorek1" }, { content: "Wieczorek2" }];

  return (
    <div className="previous-movie-night">
      <InfiniteScroll
        items={movieNights}
        isTilted={true}
        tiltDirection="left"
        autoplay={true}
        autoplaySpeed={0.1}
        autoplayDirection="down"
        pauseOnHover={true}
      />
    </div>
  );
}

export default PreviousMovieNights;
