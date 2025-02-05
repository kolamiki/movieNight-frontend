import logo from "./logo.svg";
import "./App.css";
import CalendarWithRanges from "./AppComponents/Calendar/CalendarWithRanges";

import TestComp from "./AppComponents/test";
import Header from "./AppComponents/UI_Components/Header";
import MovieNight from "./AppComponents/MovieNight/MovieNight";
function App({ apiOrigin }) {
  return (
    <div className="gradient-background">
      <Header apiOrigin={apiOrigin} />
      <MovieNight apiOrigin={apiOrigin} />
      {/* <CalendarWithRanges /> */}
    </div>
  );
}

export default App;
