import React from "react";
import styles from "./sideBar.module.css";



function SideBar() {

    return (
        <nav className={styles.sidebar_nav}>
      <div className={styles.logo}>
        <a href="#"><img src="./Diseño-logo.png" alt="Logo"/></a>
    </div>
    <div>
        <a href="#" className={styles.enlacesa}>Inicio</a>
        <a href="#" className={styles.enlacesa}>Buscar</a>
        <a href="#" className={styles.enlacesa}>Mi Biblioteca</a>
        <a href="#" className={styles.enlacesa}>Favoritos</a>
        <a href="#" className={styles.enlacesa}>Historial</a>
        <a href="#" className={styles.enlacesa}>Cerrar sesion</a>
      </div>
    </nav>
    );
}

export default SideBar;