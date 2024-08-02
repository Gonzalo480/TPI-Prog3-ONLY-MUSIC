import React from "react";
import styles from "./footerBar.module.css";

function FooterBar() {

    return (
        <footer className={styles.piepagina} >
        <div className={styles.grupo1}>
            <div className={styles.box}>
            <figure>
                <a href="#">
                <img src="../../public/contacto.png" alt="Logo grupo 8" />
                </a>
            
            </figure>
            </div>
            <div className={styles.box}>
            <h2>SOBRE NOSOTROS</h2>
            <p>
                Con mucho esfuerzo y empeño, realizamos esta Website, para ser
                disfrutada por todos.
            </p>
            <p>
                Si debuggear es el proceso de remover errores de código entonces
                programar debe ser el proceso de ponerlos .- Edsger Dijkstra
            </p>
            </div>
            <div className={styles.box}>
            <h2>SIGUENOS</h2>
            <div className={styles.redsocial}>
                <a href="#" className="fa fa-facebook"><span className={styles.nada}>.</span></a>
                <a href="#" className="fa fa-instagram"><span className={styles.nada}>.</span></a>
                <a href="#" className="fa fa-twitter"><span className={styles.nada}>.</span></a>
                <a href="#" className="fa fa-youtube"><span className={styles.nada}>.</span></a>
            </div>
            </div>
        </div>
        <div className={styles.grupo2}>
            <small>&copy; 2024 <b>Trabajo hecho para UPATECO Prog·3 </b> - Todos los Derechos
            Reservados.</small>
        </div>
    </footer>
    );
}

export default FooterBar;