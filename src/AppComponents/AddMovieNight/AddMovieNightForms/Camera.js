import React, { useEffect, useState } from "react";

import { PickList } from "primereact/picklist";

import "./Camera.css";

import "animate.css";

import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

function Camera({ apiOrigin }) {
  // Provided phrases by the user
  const [searchedMovieTitle, setSearchedMovieTitle] = useState("");

  const [fetchingStatus, setFetchingStatus] = useState({
    fetched: false,
    pending: false,
    waiting: true,
  });

  // Selected movie states
  const [selectedMovieFromList, setSelectedMovieFromList] = useState(null);
  const [selectedMovieFromCandidatesList, setSelectedMovieFromCandidatesList] =
    useState(null);

  // Searched and Picked Movies Lists

  const [fetchedMovies, setFetchedMovie] = useState([]);
  const [pickedMovies, setPickedMovies] = useState(["", "", ""]);

  function handleOnSelectMovie(selectedMovieData) {
    // console.log("clickedId", id);
    if (selectedMovieData === selectedMovieFromList) {
      setSelectedMovieFromList(null);
    } else {
      setSelectedMovieFromList(selectedMovieData);
    }
  }

  function handleOnAddMovieCandidate() {
    if (selectedMovieFromList) {
      //! DODAĆ DODAWANIE FILMÓW DO LISTY KANDYDATÓW
    }
  }

  function handleOnRemoveMovieCandidate(event) {}

  function render_search_column() {
    if (fetchingStatus.waiting) {
      return ["firstFrame", "secondFrame", "thirdFrame"].map((key) => (
        <MovieCard searcherKey={key} />
      ));
      // <p style={{ fontFamily: "Antonio", color: "black" }}>
      //   Wpisz conajmniej 4 znaki, aby zacząć szukanie
      // </p>
    } else if (fetchingStatus.pending) {
      return ["loaderPicture", "descriptionTop", "descriptionBottom"].map(
        (key) => <MovieCard loaderKey={key} />
      );
      // <>
      //   <ProgressSpinner />
      //   <p>Czekaj... Trwa przeszukiwanie bazy filmów</p>
      // </>
    } else if (fetchingStatus.fetched) {
      return render_found_results();
    }
  }

  function render_found_results() {
    return fetchedMovies.map((movie, key) => {
      // console.log("movie id", movie.id);
      return (
        <div
          onClick={() => {
            // console.log(key);
            handleOnSelectMovie(movie);
          }}
        >
          <MovieCard
            key={movie.id}
            imgAddress={movie.cover}
            title={movie.previewTitle}
            id={movie.id}
            isClicked={movie.id === selectedMovieFromList?.id ? true : false}
          />
        </div>
      );
    });
  }

  function render_empty_candidate(key) {
    // This function renders the field with
    return (
      <div className="empty-candidate-record fade-in">Kandydat {key + 1}</div>
    );
  }

  function render_candidates_column() {
    // This function renders the column with selected movie candidates.
    // If user didn't select the movie candidate, the field with doted line and "Kandydat" with number will be render
    return (
      <div className="candidates-column">
        {" "}
        {pickedMovies.map((movie, key) => {
          return movie === "" ? <MovieCard candidateKey={key} /> : "";
        })}
      </div>
    );
  }

  function search_movie() {
    setFetchingStatus({ fetched: false, pending: true, waiting: false });

    fetch(`${apiOrigin}/searchMovie/${searchedMovieTitle}/`)
      .then((response) => response.json())
      .then((data) => {
        setFetchedMovie(data.foundMovies.slice(0, 3));
        setFetchingStatus({
          fetched: true,
          pending: false,
          waiting: false,
        });
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania:", error);
        setFetchingStatus({
          fetched: false,
          pending: false,
          waiting: false,
        });
      });
  }

  useEffect(() => {
    if (searchedMovieTitle.length >= 4) {
      const timeoutId = setTimeout(() => {
        search_movie();
      }, 1000);

      return () => clearTimeout(timeoutId); // Czyszczenie timeouta przy zmianie searchedMovieTitle
    } else if (searchedMovieTitle.length < 4 && fetchedMovies.length > 0) {
      // Clear fetched movies list and change status to "waiting"
      setFetchedMovie([]);
      setFetchingStatus({
        fetched: false,
        pending: false,
        waiting: true,
      });
    }
  }, [searchedMovieTitle]);

  // useEffect(function () {}, [selectedMovieFromList]);
  return (
    <div className="find-movie-columns">
      <div className="searcher-column">
        <p className="search-movie-header">Znajdź film</p>

        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            id="searched-movie-title"
            placeholder="Wpisz tytuł"
            value={searchedMovieTitle}
            onChange={(e) => setSearchedMovieTitle(e.target.value)}
          />
        </IconField>
        <div className="search-results-box">{render_search_column()}</div>
      </div>
      <div className="middle-column">
        <Button
          className="add-button"
          onClick={() => handleOnAddMovieCandidate()}
          disabled={selectedMovieFromList === null}
        >
          &#62;
        </Button>
        <Button
          className="remove-button"
          disabled={selectedMovieFromCandidatesList === null}
        >
          &lt;
        </Button>
      </div>
      <div className="candidates-column">
        <p className="search-movie-candidates ">Kandydaci</p>
        <div className="candidates-box">{render_candidates_column()}</div>
      </div>
      {/* <PickList dataKey="id" source={fetchedMovies} /> */}
    </div>
  );
}

export default Camera;

function MovieCard({
  imgAddress,
  title,
  id,
  isClicked,
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
              backgroundColor: isClicked ? "black" : "rgb(34, 34, 34)",
              border: isClicked ? "1px solid" : "",
              borderColor: isClicked ? "black" : "",
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
            {title}
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
        style={{ backgroundColor: isClicked ? "black" : "" }}
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
