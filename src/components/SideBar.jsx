import React from "react";
import styles from "./sideBar.module.css";



function SideBar() {

  const handleRedirect = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

    return (
        <nav className={styles.sidebar_nav}>
      <div className={styles.logo}>
        <span onClick={(e) => handleRedirect(e, "/")}><img src="../../public/Diseño-logo.png" alt="Logo"/></span>
    </div>
    <div>
        <span className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/")}>»Inicio</span>
        <span className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/profile")}>»Perfil</span>
        <span className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/")}>»Mis PlayList</span>
        <span className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/")}>»Crear PlayList</span>
        <span className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/songsuser")}>»Canciones Subidas</span>
        <span className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/new")}>»Subir Canción</span>
        <span className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/")}>»Albunes Creados</span>
        <span className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/")}>»Crear Album</span>
        <span className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/")}>»Generos Creados</span>
        <span className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/")}>»Crear Genero</span>
        <br />
        <span className={styles.enlacesa} onClick={handleLogout}>Cerrar Sesión</span>
      </div>
    </nav>
    );
}

export default SideBar;