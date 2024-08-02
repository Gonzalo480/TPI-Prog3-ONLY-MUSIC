import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            window.location.href = '/profile';
        } catch (error) {
            alert(error.message);
        }
    };

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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-contenedor">
                    <i className="icon key"></i>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Login" className="button" />
                <p>Al registrarse acepta nuestras condiciones de uso y Politicas de seguridad</p>
                <p>¿No tienes una cuenta? <a className="link" href="registro.html">Registrate</a></p>
            </div>
        </form>
    );
}

export default Login;
