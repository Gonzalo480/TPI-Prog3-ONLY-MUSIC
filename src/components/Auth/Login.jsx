import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://sandbox.academiadevelopers.com/api-auth/", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {
                if (response.status === 401) {
                    alert("Usuario o contraseña incorrectos");
                } else if (response.status === 200) {
                    response.text().then((data) => {
                        const token = JSON.parse(data);
                        localStorage.setItem("token", token.token);
                        window.location.href = "/profile";
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
             return (
        <form className="formulario" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="contenedor">
                <div className="input-contenedor">
                    <i className="icon mail"></i>
                    <input
                        type="text"
                        placeholder="Nombre de Usuario"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>

                <div className="input-contenedor">
                    <i className="icon key"></i>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <input type="submit" value="Login" className="button" />
                <p>Al registrarse acepta nuestras condiciones de uso y Politicas de seguridad</p>
                <p>¿No tienes una cuenta? <a className="link" href="registro.html">Registrate</a></p>
            </div>
        </form>
    );
        </>
    );
}

export default Login;