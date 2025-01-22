import React, { useEffect, useState } from "react";

import { Card } from "primereact/card";

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

function AddWieczorek() {
  return (
    <div>
      <img src=".\Header_Icons\Klaps_Logo_v1.png" alt="Dodaj Wieczorek Logo" />
      <p>Dodaj wieczorek</p>
    </div>
  );
}

function AvailableDays() {
  return (
    <div>
      <img
        src=".\Header_Icons\Book_Logo_v1.png"
        alt="Book Available Days Logo"
      />
      <p>Zaznacz Wolne</p>
    </div>
  );
}

function LogIn() {
  return (
    <div>
      <img src=".\Header_Icons\LogIn_Logo_v1.png" alt="Log In Logo" />
      <p>Zaloguj się</p>
    </div>
  );
}
