import "animate.css";
import "./App.css";
import CalendarWithRanges from "./AppComponents/Calendar/CalendarWithRanges";

import TestComp from "./AppComponents/test";
import Header from "./AppComponents/UI_Components/Header";
import MovieNight from "./AppComponents/MovieNight/MovieNight";
import PreviousMovieNights from "./AppComponents/PrevoiusMovieNight/PreviousMovieNights";
import { useEffect, useState } from "react";
import Login from "./AppComponents/UserProfile/Login";
import AddMovieNightWindow from "./AppComponents/AddMovieNight/AddMovieNightWindow";
function App({ apiOrigin }) {
  const [loginActive, setLoginActive] = useState(false);
  const [addBookedDaysActive, setAddBookedDaysActive] = useState(false);
  const [isAddMovieNightActive, setIsMovieNightActive] = useState(false);

  const [loggedUser, setLoggedUser] = useState(null);

  // Login states
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <>
      <div className="gradient-background"></div>
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
      <MovieNight
        apiOrigin={apiOrigin}
        loggedUser={loggedUser}
        isUserLogged={isUserLogged}
      />

      <AddMovieNightWindow
        apiOrigin={apiOrigin}
        isAddMovieNightActive={isAddMovieNightActive}
        setIsMovieNightActive={setIsMovieNightActive}
      />
      {/* <PreviousMovieNights /> */}
      {/* <CalendarWithRanges /> */}
      {/* </div> */}
    </>
  );
}

export default App;
