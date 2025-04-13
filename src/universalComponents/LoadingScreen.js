import React, { useEffect, useState } from "react";

import { Dialog } from "primereact/dialog";

import "./LoadingScreen.css";

function LoadingScreen() {
  const [isLoadingActive, setIsLoadingActive] = useState(true);

  return (
    <Dialog
      className="loading-screen-style"
      draggable={false}
      visible={isLoadingActive}
      onHide={() => {
        if (!isLoadingActive) return;
        setIsLoadingActive(false);
      }}
      closable={false}
    >
      <div className="loading-screen-content">
        <h1>Trwa zapisywanie Wieczorku...</h1>
        <img
          className="loading-screen-countdown"
          src="https://media0.giphy.com/media/2XflxzDAw5pn6WaA372/200w.gif?cid=6c09b952ua5kyowvsnacgk06msptmmqcp9aiv2j478i9nwhn&ep=v1_gifs_search&rid=200w.gif&ct=g"
          alt="saving-movieNight-count-down"
        />
        {/* <p>A przy okazji... </p> */}
      </div>
    </Dialog>
  );
}

export default LoadingScreen;
