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

  function handleOnSelectMovie(id) {
    // console.log("clickedId", id);
    if (id === selectedMovieFromList) {
      setSelectedMovieFromList(null);
    } else {
      setSelectedMovieFromList(id);
    }
  }

  function handleOnAddMovieCandidate(event) {}

  function handleOnRemoveMovieCandidate(event) {}

  function render_search_column() {
    if (fetchingStatus.waiting) {
      return (
        <p style={{ fontFamily: "Antonio", color: "black" }}>
          Wpisz conajmniej 4 znaki, aby zacząć szukanie
        </p>
      );
    } else if (fetchingStatus.pending) {
      return (
        <>
          <ProgressSpinner />
          <p>Czekaj... Trwa przeszukiwanie bazy filmów</p>
        </>
      );
    } else if (fetchingStatus.fetched) {
      return render_found_results();
    }
  }

  function render_found_results() {
    return fetchedMovies.map((movie) => {
      console.log("movie id", movie.id);
      return (
        <div
          onClick={() => {
            // console.log(movie.id);
            handleOnSelectMovie(movie.id);
          }}
        >
          <SearchedMovieCard
            key={movie.id}
            imgAddress={movie.cover}
            title={movie.previewTitle}
            id={movie.id}
            isClicked={movie.id === selectedMovieFromList ? true : false}
          />
        </div>
      );
    });
  }

  function render_empty_candidate(key) {
    // This function renders the field with
    return <div className="empty-candidate-record">Kandydat {key + 1}</div>;
  }

  function render_candidates_column() {
    // This function renders the column with selected movie candidates.
    // If user didn't select the movie candidate, the field with doted line and "Kandydat" with number will be render
    return (
      <div className="candidates-column">
        {" "}
        {pickedMovies.map((movie, key) => {
          return movie === "" ? render_empty_candidate(key) : "";
        })}
        ;
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

  useEffect(function () {}, [selectedMovieFromList]);
  return (
    <div class="formgrid grid">
      <div class="field col col-6">
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
      <div class="field col-1" className="middle-column">
        <Button className="add-button">&#62;</Button>
        <Button className="remove-button">&lt;</Button>
      </div>
      <div class="field col-5" style={{ width: "40%" }}>
        <p className="search-movie-candidates">Kandydaci</p>
        {render_candidates_column()}
      </div>
      {/* <PickList dataKey="id" source={fetchedMovies} /> */}
    </div>
  );
}

export default Camera;

function SearchedMovieCard({ imgAddress, title, id, isClicked }) {
  // const [isClicked, setIsClicked] = useState(false);

  // function handleOnClick(event) {
  //   // Change Clicked status to true

  //   setIsClicked((currentStatus) => !currentStatus);
  // }

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

  return (
    <div class="animate__animated animate__slideInDown">
      <div className="movie-frame-look">
        {render_film_tape_blocks()}
        <div
          className="movie-card"
          // onClick={() => handleOnClick()}
          style={{ backgroundColor: isClicked ? "black" : "" }}
        >
          <div className="movie-card-cover-column">
            <img src={imgAddress} alt={`${title} - cover mini`} />
          </div>
          <div className="movie-card-title-and-button">
            <p className="movie-card-title">{title}</p>
            <Button
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
        </div>
        {render_film_tape_blocks()}
      </div>
    </div>
  );
}
