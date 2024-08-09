import React, { useState } from 'react';
import styles from "./newSongForm.module.css";

function NewGenreForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debe iniciar sesión para crear un género.');
      return;
    }

    const genreData = {
      name,
      description,
    };

    try {
      const response = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/genres/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(genreData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        Swal.fire({
          title: 'Éxito',
          text: 'Género creado con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.href = '/genres';
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear el género.');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Crear Nuevo Género</h1>
      <div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Género creado con éxito.</div>}
      </div>
      <div className={styles.contenido}>
        <form onSubmit={handleSubmit} className={styles.newform}>
          <label>
            Nombre: <br />
            <input
              className={styles.miinput}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Descripción: <br />
            <textarea
              className={styles.miinput}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />
          <button className={styles.buttonnew} type="submit">Crear Género</button>
        </form>
      </div>
    </div>
  );
}

export default NewGenreForm;
