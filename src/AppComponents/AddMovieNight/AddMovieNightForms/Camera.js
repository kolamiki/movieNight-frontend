import React, { useEffect, useState } from "react";

import { PickList } from "primereact/picklist";

import "./Camera.css";

import "animate.css";

import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";

import { useAddMovieNight } from "../../../contexts/AddMovieNightContext";
import MovieCard from "./MovieCard";

function Camera({ apiOrigin }) {
  // Provided phrases by the user

  // Get states based on the provider
  const {
    searchedMovieTitle,
    setSearchedMovieTitle,
    fetchedMovies,
    setFetchedMovie,
    pickedMovies,
    setPickedMovies,
  } = useAddMovieNight();

  const [fetchingStatus, setFetchingStatus] = useState({
    fetched: false,
    pending: false,
    waiting: true,
  });

  // Selected movie states
  const [selectedMovieFromList, setSelectedMovieFromList] = useState(null);
  const [selectedMovieFromCandidatesList, setSelectedMovieFromCandidatesList] =
    useState(null);

  function handleOnSelectMovie(selectedMovieData) {
    // console.log("clickedId", id);
    if (selectedMovieData === selectedMovieFromList) {
      setSelectedMovieFromList(null);
    } else {
      setSelectedMovieFromList(selectedMovieData);
    }
  }

  function handleOnSelectCandidate(selectedMovieCandidateData) {
    if (selectedMovieCandidateData === selectedMovieFromCandidatesList) {
      setSelectedMovieFromCandidatesList(null);
    } else {
      setSelectedMovieFromCandidatesList(selectedMovieCandidateData);
    }
  }

  function handleOnAddMovieCandidate() {
    if (pickedMovies.includes(selectedMovieFromList)) {
      alert("Ten film jest już na liście!");
      return;
    }

    // Find fist free record in the list
    const emptyIndex = pickedMovies.findIndex((movie) => movie === "");

    if (emptyIndex !== -1) {
      // Update only first free slot
      setPickedMovies((currentPickedMovies) => {
        let newPickedMovies = [...currentPickedMovies];
        newPickedMovies[emptyIndex] = selectedMovieFromList;
        return newPickedMovies;
      });
      // Unclick selected movie
      setSelectedMovieFromList(null);
    } else {
      alert("Brak miejsca na dodanie nowego filmu.");
    }
  }

  function handleOnRemoveMovieCandidate() {
    // Find clicked movie in the pickedMovies list.

    const clickedMovieIndex = pickedMovies.findIndex(
      (movie) => movie === selectedMovieFromCandidatesList
    );

    // Assign empty record to the removed candidate
    setPickedMovies((currentList) => {
      let newPickedMoviesList = [...currentList];

      newPickedMoviesList[clickedMovieIndex] = "";

      return newPickedMoviesList;
    });
    // And unclick picked movie
    setSelectedMovieFromCandidatesList(null);
  }

  function render_search_column() {
    // This function renders the column with found movies
    if (fetchingStatus.waiting) {
      return ["firstFrame", "secondFrame", "thirdFrame"].map((key) => (
        <MovieCard searcherKey={key} />
      ));
    } else if (fetchingStatus.pending) {
      return ["loaderPicture", "descriptionTop", "descriptionBottom"].map(
        (key) => <MovieCard loaderKey={key} />
      );
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
            isClickedFoundMovie={
              movie.id === selectedMovieFromList?.id ? true : false
            }
          />
        </div>
      );
    });
  }

  function render_candidates_column() {
    // This function renders the column with selected movie candidates.
    // If user didn't select the movie candidate, the field with doted line and "Kandydat" with number will be render
    return (
      <div className="candidates-column">
        {pickedMovies.map((movie, key) => {
          return movie === "" ? (
            <MovieCard candidateKey={key} />
          ) : (
            <div
              onClick={() => {
                // console.log(key);
                handleOnSelectCandidate(movie);
              }}
            >
              <MovieCard
                title={movie.previewTitle}
                imgAddress={movie.cover}
                key={movie.id + 11}
                id={movie.id}
                isClickedMovieCandidate={
                  movie.id === selectedMovieFromCandidatesList?.id
                    ? true
                    : false
                }
              />
            </div>
          );
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

      return () => clearTimeout(timeoutId); // Clearing the timeout, based on the provided  searchedMovieTitle
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
          style={{ backgroundColor: "grey" }}
          className="remove-button"
          onClick={() => handleOnRemoveMovieCandidate()}
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
