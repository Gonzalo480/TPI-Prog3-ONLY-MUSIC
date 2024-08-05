import React from "react";
import styles from "./inicio.module.css";

function Inicio() {
  const handleRedirect = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <main>
        <div className={styles.contenedor}>
            <div className={styles.center}>
            <div className={styles.logo}>
                <img src="Diseño-inicio.png" alt="logo" />
            </div>
            <div className={styles.container}>
                <p className={styles.titulo}>Only Music</p>
                <br/>

                <p className={styles.sub}>Musica gratis online</p>
                <br/>
                <p className={styles.sub}>
                Regístrate en Only Music , para escuchar tus canciones favoritas
                Contamos con una enorme selección de canciones,en forma GRATUITA 
                toda la musica que queres escuchar está al alcance de tu mano.
                </p>
                <br />
                <br />
                <a className={styles.butt0} href="#" onClick={handleRedirect}>Iniciar Sesion</a>
            </div>
            </div>
        </div>
    </main>
  );
}

export default Inicio;