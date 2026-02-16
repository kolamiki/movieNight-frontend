import { useContext, useEffect } from "react";
import "animate.css";

import { Card } from "primereact/card";
import { Menubar } from "primereact/menubar";
import "primeicons/primeicons.css";
import AuthContext from "../../contexts/AuthContext";


import "./Header.css";


function Header({
  apiOrigin,
  loginActive,
  setLoginActive,
  registerActive,
  isUserLogged,
  setIsUserLogged,
  addBookedDaysActive,
  setAddBookedDaysActive,
  addMovieNightActive,
  setMovieNightActive,
  setLoggedUser,
  setIsUserPanelActive,
}) {
  const { userProfile, logoutUser } = useContext(AuthContext);

  // Determine if user is logged based on AuthContext
  const isContextLogged = !!userProfile;

  return (
    <Card className="header-style">
      <div className="header-components-style">
        <WieczorekLogo />
        <AddWieczorek setMovieNightActive={setMovieNightActive} />
        <AvailableDays setAddBookedDaysActive={setAddBookedDaysActive} />

        {isContextLogged ? (
          <ProfileShortcut
            username={userProfile?.username || localStorage.getItem("username")}
            userProfile={userProfile}
            logoutUser={logoutUser}
            setIsUserLogged={setIsUserLogged}
            setLoggedUser={setLoggedUser}
            apiOrigin={apiOrigin}
            setIsUserPanelActive={setIsUserPanelActive}
          />
        ) : (
          <div style={{ display: 'flex' }}>
            <LogIn setLoginActive={setLoginActive} />
          </div>
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

// function SignUp({ setRegisterActive }) {
//   return (
//     <div className="login-button" onClick={() => setRegisterActive(true)} style={{ marginLeft: '10px' }}>
//       <img
//         className="header-button-image"
//         src=".\Header_Icons\LogIn_Logo_v1.png"
//         alt="Sign Up Logo"
//       />
//       <p className="header-button-text">Zarejestruj</p>
//     </div>
//   );
// }

function ProfileShortcut({ username, userProfile, logoutUser, setIsUserLogged, setLoggedUser, apiOrigin, setIsUserPanelActive }) {

  const getAvatarUrl = () => {
    if (!userProfile?.avatar) return null;
    if (userProfile.avatar.startsWith('http')) return userProfile.avatar;
    // Handle relative path. Ensure apiOrigin doesn't have trailing slash if path has leading slash
    const cleanOrigin = apiOrigin.includes('api') ? apiOrigin.split('/api')[0] : apiOrigin;
    const cleanPath = userProfile.avatar.startsWith('/') ? userProfile.avatar : `/${userProfile.avatar}`;
    return `${cleanOrigin}${cleanPath}`;
  };

  const avatarUrl = getAvatarUrl();

  const rootItemTemplate = (item, options) => {
    return (
      <div className="p-menuitem-content header-profile-item" onClick={options.onClick} >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="header-avatar" />
        ) : (
          <i className="pi pi-user header-avatar-icon"></i>
        )}
        <span className="header-username">{item.label}</span>
        <i className="pi pi-angle-down header-chevron"></i>
      </div>
    );
  }

  const menuOptions = [
    {
      label: username,
      template: rootItemTemplate,
      items: [
        {
          label: "Twój profil",
          icon: "pi pi-user",
          command: () => setIsUserPanelActive(true),
        },
        {
          label: "Ustawienia",
          icon: "pi pi-cog",
          command: () => alert("Ustawienia profilu są w trakcie rozbudowy."),
        },
        {
          label: "Wyloguj się",
          icon: "pi pi-sign-out",
          command: () => {
            if (logoutUser) logoutUser();
            // Clean up local storage used by App.jsx legacy logic
            localStorage.removeItem("username");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsUserLogged(false);
            setLoggedUser(null);
          },
        },
      ],
    },
  ];

  return (
    <Menubar
      model={menuOptions}
      className="profile-menubar"
    />
  );
}
