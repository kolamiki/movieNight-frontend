import logo from "./logo.svg";
import "./App.css";
import CalendarWithRanges from "./AppComponents/Calendar/CalendarWithRanges";

import TestComp from "./AppComponents/test";
import Header from "./AppComponents/UI_Components/Header";
import MovieNight from "./AppComponents/MovieNight/MovieNight";
import PreviousMovieNights from "./AppComponents/PrevoiusMovieNight/PreviousMovieNights";
import { useEffect, useState } from "react";
function App({ apiOrigin }) {
  const [movieNightDetails, setMovieNightDetails] = useState(null);

  function get_movie_night_details(apiOrigin, movieNightName) {
    fetch(`${apiOrigin}/showMovieNight/${movieNightName}/`)
      .then((response) => response.json())
      .then((data) => {
        setMovieNightDetails(() => data);
      });
  }
  useEffect(function () {
    get_movie_night_details(apiOrigin, "Test");
  }, []);

  //!!!!  DODAĆ POBIERANIE GŁOSÓW NA FILM!!!!!

  return (
    <>
      <div className="gradient-background"></div>
      <Header apiOrigin={apiOrigin} />
      {/* <div className="content"> */}
      <MovieNight apiOrigin={apiOrigin} movieNightDetails={movieNightDetails} />
      <PreviousMovieNights />
      {/* <CalendarWithRanges /> */}
      {/* </div> */}
    </>
  );
}

export default App;
