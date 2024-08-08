import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from "./newSongForm.module.css";

function UpdateGenreForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchGenreData();
  }, [id]);

  const fetchGenreData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión para actualizar un género.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Debe iniciar sesión para actualizar un género.');
      return;
    }

    try {
      const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/genres/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const genreData = await response.json();
        setName(genreData.name);
        setDescription(genreData.description || '');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los datos del género.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
        setError('Error al cargar los datos del género.');
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al cargar los datos del género.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Error de red al cargar los datos del género.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión para actualizar un género.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Debe iniciar sesión para actualizar un género.');
      return;
    }

    const updateData = {
      name,
      description,
    };

    try {
      const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/genres/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setSuccess(true);
        Swal.fire({
          title: 'Éxito',
          text: 'Género actualizado con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(() => {
          window.location.href = `/genre/${id}`;
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al actualizar el género.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
        setError(errorData.message || 'Error al actualizar el género.');
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al actualizar el género. Por favor, intente nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Error de red al actualizar el género.');
    }
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Actualizar Género</h1>
      <div className="update-genre-form-container">
        <div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Género actualizado con éxito.</div>}
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
            <button className={styles.buttonnew} type="submit">Actualizar Género</button>
          </form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default UpdateGenreForm;
