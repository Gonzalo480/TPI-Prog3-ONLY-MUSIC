// src/components/Profile.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Profile.css';

function Profile() {
    const { user, isLoading, logout } = useContext(AuthContext);

    if (isLoading) return <div className="loading-message">Loading...</div>;

    return (
        <div className="cuerpo">
            <div className="profile-container">
                <div className="profile-card">
                    {user ? (
                        <div>
                            <h1 className="profile-heading">Perfil</h1>
                            <img src="../../../public/user.png" alt="imagen usuario" />
                            <br />
                            <p className="profile-text">ID: {user.user__id}</p>
                            <p className="profile-text">Usuario: {user.username}</p>
                            <p className="profile-text">Nombre: {user.first_name}</p>
                            <p className="profile-text">Apellido: {user.last_name}</p>
                            <p className="profile-text">Email: {user.email}</p>
                            <button className="profile-button" onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <p>No se ha iniciado sesión</p>
                            <div className="profile-buttons">
                                <button onClick={() => (window.location.href = '/login')}>Iniciar sesión</button>
                                <button onClick={() => (window.location.href = '/signup')}>Registrarse</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
