import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./newSongForm.module.css";

function UpdatePlaylistForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchPlaylistData();
  }, [id]);

  const fetchPlaylistData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión para actualizar una playlist.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Debe iniciar sesión para actualizar una playlist.');
      return;
    }

    try {
      const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const playlistData = await response.json();
        setName(playlistData.name);
        setDescription(playlistData.description || '');
        setIsPublic(playlistData.public);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los datos de la playlist.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
        setError('Error al cargar los datos de la playlist.');
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al cargar los datos de la playlist.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Error de red al cargar los datos de la playlist.');
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
        text: 'Debe iniciar sesión para actualizar una playlist.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Debe iniciar sesión para actualizar una playlist.');
      return;
    }

    const updateData = {
      name,
      description,
      public: isPublic,
    };

    try {
      const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${id}/`, {
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
          text: 'Playlist actualizada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(() => {
          window.location.href = `/playlist/${id}`;
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al actualizar la playlist.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
        setError(errorData.message || 'Error al actualizar la playlist.');
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al actualizar la playlist. Por favor, intente nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Error de red al actualizar la playlist.');
    }
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Actualizar Playlist</h1>
      <div className="update-playlist-form-container">
        <div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Playlist actualizada con éxito.</div>}
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
            <label>
              Público: <br />
              <input
                className={styles.miinput}
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            </label>
            <br />
            <button className={styles.buttonnew} type="submit">Actualizar Playlist</button>
          </form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default UpdatePlaylistForm;
