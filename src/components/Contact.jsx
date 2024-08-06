import React from "react";
import styles from "./newSongForm.module.css";

function Contact() {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "¡Mensaje enviado con éxito!",
      text: "Gracias por ponerte en contacto con nosotros.",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Contacto</h1>
      <h3 className={styles.achetres}>¿En qué podemos ayudarte?</h3>
      <div className={styles.contenido}>
        <form className={styles.newsongformcontainer} onSubmit={handleFormSubmit}>
          <label>
            Nombre y Apellido: <br />
            <input className={styles.miinput} type="text" required />
          </label>
          <br />
          <label>
            Email: <br />
            <input className={styles.miinput} type="email" required />
          </label>
          <br />
          <label>
            Consulta: <br />
            <textarea className={styles.miinput2} required />
          </label>
          <br />
          <button className={styles.buttonnew} type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
