import React from "react";
import styles from "./navBar.module.css";



function NavBar() {

    return (
        <header className={styles.header}>
        <div className={styles.logo}>
            <a href="#"><img src="./contacto.png" alt="Logo"/></a>
        </div>

          
          <nav>
            <ul className={styles.navlinks}>
              <li><a href="#">Recomendados</a></li>
              <li><a href="#">Categorias</a></li>
              <li><a href="#">Tu lista</a></li>
            </ul>
          </nav>
          <div className={styles.botones}>
          <a className={styles.btn} href="#">Registro</a>
          <a className={styles.btn} href="#">Ingreso</a>
          <label htmlFor="busqueda">Busqueda</label>
          <input type="text" id={styles.busqueda} />
          <a className={styles.btn} href="#"> Buscar </a>
        </div>
    </header>
    );
}

export default NavBar;
