import React, { useEffect, useState } from "react";
import "animate.css";

import { Card } from "primereact/card";

// import "./index.css";

import "./Header.css";

function Header({
  apiOrigin,
  loginActive,
  setLoginActive,
  addBookedDaysActive,
  setAddBookedDaysActive,
  addMovieNightActive,
  setMovieNightActive,
}) {
  const [isUserLogged, setIsUserLogged] = useState(false);

  //!! ZMIENIĆ IKONĘ "ZALOGUJ SIĘ"  NA NAZWĘ UŻYTKOWNIKA W ZALEŻNOŚCI OD OBECNOŚCI W LOCAL STORAGE USERNAME
  //! Dokończyć funkcję w useEffect do sprawdzania, czy użytkownik jest zalogowany - pobierz z localstorage informacje o username i tokenach

  useEffect(function () {}, []);

  return (
    <Card className="header-style">
      <div className="header-components-style">
        <WieczorekLogo />
        <AddWieczorek setMovieNightActive={setMovieNightActive} />
        <AvailableDays setAddBookedDaysActive={setAddBookedDaysActive} />
        <LogIn setLoginActive={setLoginActive} />
      </div>
    </Card>
  );
}

export default Header;

function WieczorekLogo() {
  return (
    <img
      className="wieczorek-logo-style"
      src=".\Header_Icons\Wieczorek_Filmowy_Logo_v1.png"
      alt="Wieczorek Logo"
    />
  );
}

function ImageWithTextButton({ imageSource, altText, text }) {
  return (
    <div className="image-with-text-button">
      <img src={imageSource} alt={altText} className="header-button-image" />
      <span className="header-button-text">{text}</span>
    </div>
  );
}

function AddWieczorek({ setMovieNightActive }) {
  return (
    <div
      className="image-with-text-button"
      onClick={() => setMovieNightActive(true)}
    >
      <img
        src=".\Header_Icons\Klaps_Logo_v1.png"
        alt="Dodaj Wieczorek Logo"
        className="header-button-image"
      />
      <p className="header-button-text">
        Dodaj <br />
        wieczorek
      </p>
    </div>
  );
}

function AvailableDays({ setAddBookedDaysActive }) {
  return (
    <div
      className="image-with-text-button"
      onClick={() => setAddBookedDaysActive(true)}
    >
      <img
        className="header-button-image"
        src=".\Header_Icons\Book_Logo_v1.png"
        alt="Book Available Days Logo"
      />
      <p className="header-button-text">
        Zaznacz <br /> Wolne
      </p>
    </div>
  );
}

function LogIn({ setLoginActive }) {
  return (
    <div className="login-button" onClick={() => setLoginActive(true)}>
      <img
        className="header-button-image"
        src=".\Header_Icons\LogIn_Logo_v1.png"
        alt="Log In Logo"
      />
      <p className="header-button-text">Zaloguj się</p>
    </div>
  );
}
