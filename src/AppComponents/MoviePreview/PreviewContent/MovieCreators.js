import React from "react";

import "./MovieCreators.css";

function MovieCreators({
  movieDirector,
  movieWriter,
  movieCinematographer,
  cast,
}) {
  function render_creator_and_title(title, creator) {
    // This function gets the
    const lineLength = 40;
    const separator = "-";
    const amountOfSeparators = lineLength - title.length - separator.length;

    return (
      title +
      separator +
      (amountOfSeparators > 0 ? separator.repeat(amountOfSeparators) : "") +
      creator
    );
  }

  function render_cast(cast) {
    // This function shows first 7th cast members segregated in two rows

    // In the first step, the function stored actors in the list, and gets first seven ones.
    const castList = cast.split(", ").slice(0, 7);

    //! Dodać podział na dwa rzędy po 4 kolumny, z czego ostatnia komórka zawiera wartość "i inni"
    return castList;
  }

  return (
    <div className="creators-column">
      <p>{render_creator_and_title("Reżyseria", movieDirector)}</p>
      <p>{render_creator_and_title("Scenariusz", movieWriter)}</p>
      <p>{render_creator_and_title("Zdjęcia", movieCinematographer)}</p>
      <p>Występują</p>
      <p>{render_cast(cast)}</p>
    </div>
  );
}

export default MovieCreators;
