import React from "react";

//** IMPORT STYLES */
import "./MovieNightDate.css";
function MovieNightDate({ children }) {
  // console.log("Children", children);
  const months = {
    1: "Styczeń",
    2: "Luty",
    3: "Marzec",
    4: "Kwiecień",
    5: "Maj",
    6: "Czerwiec",
    7: "Lipiec",
    8: "Sierpień",
    9: "Wrzesień",
    10: "Październik",
    11: "Listopad",
    12: "Grudzień",
  };

  // const getMonthNameLengths = (monthsObj) => {
  //   return Object.entries(monthsObj).map(([key, name]) => ({
  //     month: key,
  //     name: name,
  //     length: name.length,
  //   }));
  // };
  // console.log(getMonthNameLengths(months));

  function render_day(dateString) {
    const day = dateString.split("-")[2];
    return <div className="date-day">{day}</div>;
  }

  function render_month(dateString) {
    // Use split method to get number of the mont
    const month = dateString.split("-")[1];
    // Due to the months numbers starts from 0, check length of the month number and get rid off first 0
    const structuredMonthNumber = month.length > 1 ? month[1] : month;
    console.log("Month", structuredMonthNumber);
    // And use component's months object to translate number to month name
    return (
      <div
        className="date-month"
        style={{
          fontSize: months[structuredMonthNumber].length > 8 ? "28px" : "32px",
        }}
      >
        {months[structuredMonthNumber].toLocaleUpperCase()}
      </div>
    );
  }
  return (
    <div className="date-position">
      {typeof children !== "undefined" ? (
        <>
          {render_day(children)}
          {render_month(children)}{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default MovieNightDate;
