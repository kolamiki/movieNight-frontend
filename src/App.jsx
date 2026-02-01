import "animate.css";
import "./App.css";
import CalendarWithRanges from "./AppComponents/Calendar/CalendarWithRanges";

import TestComp from "./AppComponents/test";
import Header from "./AppComponents/UI_Components/Header";
import MovieNight from "./AppComponents/MovieNight/MovieNight";
import PreviousMovieNights from "./AppComponents/PrevoiusMovieNight/PreviousMovieNights";
import { useEffect, useRef, useState } from "react";
import Login from "./AppComponents/UserProfile/Login";
import AddMovieNightWindow from "./AppComponents/AddMovieNight/AddMovieNightWindow";
import { AddMovieNightProvider } from "./contexts/AddMovieNightContext";
import axios from "axios";
function App({ apiOrigin }) {
  const movieNightRef = useRef(null);

  const [loginActive, setLoginActive] = useState(false);
  const [addBookedDaysActive, setAddBookedDaysActive] = useState(false);
  const [isAddMovieNightActive, setIsMovieNightActive] = useState(false);

  const [loggedUser, setLoggedUser] = useState(null);

  // Login states
  const [isUserLogged, setIsUserLogged] = useState(false);

  // List of current Movie Nights
  const [movieNightsList, setMovieNightsList] = useState([]);

  const [currentMovieNightIndex, setCurrentMovieNightIndex] = useState(0);

  async function get_movieNights_list() {
    const response = await fetch(`${apiOrigin}/showMovieNights/`);
    const data = await response.json();
    // console.log("List of Movie Nights", data);
    return data;
  }

  // fetch(`${apiOrigin}api/showMovieNights/`).then((response) =>
  //   response.json()
  // );

  useEffect(function () {
    const fetchMovieNights = async () => {
      const fetchedMovieNightsList = await get_movieNights_list();
      setMovieNightsList(fetchedMovieNightsList.reverse());
      console.log("fetchedMovieNightsList", fetchedMovieNightsList);
    };

    fetchMovieNights();
  }, []);

  useEffect(() => {
    if (movieNightsList.length === 0) return;

    const handleScroll = (event) => {
      //   setCurrentMovieNightIndex((previousMovieNightIndex) => {
      //     if (
      //       previousMovieNightIndex < movieNightsList?.length &&
      //       previousMovieNightIndex >= 0
      //     ) {
      //       // Create new index value.
      //       const newVal = previousMovieNightIndex + event.deltaY * 0.01;
      //       // Check if previous index is the last one
      //       if (previousMovieNightIndex + 1 === movieNightsList?.length) {
      //         // If it is, check if new index is smaller from the previous one
      //         if (newVal < previousMovieNightIndex) return newVal;
      //         return previousMovieNightIndex;
      //       } else if (previousMovieNightIndex === 0) {
      //         if (newVal > previousMovieNightIndex) return newVal;
      //         else {
      //           return previousMovieNightIndex;
      //         }
      //       } else return newVal;
      //       // If it is, check if newValue is
      //     } else return previousMovieNightIndex;
      //   });
      // };

      setCurrentMovieNightIndex((prevIndex) => {
        // Create new index
        const newIndex = prevIndex + event.deltaY * 0.01;
        // Add max boundary index, which is length of all Movie Nights in the database
        const maxIndex = movieNightsList.length - 1;

        //
        return Math.max(0, Math.min(newIndex, maxIndex));
      });
    };

    // Allow change Movie Nights by scroll only when user scrolls in "movie-night" window
    document
      .getElementById("movie-night")
      .addEventListener("wheel", handleScroll);

    // Clean up
    return () => {
      document
        .getElementById("movie-night")
        .removeEventListener("wheel", handleScroll);
    };
  }, [movieNightsList]);

  return (
    <>
      <div className="gradient-background">
        <Header
          apiOrigin={apiOrigin}
          loginActive={loginActive}
          setLoginActive={setLoginActive}
          addBookedDaysActive={addBookedDaysActive}
          setAddBookedDaysActive={setAddBookedDaysActive}
          addMovieNightActive={isAddMovieNightActive}
          setMovieNightActive={setIsMovieNightActive}
          isUserLogged={isUserLogged}
          setIsUserLogged={setIsUserLogged}
          setLoggedUser={setLoggedUser}
        />
        {/* <div className="content"> */}
        <Login
          apiOrigin={apiOrigin}
          loginActive={loginActive}
          setLoginActive={setLoginActive}
          setIsUserLogged={setIsUserLogged}
          setLoggedUser={setLoggedUser}
        />
        {movieNightsList.length > 1 && (
          <MovieNight
            apiOrigin={apiOrigin}
            loggedUser={loggedUser}
            isUserLogged={isUserLogged}
            movieNightId={movieNightsList?.[currentMovieNightIndex]?.pk}
            currentMovieNightIndex={currentMovieNightIndex}
          />
        )}
        <AddMovieNightProvider>
          <AddMovieNightWindow
            apiOrigin={apiOrigin}
            loggedUser={loggedUser}
            isAddMovieNightActive={isAddMovieNightActive}
            setIsMovieNightActive={setIsMovieNightActive}
          />
        </AddMovieNightProvider>
        {/* <PreviousMovieNights /> */}
        {/* <CalendarWithRanges /> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
