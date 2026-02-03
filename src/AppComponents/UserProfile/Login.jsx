import React, { useState, useEffect, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import AuthContext from "../../contexts/AuthContext";
import "./Login.css";

function Login({
  apiOrigin,
  loginActive,
  setLoginActive,
  setIsUserLogged,
  setLoggedUser,
  setRegisterActive,
}) {
  const { loginUser, showToast } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false); // Reset error on new submission attempt

    // Let's call loginUser with the event.
    const success = await loginUser(e);

    if (success) {
      localStorage.setItem("username", username);
      setIsUserLogged(true);
      setLoggedUser(username);
      // Clear states
      setUsername("");
      setPassword("");
      if (showToast) showToast('success', 'Sukces', 'Zalogowano pomyślnie!');
      // Close login window
      setLoginActive(false);
    } else {
      setError(true);
    }
  };

  function render_sign_in() {
    return (
      <div className="sign-in-info">
        <h3>Nie masz jeszcze konta?</h3>
        Zarejestruj się w{" "}
        <b>
          <u onClick={() => { setRegisterActive(true); setLoginActive(false); }} style={{ cursor: "pointer" }}>tym miejscu</u>
        </b>{" "}
        i weź udział w swoim pierwszym wieczorku.
      </div>
    );
  }

  return (
    <Dialog
      visible={loginActive}
      onHide={() => {
        if (!loginActive) return;
        setLoginActive(false);
        setUsername("");
        setPassword("");
        setError(false);
      }}
      draggable={false}
      className="login-dialog"
    >
      <div className="login-form-wrapper">
        <h2 className="login-title">ZALOGUJ SIĘ</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Login */}
          <div className="form-group">
            <label>Login</label>
            <input
              type="text"
              name="username"
              className={`form-control ${error ? 'input-error' : ''}`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError(false);
              }}
              required
            />
          </div>

          {/* Hasło */}
          <div className="form-group">
            <label>Hasło</label>
            <input
              type="password"
              name="password"
              className={`form-control ${error ? 'input-error' : ''}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Zaloguj się
          </button>
        </form>
        {render_sign_in()}
      </div>
    </Dialog>
  );
}

export default Login;
