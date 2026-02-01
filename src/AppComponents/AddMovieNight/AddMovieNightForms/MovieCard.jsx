import React, { useState } from "react";

import "./MovieCard.css";
import { Button } from "primereact/button";
import MoviePreview from "../../MoviePreview/MoviePreview";

function MovieCard({
  apiOrigin,
  imgAddress,
  title,
  id,
  isClickedFoundMovie,
  isClickedMovieCandidate,
  candidateKey,
  loaderKey,
  searcherKey,
  onCardClick,
}) {
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  function handlePreviewClick() {
    console.log("Clicked");
    setIsPreviewActive(true);
  }

  function render_film_tape_blocks() {
    return (
      <div className="tape-block-column">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`tape-block ${isClickedFoundMovie ? "selected" : ""}`}
          ></div>
        ))}
      </div>
    );
  }

  function render_empty_candidate(key) {
    return (
      <div className="empty-candidate-record fade-in">Kandydat {key + 1}</div>
    );
  }

  function render_movie_data(imgAddress, title) {
    if (!title) return null;
    // Due to the date of production is a part of fetched title, we have to separate it from original movie title
    const parts = title.split(" (");
    const movieTitle = parts[0];
    const yearOfProduction = parts[1] ? parts[1] : "";

    return (
      <>
        <div className="movie-card-cover-column fade-in">
          <img
            src={imgAddress}
            alt={`${title} - cover mini`}
          />
        </div>
        <div className="movie-card-title-and-button fade-in">
          <p className="movie-card-title fade-in">
            {movieTitle.length > 17
              ? `${movieTitle.slice(0, 13)}... (${yearOfProduction}`
              : title}
          </p>
          <Button
            className="movie-card-preview-btn fade-in"
            onClick={(e) => {
              e.stopPropagation();
              handlePreviewClick();
            }}
          >
            Podgląd
          </Button>
        </div>
      </>
    );
  }

  function render_loading(key) {
    if (key === "loaderPicture")
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif"
          alt="loader-picture"
          className="loading-picture fade-in"
        />
      );
    else if (key === "descriptionTop")
      return (
        <p
          className="fade-in"
          style={{
            fontFamily: "Antonio",
            color: "white",
            fontSize: "25px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "30%",
          }}
        >
          Poczekaj...
        </p>
      );
    else
      return (
        <p
          className="fade-in"
          style={{
            fontFamily: "Antonio",
            color: "white",
            fontSize: "20px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "5%",
          }}
        >
          Trwa przeszukiwanie bazy filmów.
        </p>
      );
  }

  function render_search(key) {
    if (key === "firstFrame")
      return <p className="searcher-frame fade-in">Wpisz conajmniej</p>;
    else if (key === "secondFrame")
      return (
        <p
          className="searcher-frame fade-in"
          style={{ fontSize: "35px", marginLeft: "30%" }}
        >
          4 znaki
        </p>
      );
    else
      return (
        <p className="searcher-frame fade-in" style={{ marginLeft: "10%" }}>
          i zacznij poszukiwania
        </p>
      );
  }

  return (
    <>
      <div className="movie-frame-look">
        {render_film_tape_blocks()}
        <div
          className="movie-card"
          onClick={onCardClick}
          style={{
            backgroundColor: isClickedFoundMovie
              ? "black"
              : isClickedMovieCandidate
                ? "grey"
                : "",
          }}
        >
          {!imgAddress && !title && !loaderKey && !searcherKey
            ? render_empty_candidate(candidateKey)
            : loaderKey
              ? render_loading(loaderKey)
              : searcherKey
                ? render_search(searcherKey)
                : render_movie_data(imgAddress, title)}
        </div>

        {render_film_tape_blocks()}
      </div>
      {/* RENDER MOVIE PREVIEW WINDOW AFTER CLICK "PODGLĄD"*/}
      {isPreviewActive && (
        <MoviePreview
          apiOrigin={apiOrigin}
          movieID={id}
          isPreviewActive={isPreviewActive}
          setIsPreviewActive={setIsPreviewActive}
        />
      )}
    </>
  );
}

export default MovieCard;
