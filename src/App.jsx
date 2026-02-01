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
import FilmStripNavigator from "./AppComponents/Navigation/FilmStripNavigator";
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
    fetchMovieNights();
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUsername && storedToken) {
      setLoggedUser(storedUsername);
      setIsUserLogged(true);
    }
  }, []);



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
        {movieNightsList.length > 0 && (
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

        {/* FILM STRIP NAVIGATION */}
        {movieNightsList.length > 0 && (
          <FilmStripNavigator
            movieNights={movieNightsList}
            currentIndex={currentMovieNightIndex}
            onSelectMovieNight={setCurrentMovieNightIndex}
          />
        )}

        {/* <PreviousMovieNights /> */}
        {/* <CalendarWithRanges /> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
