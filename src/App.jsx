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
import { AuthProvider } from "./contexts/AuthContext";
import Register from "./AppComponents/Authentication/Register";
import axios from "axios";
import { Toast } from "primereact/toast";
import FilmStripNavigator from "./AppComponents/Navigation/FilmStripNavigator";

function App({ apiOrigin }) {
  const movieNightRef = useRef(null);

  const [loginActive, setLoginActive] = useState(false);
  const [registerActive, setRegisterActive] = useState(false);
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
    return data;
  }

  useEffect(function () {
    const fetchMovieNights = async () => {
      const fetchedMovieNightsList = await get_movieNights_list();
      setMovieNightsList(fetchedMovieNightsList.reverse());
      console.log("fetchedMovieNightsList", fetchedMovieNightsList);
    };

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

  // Toast reference
  const toast = useRef(null);

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  return (
    <AuthProvider showToast={showToast}>
      <Toast ref={toast} position="top-right" className="custom-toast" />
      <div className="gradient-background">
        <Header
          apiOrigin={apiOrigin}
          loginActive={loginActive}
          setLoginActive={setLoginActive}
          registerActive={registerActive}
          setRegisterActive={setRegisterActive}
          addBookedDaysActive={addBookedDaysActive}
          setAddBookedDaysActive={setAddBookedDaysActive}
          addMovieNightActive={isAddMovieNightActive}
          setMovieNightActive={setIsMovieNightActive}
          isUserLogged={isUserLogged}
          setIsUserLogged={setIsUserLogged}
          setLoggedUser={setLoggedUser}
        />

        <Register
          registerActive={registerActive}
          setRegisterActive={setRegisterActive}
        />


        {/* <div className="content"> */}
        <Login
          apiOrigin={apiOrigin}
          loginActive={loginActive}
          setLoginActive={setLoginActive}
          setIsUserLogged={setIsUserLogged}
          setLoggedUser={setLoggedUser}
          setRegisterActive={setRegisterActive}
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
    </AuthProvider>
  );
}

export default App;
