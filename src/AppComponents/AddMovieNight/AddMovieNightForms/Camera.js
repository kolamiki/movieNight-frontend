import React, { useEffect, useState } from "react";

import { PickList } from "primereact/picklist";

import "./Camera.css";
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

  // Searched and Picked Movies Lists

  const [fetchedMovies, setFetchedMovie] = useState([]);
  const [pickedMovies, setPickedMovies] = useState(["", "", ""]);

  function onChange(event) {
    setFetchedMovie(event.source);
    setPickedMovies(event.target);
  }

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
      console.log("movie", movie);
      return (
        <SearchedMovieCard
          key={movie.id}
          imgAddress={movie.cover}
          title={movie.previewTitle}
          id={movie.id}
        />
      );
    });

    {
      /* <SearchedMovieCard />
        <SearchedMovieCard />
        <SearchedMovieCard /> */
    }

    // </div>
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
          return movie.length === 0 ? render_empty_candidate(key) : "";
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

  return (
    <div class="formgrid grid">
      <div class="field col">
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
      <div class="field col">
        <p className="search-movie-candidates">Kandydaci</p>
        {render_candidates_column()}
      </div>
      {/* <PickList dataKey="id" source={fetchedMovies} /> */}
    </div>
  );
}

export default Camera;

function SearchedMovieCard({ imgAddress, title, id }) {
  return (
    <div className="movie-card">
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
  );
}
