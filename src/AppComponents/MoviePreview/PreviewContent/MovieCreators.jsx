import React from "react";

import "./MovieCreators.css";
import StreamingAvailability from "./StreamingAvailability";



function MovieCreators({
  movieDirector,
  movieWriter,
  movieCinematographer,
  cast,
}) {

  const CreatorRow = ({ title, name }) => (
    <div className="creator-row">
      <span className="creator-title">{title}</span>
      <span className="creator-separator"></span>
      <span className="creator-name">{Array.isArray(name) ? name.join(", ") : name}</span>
    </div>
  );

  function prepare_castList(cast) {
    if (!cast) return [];
    let castList = Array.isArray(cast) ? cast : cast.split(", ");
    return castList.slice(0, 6); // Take first 6 for example
  }

  const castList = prepare_castList(cast);

  return (
    <div className="creators-column">
      <CreatorRow title="Reżyseria" name={movieDirector} />
      <CreatorRow title="Scenariusz" name={movieWriter} />
      <CreatorRow title="Zdjęcia" name={movieCinematographer} />

      {cast && castList.length > 0 && (
        <div className="cast-section-internal">
          <h3 className="section-header">Występują</h3>
          <div className="cast-grid-internal">
            {castList.map((actor, idx) => (
              <React.Fragment key={idx}>
                <span className="cast-name-item">{actor}</span>
                {idx < castList.length - 1 && <span className="cast-separator-square">■</span>}
              </React.Fragment>
            ))}
            {castList.length < (Array.isArray(cast) ? cast.length : cast.split(", ").length) && (
              <>
                <span className="cast-separator-square">■</span>
                <span className="cast-name-item">i inni</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



export default MovieCreators;
