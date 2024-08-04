import React from "react";
import styles from "./error.module.css";

function Error() {
  const handleRedirect = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <main>
      <div className={styles.cont1}>
        <div className={styles.cont2}>
          <img src="./public/error.png" alt="error 404" />
          <br />
        </div>
        <div className={styles.cont2}>
          <a className={styles.btn} href="#" onClick={handleRedirect}>Volver a Inicio</a>
        </div>
      </div>
    </main>
  );
}

export default Error;
