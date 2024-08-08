import React from "react";
import { Link } from 'react-router-dom';
import styles from "./navBar.module.css";
import SearchSongs from "./SearchSongs";

function NavBar() {
  const token = localStorage.getItem("token");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href ='/';
  };

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.navlinks}>
          
          {token ? (
          <Link className={styles.btn} to="/songs">Canciones</Link>
        ) : (
          <></>
        )}
          <Link className={styles.btn} to="/artist">Artistas</Link>
          <Link className={styles.btn} to="/albums">Álbumes</Link>
          <Link className={styles.btn} to="/genres">Géneros</Link>
          <Link className={styles.btn} to="/playlists">PlayList</Link>
        </div>
      </nav>
      <div className={styles.botones}>
        {token ? (
          <>
          <button className={styles.btn2} onClick={handleLogout}>Cerrar Sesión</button>
          <SearchSongs /></>
        ) : (
          <Link className={styles.btn2} to="/login">Iniciar Sesión</Link>
        )}
        
      </div>
    </header>
  );
}

export default NavBar;
