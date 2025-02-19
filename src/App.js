import "animate.css";
import "./App.css";
import CalendarWithRanges from "./AppComponents/Calendar/CalendarWithRanges";

import TestComp from "./AppComponents/test";
import Header from "./AppComponents/UI_Components/Header";
import MovieNight from "./AppComponents/MovieNight/MovieNight";
import PreviousMovieNights from "./AppComponents/PrevoiusMovieNight/PreviousMovieNights";
import { useEffect, useState } from "react";
import Login from "./AppComponents/UserProfile/Login";
function App({ apiOrigin }) {
  const [loginActive, setLoginActive] = useState(false);
  const [addBookedDaysActive, setAddBookedDaysActive] = useState(false);
  const [addMovieNightActive, setMovieNightActive] = useState(false);

  return (
    <>
      <div className="gradient-background"></div>
      <Header
        apiOrigin={apiOrigin}
        loginActive={loginActive}
        setLoginActive={setLoginActive}
        addBookedDaysActive={addBookedDaysActive}
        setAddBookedDaysActive={setAddBookedDaysActive}
        addMovieNightActive={addMovieNightActive}
        setMovieNightActive={setMovieNightActive}
      />
      {/* <div className="content"> */}
      <Login
        apiOrigin={apiOrigin}
        loginActive={loginActive}
        setLoginActive={setLoginActive}
      />
      <MovieNight apiOrigin={apiOrigin} />
      {/* <PreviousMovieNights /> */}
      {/* <CalendarWithRanges /> */}
      {/* </div> */}
    </>
  );
}

export default App;
