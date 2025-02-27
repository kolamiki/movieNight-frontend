import React, { useState, useEffect, useRef } from "react";

import { Dialog } from "primereact/dialog";

import { PickList } from "primereact/picklist";

import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";

import "./AddMovieNight.css";
import Lights from "./AddMovieNightForms/Lights";
import Camera from "./AddMovieNightForms/Camera";
import Action from "./AddMovieNightForms/Action";
function AddMovieNightWindow({
  apiOrigin,
  isAddMovieNightActive,
  setIsMovieNightActive,
}) {
  const stepperRef = useRef(null);

  const [locationsList, setLocationsList] = useState([]);

  useEffect(function () {
    async function get_locations() {
      fetch(`${apiOrigin}/getLocations/`)
        .then((response) => response.json())
        .then((data) => setLocationsList(data));
    }

    get_locations();
  }, []);

  return (
    <Dialog
      visible={isAddMovieNightActive}
      onHide={() => {
        if (!isAddMovieNightActive) return;
        setIsMovieNightActive(false);
      }}
      style={{
        fontFamily: "Antonio",
        width: "800px",
        height: "800px",
        background: "#222222",
      }}
    >
      <Stepper
        ref={stepperRef}
        style={{ flexBasis: "50rem", background: "#222222" }}
      >
        <StepperPanel header="Światła" style={{ fontFamily: "Antonio" }}>
          {/* <div className="flex flex-column h-12rem"> */}
          {/* <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"> */}
          <Lights apiOrigin={apiOrigin} locationsList={locationsList} />
          {/* </div> */}
          {/* </div> */}
          <div className="flex pt-4 justify-content-end">
            <Button
              className="next-button"
              label="Dalej"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Kamera">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <Camera />
            </div>
          </div>
          <div className="flex pt-4 justify-content-between">
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
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Akcja">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <Action />
            </div>
          </div>
          <div className="flex pt-4 justify-content-between">
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

              onClick={() => stepperRef.current.prevCallback()}
            />
          </div>
        </StepperPanel>
      </Stepper>
    </Dialog>
  );
}

export default AddMovieNightWindow;
