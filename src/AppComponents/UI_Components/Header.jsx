import React, { useEffect, useState } from "react";
import "animate.css";

import { Card } from "primereact/card";
import { Menubar } from "primereact/menubar";
import "primeicons/primeicons.css";

// import "./index.css";

import "./Header.css";
import { Button } from "primereact/button";
// import { classNames } from "primereact/utils";

function Header({
  apiOrigin,
  loginActive,
  setLoginActive,
  isUserLogged,
  setIsUserLogged,
  addBookedDaysActive,
  setAddBookedDaysActive,
  addMovieNightActive,
  setMovieNightActive,
  setLoggedUser,
}) {

  const check_if_user_is_logged = () => {
    const username = localStorage.getItem("username");

    const isLogged = username !== null;
    if (isLogged) {
      setIsUserLogged(true);
      setLoggedUser(username);
    }
  };

  // Wywołanie efektu na start i przy zmianie `isUserLogged`
  useEffect(() => {
    check_if_user_is_logged();
    console.log("Effect z isUserLogged");
  }, [isUserLogged]);

  // Wywołanie tylko raz przy załadowaniu komponentu
  useEffect(() => {
    check_if_user_is_logged();
    console.log("Effect bez isUserLogged");
  }, []);

  return (
    <Card className="header-style">
      <div className="header-components-style">
        <WieczorekLogo />
        <AddWieczorek setMovieNightActive={setMovieNightActive} />
        <AvailableDays setAddBookedDaysActive={setAddBookedDaysActive} />

        {isUserLogged ? (
          <ProfileShortcut
            username={localStorage.getItem("username")}
            setIsUserLogged={setIsUserLogged}
            setLoggedUser={setLoggedUser}
          />
        ) : (
          <LogIn setLoginActive={setLoginActive} />
        )}
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

function ProfileShortcut({ username, setIsUserLogged, setLoggedUser }) {
  const menuOptions = [
    {
      label: username,
      items: [
        {
          label: "Twój profil",
          icon: "pi pi-user",
          command: () => alert("Podgląd Profilu jest w trakcie rozbudowy."),
        },
        {
          label: "Ustawienia",
          icon: "pi pi-cog",
          command: () => alert("Ustawienia profilu są w trakcie rozbudowy."),
        },
        {
          label: "Wyloguj się",
          icon: "pi pi-sign-out",
          command: () => logout(),
        },
      ],
    },
  ];

  function logout() {
    // Remove items from local storage
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Change state isLoggedUser to false and
    setIsUserLogged(false);
    setLoggedUser(null);
  }

  return (
    <Menubar
      // style={{
      //   fontFamily: "Antonio",
      //   backgroundColor: "black",
      //   color: "white",
      // }}
      model={menuOptions}
    />
  );
}
