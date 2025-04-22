import React from "react";

import "./MovieCreators.css";
import StreamingAvailability from "./StreamingAvailability";

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

  function render_cast_separator(header) {
    // This function generates the
    const separatorSign = "- ";

    let separatorLine = [];
    for (let i = 0; i < header.length; i++) {
      separatorLine.push(separatorSign);
    }
    return separatorLine;
  }

  function prepare_castList(cast) {
    // This function extracts the first 5th cast members and adds the additional "i inni".

    // Let's create castList variable to store first five  actors from the list
    let castList;

    // In the first step, let's check type of the cast - it can be stored as a list or a long string
    if (Array.isArray(cast)) {
      // If it's a list - let's get first five actors from the list
      castList = cast.slice(0, 5);
    } else {
      // In the first step, the function stored actors in the list, and gets first five ones.
      castList = cast.split(", ").slice(0, 5);
    }

    // Add the last record to the list
    castList.push("i inni");

    return castList;
  }

  function render_cast(cast) {
    // This function shows first 5th cast members segregated in two rows
    const preparedCastList = prepare_castList(cast);

    // Add rows amount
    const rows = [0, 1];

    return (
      <div className="cast-column">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="cast-row">
            {Array.from({ length: 3 }).map((_, index) => {
              const castIndex = row * 3 + index;
              return <p key={castIndex}>{preparedCastList[castIndex]}</p>;
            })}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="creators-column">
      <p>{render_creator_and_title("Reżyseria", movieDirector)}</p>
      <p>{render_creator_and_title("Scenariusz", movieWriter)}</p>
      <p>{render_creator_and_title("Zdjęcia", movieCinematographer)}</p>
      <div className="cast-header">
        {/* <p>Występują</p> */}
        <div style={{ marginTop: "25px" }}>
          {render_cast_separator("Występują")}
        </div>
      </div>
      <p>{render_cast(cast)}</p>
      <div className="cast-header">{render_cast_separator("Występują")}</div>
    </div>
  );
}

export default MovieCreators;
