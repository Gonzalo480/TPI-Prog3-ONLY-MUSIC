import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from "./sideBar.module.css";

function SideBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <nav className={styles.sidebar_nav}>
      <div className={styles.logo}>
        <Link to="/"><img src="../../public/Diseño-logo.ico" alt="Logo" /></Link>
      </div>
      <div>
        <Link to="/" className={styles.enlacesa}>»Inicio</Link>
        <Link to="/login" className={styles.enlacesa}>»Iniciar sesion</Link>
        {token && (
          <>
            <Link to="/profile" className={styles.enlacesa}>»Perfil</Link>
            <Link to="/" className={styles.enlacesa}>»Mis PlayList</Link>
            <Link to="/" className={styles.enlacesa}>»Crear PlayList</Link>
            <Link to="/upsongs" className={styles.enlacesa}>»Canciones Subidas</Link>
            <Link to="/new" className={styles.enlacesa}>»Subir Canción</Link>
            <Link to="/" className={styles.enlacesa}>»Albunes Creados</Link>
            <Link to="/" className={styles.enlacesa}>»Crear Album</Link>
            <Link to="/" className={styles.enlacesa}>»Generos Creados</Link>
            <Link to="/" className={styles.enlacesa}>»Crear Genero</Link>
        <br />
            <a href="#" className={styles.enlacesa} onClick={handleLogout}>Cerrar Sesión</a>
          </>
        )}
      </div>
    </nav>
  );
}

export default SideBar;
