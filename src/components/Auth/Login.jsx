import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("https://sandbox.academiadevelopers.com/api-auth/", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    "Content-type": "application/json",
                },
                credentials: "include",
            });

            if (response.status === 401) {
                setError("Usuario o contraseña incorrectos");
            } else if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                window.location.href = "/profile";
            } else {
                setError("Error desconocido. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error(error);
            setError("Error de red. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <>
            <div className="cuerpo">
                <form className="formulario" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="contenedor">
                        {error && <p className="error-message">{error}</p>}
                        <div className="input-contenedor">
                            <ion-icon name="mail"></ion-icon>
                            <input
                                type="text"
                                placeholder="Nombre de Usuario"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>

                        <div className="input-contenedor">
                            <ion-icon name="key"></ion-icon>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <input type="submit" value="Login" className="button" />
                        <p>Al registrarse acepta nuestras condiciones de uso y Políticas de seguridad</p>
                        <p>¿No tienes una cuenta? <a className="link" href="registro.html">Regístrate</a></p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
