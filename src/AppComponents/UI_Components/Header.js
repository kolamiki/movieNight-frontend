import React, { useEffect, useState } from "react";
import "animate.css";

import { Card } from "primereact/card";

// import "./index.css";

import "./Header.css";

function Header() {
  return (
    <Card className="header-style">
      <div className="header-components-style">
        <WieczorekLogo />
        <AddWieczorek />
        <AvailableDays />
        <LogIn />
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

function AddWieczorek() {
  return (
    <div className="image-with-text-button">
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

function AvailableDays() {
  return (
    <div className="image-with-text-button">
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

function LogIn() {
  return (
    <div className="login-button">
      <img
        className="header-button-image"
        src=".\Header_Icons\LogIn_Logo_v1.png"
        alt="Log In Logo"
      />
      <p className="header-button-text">Zaloguj się</p>
    </div>
  );
}
