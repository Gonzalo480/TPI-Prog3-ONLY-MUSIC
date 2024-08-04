import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./navBar.module.css";
import SearchSongs from "./SearchSongs";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  const handleRedirect = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.navlinks}>
          <a className={styles.btn} href="#" onClick={(e) => handleRedirect(e, "/songs")}>Canciones</a>
          <a className={styles.btn} href="#" onClick={(e) => handleRedirect(e, "/albums")}>Albums</a>
          <a className={styles.btn} href="#" onClick={(e) => handleRedirect(e, "/genres")}>Generos</a>
          </div>
      </nav>
      <div className={styles.botones}>
        {token ? (
          <a className={styles.btn2} href="#" onClick={handleLogout}>Cerrar Sesión</a>
        ) : (
          <a className={styles.btn2} href="/login">Iniciar Sesión</a>
        )}
        <SearchSongs />
      </div>
    </header>
  );
}

export default NavBar;