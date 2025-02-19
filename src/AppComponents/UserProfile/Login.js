import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";

import axios from "axios";
//!! DOPRACOWAĆ FORMULARZ LOGOWANIA
//!! ZMIENIĆ IKONĘ "ZALOGUJ SIĘ"  NA NAZWĘ UŻYTKOWNIKA W ZALEŻNOŚCI OD OBECNOŚCI W LOCAL STORAGE USERNAME

function Login({ apiOrigin, loginActive, setLoginActive }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${apiOrigin}/api/loginToken/`, {
        username,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("username", username);

      alert("Successful login");
    } catch (err) {
      setError("Nieprawidłowe dane logowania");
    }
  };

  return (
    <Dialog
      visible={loginActive}
      onHide={() => {
        if (!loginActive) return;
        setLoginActive(false);
      }}
    >
      <h2>Logowanie</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nazwa użytkownika:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hasło:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Zaloguj się</button>
      </form>
    </Dialog>
  );
}

export default Login;
