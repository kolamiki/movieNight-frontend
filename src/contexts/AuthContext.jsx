import React, { createContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children, showToast }) => {
    // Basic configuration
    // Assuming API is running on localhost:8000 based on previous context, 
    // but better to allow it to be passed or configured.
    // In MovieNight.jsx, apiOrigin is passed as prop. Here we might need to hardcode or use env.
    // Dynamic API Origin to match Frontend implementation (localhost vs 127.0.0.1)
    // This is crucial for Cookies to work correctly with SameSite=Lax policy.
    const apiOrigin = window.location.hostname === 'localhost'
        ? "http://localhost:8000"
        : "http://127.0.0.1:8000";

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await fetch(`${apiOrigin}/api/auth/profile/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization header might be needed if not using cookie for this request, 
                    // but since we rely on Session/Cookie auth for views, or if using JWT Access token:
                    // If using JWT Access Token from localStorage:
                    'Authorization': `Bearer ${authTokens?.access}`
                }
            });
            if (response.status === 200) {
                const data = await response.json();
                setUserProfile(data);
            }
        } catch (error) {
            console.error("Failed to fetch user profile", error);
        }
    }, [authTokens]);

    const loginUser = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        try {
            const response = await fetch(`${apiOrigin}/api/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value
                })
            });

            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(data);
                localStorage.setItem('authTokens', JSON.stringify(data));
                fetchUserProfile();
                return true;
            } else {
                if (showToast) showToast('error', 'Błąd logowania', 'Nieprawidłowe dane logowania.');
                return false;
            }
        } catch (error) {
            if (showToast) showToast('error', 'Błąd serwera', 'Wystąpił problem z połączeniem.');
            return false;
        }
    };

    // Trigger profile fetch when authTokens change (login or refresh)
    useEffect(() => {
        if (authTokens) {
            fetchUserProfile();
        } else {
            setUserProfile(null);
        }
    }, [authTokens, fetchUserProfile]);


    const registerUser = async (formData) => {
        try {
            // FormData required for file upload
            const response = await fetch(`${apiOrigin}/api/auth/register/`, {
                method: 'POST',
                body: formData, // No Content-Type header when sending FormData!
            });

            if (response.status === 201) {
                return true;
            } else {
                const data = await response.json();
                console.error("Registration errors:", data);
                // Extract error message if possible or generic
                let errorMessage = "Rejestracja nie powiodła się.";
                if (data.username) errorMessage = `Nazwa użytkownika: ${data.username}`;
                if (data.password) errorMessage = `Hasło: ${data.password}`;

                if (showToast) showToast('error', 'Błąd rejestracji', errorMessage);
                return false;
            }
        } catch (error) {
            if (showToast) showToast('error', 'Błąd serwera', 'Wystąpił problem z połączeniem.');
            return false;
        }
    };

    const logoutUser = async (silent = false) => {
        await fetch(`${apiOrigin}/api/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        setAuthTokens(null);
        setUser(null);
        setUserProfile(null);
        localStorage.removeItem('authTokens');
        if (!silent && showToast) showToast('info', 'Wylogowano', 'Zostałeś wylogowany.');
    };

    const updateToken = useCallback(async () => {
        // Function to refresh token using the HttpOnly cookie
        const response = await fetch(`${apiOrigin}/api/auth/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            localStorage.setItem('authTokens', JSON.stringify(data));
            fetchUserProfile();
        } else {
            logoutUser(true); // Silent logout on failed refresh (e.g. initial load)
        }

        if (loading) {
            setLoading(false);
        }
    }, [authTokens, loading, fetchUserProfile]);

    // Effect to check token on load
    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 4;
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);

        return () => clearInterval(interval);

    }, [authTokens, loading, updateToken]);


    const contextData = {
        user: user,
        authTokens: authTokens,
        userProfile: userProfile,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        showToast: showToast
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );

}
