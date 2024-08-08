import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from "./newSongForm.module.css";

function UpdateArtistForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchArtistData();
  }, [id]);

  const fetchArtistData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión para actualizar un artista.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Debe iniciar sesión para actualizar un artista.');
      return;
    }

    try {
      const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/artists/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const artistData = await response.json();
        setName(artistData.name);
        setBio(artistData.bio || '');
        setWebsite(artistData.website || '');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los datos del artista.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
        setError('Error al cargar los datos del artista.');
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al cargar los datos del artista.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Error de red al cargar los datos del artista.');
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
        text: 'Debe iniciar sesión para actualizar un artista.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Debe iniciar sesión para actualizar un artista.');
      return;
    }

    const updateData = {
      name,
      bio,
      website,
    };

    try {
      const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/artists/${id}/`, {
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
          text: 'Artista actualizado con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(() => {
          window.location.href = `/artist/${id}`;
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al actualizar el artista.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
        setError(errorData.message || 'Error al actualizar el artista.');
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al actualizar el artista. Por favor, intente nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Error de red al actualizar el artista.');
    }
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Actualizar Artista</h1>
      <div className="update-artist-form-container">
        <div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Artista actualizado con éxito.</div>}
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
              Biografía: <br />
              <textarea
                className={styles.miinput}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </label>
            <br />
            <label>
              Sitio Web: <br />
              <input
                className={styles.miinput}
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
            <br />
            <button className={styles.buttonnew} type="submit">Actualizar Artista</button>
          </form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default UpdateArtistForm;
