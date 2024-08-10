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
        <Link to="/"><img src="Diseño-logo.png" alt="Logo" /></Link>
      </div>
      <div>
        <Link to="/" className={styles.enlacesa}>»Inicio</Link>
        {token ?
          <>
            <Link to="/profile" className={styles.enlacesa}>»Perfil</Link>
            <Link to="/userplaylist" className={styles.enlacesa}>»Mis PlayList</Link>
            <Link to="/newplaylist" className={styles.enlacesa}>»Agregar PlayList</Link>
            <Link to="/songuser" className={styles.enlacesa}>»Canciones Subidas</Link>
            <Link to="/new" className={styles.enlacesa}>»Subir Canción</Link>
            <Link to="/albumsuser" className={styles.enlacesa}>»Albunes Agregados</Link>
            <Link to="/newalbum" className={styles.enlacesa}>»Agregar Album</Link>
            <Link to="/genresuser" className={styles.enlacesa}>»Generos Agregados</Link>
            <Link to="/newgenre" className={styles.enlacesa}>»Agregar Genero</Link>
            <Link to="/userartist" className={styles.enlacesa}>»Artistas Agregados</Link>
            <Link to="/newartist" className={styles.enlacesa}>»Agregar Artista</Link>
        <br />
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
