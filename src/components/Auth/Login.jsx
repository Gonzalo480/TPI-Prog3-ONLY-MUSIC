import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from "./login.module.css";

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
        <div className={styles.cuerpo}>
        <form className={styles.formulario} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <br />
            <div className={styles.contenedor}>
                <div className={styles.inputcontenedor}>
                    <ion-icon name="mail"></ion-icon>
                    <input
                        type="text"
                        placeholder="Nombre de Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.inputcontenedor}>
                    <ion-icon name="key"></ion-icon>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Login" className={styles.button} />
                <br />
                <p>Ingresar para acceder y disfrutar del servicio de ONLY-MUSIC </p>
            </div>
        </form>
        </div>
    );
}

export default Login;