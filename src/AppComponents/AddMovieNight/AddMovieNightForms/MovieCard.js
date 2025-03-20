import React from "react";

import "./MovieCard.css";
import { Button } from "primereact/button";

function MovieCard({
  imgAddress,
  title,
  id,
  isClickedFoundMovie,
  isClickedMovieCandidate,
  candidateKey,
  loaderKey,
  searcherKey,
}) {
  function render_film_tape_blocks() {
    return (
      <div className="tape-block-column">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="tape-block"
            style={{
              backgroundColor: isClickedFoundMovie
                ? "black"
                : "rgb(34, 34, 34)",
              border: isClickedFoundMovie ? "1px solid" : "",
              borderColor: isClickedFoundMovie ? "black" : "",
            }}
          ></div>
        ))}
      </div>
    );
  }

  function render_empty_candidate(key) {
    // This function renders the field with
    return (
      <div className="empty-candidate-record fade-in">Kandydat {key + 1}</div>
    );
  }

  function render_movie_data(imgAddress, title) {
    // Due to the date of production is a part of fetched title, we have to separate it from original movie title
    const movieTitle = title.split(" (")[0];
    const yearOfProduction = title.split(" (")[1];
    return (
      <>
        <div
          className="movie-card-cover-column fade-in"
          // class="animate__animated animate__fadeIn"
        >
          <img
            src={imgAddress}
            alt={`${title} - cover mini`}
            // style={{ height: "100%" }}
          />
        </div>
        <div
          className="movie-card-title-and-button fade-in"
          // class="animate__animated animate__fadeIn"
        >
          <p
            className="movie-card-title fade-in"
            style={{
              display: "flex",
              position: "relative",
              // width: "100%",
            }}
          >
            {movieTitle.length > 17
              ? `${movieTitle.slice(0, 13)}... (${yearOfProduction}`
              : title}
          </p>
          <Button
            className="fade-in"
            style={{
              color: "black",
              backgroundColor: "white",
              fontSize: "15px",
              // marginTop: "2px",
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
        // <div class="animate__animated animate__fadeIn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif"
          alt="loader-picture"
          className="loading-picture fade-in"
        />
        // </div>
      );
    //https://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif
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
    // <div class="animate__animated animate__fadeIn">
    <div className="movie-frame-look">
      {render_film_tape_blocks()}
      <div
        className="movie-card"
        // onClick={() => handleOnClick()}
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
    // </div>
  );
}

export default MovieCard;
