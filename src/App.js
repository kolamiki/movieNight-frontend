import logo from "./logo.svg";
import "./App.css";
import CalendarWithRanges from "./AppComponents/Calendar/CalendarWithRanges";

import TestComp from "./AppComponents/test";
import Header from "./AppComponents/UI_Components/Header";
import MovieNight from "./AppComponents/MovieNight/MovieNight";
import PreviousMovieNights from "./AppComponents/PrevoiusMovieNight/PreviousMovieNights";
function App({ apiOrigin }) {
  return (
    <>
      <div className="gradient-background"></div>
      <Header apiOrigin={apiOrigin} />
      {/* <div className="content"> */}
      <MovieNight apiOrigin={apiOrigin} />
      <PreviousMovieNights />
      {/* <CalendarWithRanges /> */}
      {/* </div> */}
    </>
  );
}

export default App;
