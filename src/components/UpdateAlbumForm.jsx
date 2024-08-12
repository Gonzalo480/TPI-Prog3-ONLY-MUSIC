import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./newSongForm.module.css";

function UpdateAlbumForm() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [artist, setArtist] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAlbumData();
  }, [id]);

  const fetchAlbumData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión para actualizar un álbum.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Debe iniciar sesión para actualizar un álbum.');
      return;
    }

    try {
      const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const albumData = await response.json();
        setTitle(albumData.title);
        setYear(albumData.year || '');
        setArtist(albumData.artist || '');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los datos del álbum.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
        setError('Error al cargar los datos del álbum.');
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al cargar los datos del álbum.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Error de red al cargar los datos del álbum.');
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
        text: 'Debe iniciar sesión para actualizar un álbum.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Debe iniciar sesión para actualizar un álbum.');
      return;
    }

    const updateData = {
      title,
      year: year ? parseInt(year, 10) : null,
      artist: artist ? parseInt(artist, 10) : null,
    };

    try {
      const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}/`, {
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
          text: 'Álbum actualizado con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(() => {
          window.location.href = `/albumsuser/`;
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al actualizar el álbum.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
        setError(errorData.message || 'Error al actualizar el álbum.');
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al actualizar el álbum. Por favor, intente nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError('Error de red al actualizar el álbum.');
    }
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Actualizar Álbum</h1>
      <div className="update-album-form-container">
        <div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Álbum actualizado con éxito.</div>}
        </div>
        <div className={styles.contenido}>
          <form onSubmit={handleSubmit} className={styles.newform}>
            <label>
              Título: <br />
              <input
                className={styles.miinput}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Año: <br />
              <input
                className={styles.miinput}
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
            <br />
            <label>
              Artista: <br />
              <input
                className={styles.miinput}
                type="number"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </label>
            <br />
            <button className={styles.buttonnew} type="submit">Actualizar Álbum</button>
          </form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default UpdateAlbumForm;
