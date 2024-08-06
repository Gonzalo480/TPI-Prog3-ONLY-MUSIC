import React from "react";
import { Link} from 'react-router-dom';
import styles from "./sideBar.module.css";

function SideBar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href ='/';
  };

  return (
    <nav className={styles.sidebar_nav}>
      <div className={styles.logo}>
        <Link to="/"><img src="../../public/Diseño-logo.png" alt="Logo" /></Link>
      </div>
      <div>
        <Link to="/" className={styles.enlacesa}>»Inicio</Link>
        {token ?
          <>
            <Link to="/profile" className={styles.enlacesa}>»Perfil</Link>
            <Link to="/" className={styles.enlacesa}>»Mis PlayList</Link>
            <Link to="/" className={styles.enlacesa}>»Crear PlayList</Link>
            <Link to="/songuser" className={styles.enlacesa}>»Canciones Subidas</Link>
            <Link to="/new" className={styles.enlacesa}>»Subir Canción</Link>
            <Link to="/" className={styles.enlacesa}>»Albunes Creados</Link>
            <Link to="/" className={styles.enlacesa}>»Crear Album</Link>
            <Link to="/" className={styles.enlacesa}>»Generos Creados</Link>
            <Link to="/" className={styles.enlacesa}>»Crear Genero</Link>
        <br />
            <a href="#" className={styles.enlacesa} onClick={handleLogout}>Cerrar Sesión</a>
          </>
         : <><Link to="/login" className={styles.enlacesa}>»Iniciar sesion</Link></>
        }
      </div>
    </nav>
  );
}

export default SideBar;
