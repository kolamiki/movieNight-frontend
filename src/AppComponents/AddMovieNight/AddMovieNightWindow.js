import React, { useState, useEffect, useRef } from "react";

import { Dialog } from "primereact/dialog";

import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";

import "./AddMovieNight.css";
import Lights from "./AddMovieNightForms/Lights";
import Camera from "./AddMovieNightForms/Camera";
import Action from "./AddMovieNightForms/Action";
import { useAddMovieNight } from "../../contexts/AddMovieNightContext";
import { segregate_movieNight_data } from "../../utils/saveRecordsInDB";
import getCSRFToken from "../get_token";
import axios from "axios";

function AddMovieNightWindow({
  apiOrigin,
  loggedUser,
  isAddMovieNightActive,
  setIsMovieNightActive,
}) {
  const stepperRef = useRef(null);

  const { description, title, location, date, pickedMovies } =
    useAddMovieNight();

  const [locationsList, setLocationsList] = useState([]);

  //!!! DODAĆ EKRAN ŁADOWANIA PRZY ZAPISYWANIU WIECZORKU DO BAZY

  async function add_movie_night_to_db() {
    // This function gets all provided data to create movie night and store them in the object, which will be send in proper request

    // First, let's segre
    const movieNightData = segregate_movieNight_data(
      loggedUser,
      title,
      description,
      location,
      date,
      pickedMovies
    );

    console.log("MovieNight data", movieNightData);

    // Now use segregated data to save them in the database and create new MovieNight record

    const csrfToken = getCSRFToken();
    try {
      await axios.post(
        `${apiOrigin}/addMovieNight/`,

        movieNightData,
        { headers: { "X-CSRFToken": csrfToken } }
      );
    } catch (err) {
      console.error("Error during saving", err);
    }
  }

  function check_if_lights_fulfilled() {
    // This function checks if user can go to the Camera form

    if (description.length < 490 && title && location && date) return true;

    return false;
  }

  function check_if_camera_fulfilled() {
    // This function checks if user can go to the Action form

    for (let i = 0; i < pickedMovies.length; i++) {
      if (typeof pickedMovies[i] === "string") {
        return false;
      }
      // console.log(typeof pickedMovies[i]);
    }
    return true;
  }

  useEffect(
    function () {
      async function get_locations() {
        // Function to fetch available locations from the database

        fetch(`${apiOrigin}/getLocations/`)
          .then((response) => response.json())
          .then((data) => setLocationsList(data));
      }

      get_locations();
    },
    [apiOrigin]
  );

  return (
    <Dialog
      visible={isAddMovieNightActive}
      onHide={() => {
        if (!isAddMovieNightActive) return;
        setIsMovieNightActive(false);
      }}
      style={{
        fontFamily: "Antonio",
        width: "840px",
        height: "820px",
        background: "#222222",
      }}
      draggable={false}
    >
      <Stepper
        ref={stepperRef}
        style={{ flexBasis: "50rem", background: "#222222" }}
      >
        <StepperPanel header="Światła" style={{ fontFamily: "Antonio" }}>
          <Lights apiOrigin={apiOrigin} locationsList={locationsList} />

          <div
            className="flex pt-0 justify-content-end"
            style={{ marginTop: "58px" }}
          >
            <Button
              className="next-button"
              label="Dalej"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => stepperRef.current.nextCallback()}
              disabled={
                description.length > 490 || !check_if_lights_fulfilled()
              }
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Kamera">
          <div className="flex flex-column h-12rem">
            {/* <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"> */}
            <Camera apiOrigin={apiOrigin} />
            {/* </div> */}
          </div>
          <div className="button-positions">
            <Button
              label="Wróć"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            />
            <Button
              label="Dalej"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => stepperRef.current.nextCallback()}
              disabled={!check_if_camera_fulfilled()}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Akcja">
          <div className="flex flex-column h-12rem">
            {/* <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"> */}
            <Action apiOrigin={apiOrigin} />
            {/* </div> */}
          </div>
          <div className="button-positions">
            <Button
              label="Wróć"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            />
            <Button
              label="Utwórz"
              style={{
                borderColor: "white",
                border: "2px solid",
                background: "white",
                color: "black",
              }}
              //   severity="secondary"
              //   icon="pi pi-arrow-left"

              onClick={() => add_movie_night_to_db()}
            />
          </div>
        </StepperPanel>
      </Stepper>
    </Dialog>
  );
}

export default AddMovieNightWindow;
