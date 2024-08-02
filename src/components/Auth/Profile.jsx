import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsLoading(false);
            return;
        }

        fetch("https://sandbox.academiadevelopers.com/users/profiles/profile_data/", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Token ${token}`,
            },
            credentials: "include", // Incluye las cookies en la petición (necesario para mantener la sesión)
        })
            .then((response) => {
                if (response.status === 401) {
                    setUser(null);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setIsLoading(false);
            });
    }, []);

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    if (isLoading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="cuerpo">
        <div className="profile-container">
            <div className="profile-card">
                {user ? (
                    <div >
                        <h1 className="profile-heading">Perfil</h1>
                        <img src="../../../public/user.png" alt="imagen usuario" />
                        <br />
                        <p className="profile-text">
                            ID: {user.user__id}
                        </p>
                        <p className="profile-text">
                            Usuario: {user.username}
                        </p>
                        <p className="profile-text">
                            Nombre: {user.first_name}
                        </p>
                        <p className="profile-text">
                            Apellido: {user.last_name}
                        </p>
                        <p className="profile-text">Email: {user.email}</p>
                        <button className="profile-button" onClick={logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>No se ha iniciado sesión</p>
                        <div className="profile-buttons">
                            <button
                                onClick={() =>
                                    (window.location.href = "/login")
                                }
                            >
                                Iniciar sesión
                            </button>
                            <button
                                onClick={() =>
                                    (window.location.href = "/signup")
                                }
                            >
                                Registrarse
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}

export default Profile;
