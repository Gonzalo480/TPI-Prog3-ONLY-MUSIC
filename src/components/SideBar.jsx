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
        <a href="#"><img src="../../public/Diseño-logo.png" alt="Logo"/></a>
    </div>
    <div>
        <a href="#" className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/")}>Inicio</a>
        <a href="#" className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/profile")}>Perfil</a>
        <a href="#" className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/songsuser")}>Mis Canciones</a>
        <a href="#" className={styles.enlacesa} onClick={(e) => handleRedirect(e, "/new")}>Subir Canción</a>
        <a href="#" className={styles.enlacesa} onClick={handleLogout}>Cerrar Sesión</a>
      </div>
    </nav>
    );
}

export default SideBar;