import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Dialog } from 'primereact/dialog';
import './Register.css';

const Register = ({ registerActive, setRegisterActive }) => {
    const { registerUser, showToast } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [selectedAvatarPath, setSelectedAvatarPath] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    const avatars = [
        '/avatars/avatar_glasses.png',
        '/avatars/avatar_popcorn.png',
        '/avatars/avatar_clapperboard.png',
        '/avatars/avatar_camera.png',
        '/avatars/avatar_ticket.png'
    ];

    const handleAvatarSelect = async (path) => {
        setSelectedAvatarPath(path);
        try {
            const response = await fetch(path);
            const blob = await response.blob();
            // Create a File object from the blob
            const file = new File([blob], path.split('/').pop(), { type: blob.type });
            setAvatarFile(file);
        } catch (e) {
            console.error("Error processing avatar image:", e);
            if (showToast) showToast('error', 'Błąd', 'Błąd przy wyborze avatara.');
        }
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setSelectedAvatarPath(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            if (showToast) showToast('warn', 'Hasło', 'Hasła nie są identyczne!');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirm', passwordConfirm);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        const success = await registerUser(formData);
        if (success) {
            if (showToast) showToast('success', 'Sukces', 'Konto zostało utworzone pomyślnie! Możesz się teraz zalogować.');
            setRegisterActive(false);
        }
    }

    return (
        <Dialog
            className='register-dialog'
            visible={registerActive}
            onHide={() => setRegisterActive(false)}
            draggable={false}
        >
            <div className='register-form-wrapper '>
                <h2 className="register-title">Dołącz do Wieczorków</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nazwa Użytkownika</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email (Opcjonalnie)</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Hasło</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Potwierdź Hasło</label>
                            <input
                                type="password"
                                className="form-control"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="avatar-selection-section">
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#ccc' }}>Wybierz Avatar</label>
                        <div className="avatar-grid">
                            {avatars.map((path, index) => (
                                <img
                                    key={index}
                                    src={path}
                                    alt={`Avatar option ${index}`}
                                    className={`avatar-option ${selectedAvatarPath === path ? 'selected' : ''}`}
                                    onClick={() => handleAvatarSelect(path)}
                                />
                            ))}
                        </div>
                        <label className="custom-upload-label">
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                                accept="image/*"
                            />
                            Lub prześlij własny obraz
                        </label>
                        {selectedAvatarPath && !avatars.includes(selectedAvatarPath) && (
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <img src={selectedAvatarPath} alt="Custom selection" className="avatar-option selected" />
                            </div>
                        )}
                    </div>

                    <button type="submit" className="submit-btn">Zarejestruj się</button>
                </form>
            </div>

        </Dialog>
    );
};

export default Register;
