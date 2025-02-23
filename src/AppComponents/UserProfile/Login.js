import getCSRFToken from "../get_token";
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import axios from "axios";

import "./Login.css";
//!! DOPRACOWAĆ FORMULARZ LOGOWANIA

function Login({
  apiOrigin,
  loginActive,
  setLoginActive,
  setIsUserLogged,
  setLoggedUser,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const csrfToken = getCSRFToken();
    try {
      const response = await axios.post(
        `${apiOrigin}/loginToken/`,
        {
          username,
          password,
        },
        { headers: { "X-CSRFToken": csrfToken } }
      );

      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("username", username);
      setIsUserLogged(true);
      setLoggedUser(username);

      alert("Successful login");
    } catch (err) {
      setError("Nieprawidłowe dane logowania");
    }
  };

  function render_sign_in() {
    return (
      <Card style={{ fontFamily: "Antonio" }} header="Nie masz jeszcze konta?">
        Zarejestruj się w <b>tym miejscu</b> i weź udział w swoim pierwszym
        wieczorku.
      </Card>
    );
  }

  useEffect(
    function () {
      if (error) {
        setError(false);
      }
    },
    [username, password]
  );

  return (
    <Dialog
      visible={loginActive}
      onHide={() => {
        if (!loginActive) return;
        setLoginActive(false);
      }}
      style={{ fontFamily: "Antonio", width: "40%", height: "40%" }}
      header="ZALOGUJ SIĘ"
    >
      <Card>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="form-position">
          {/* Login */}
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <br />
          {/* Hasło */}
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            {/* <label>Hasło:</label> */}
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // toggleMask
              required
              feedback={false}
            />
          </div>
          <br />
          <button type="submit">Zaloguj się</button>
        </form>
      </Card>
      <br />
      {render_sign_in()}
    </Dialog>
  );
}

export default Login;
