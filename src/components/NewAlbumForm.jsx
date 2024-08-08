import React, { useState } from 'react';
import styles from "./newSongForm.module.css";

function NewAlbumForm() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [artist, setArtist] = useState('');
  const [cover, setCover] = useState(null);  
  const [coverFileName, setCoverFileName] = useState('Ningún archivo seleccionado');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    setCoverFileName(file ? file.name : 'Ningún archivo seleccionado');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire('Error', 'Debe iniciar sesión para crear un álbum.', 'error');
      setError('Debe iniciar sesión para crear un álbum.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year ? parseInt(year, 10) : '');
    formData.append('artist', artist ? parseInt(artist, 10) : '');
    if (cover) {
      formData.append('cover', cover);
    }

    try {
      const response = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/albums/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        Swal.fire({
          title: 'Éxito',
          text: 'Álbum creado con éxito.',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/albums";
          }
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear el álbum.');
        Swal.fire('Error', errorData.message || 'Error al crear el álbum.', 'error');
      }
    } catch (e) {
      setError('Error de red al crear el álbum.');
      Swal.fire('Error', 'Error de red al crear el álbum.', 'error');
    }
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Crear Nuevo Álbum</h1>
      <div className="new-album-form-container">
        <div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Álbum creado con éxito.</div>}
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
              Artista: (solo valores validos) <br />
              <input
                className={styles.miinput}
                type="number"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Portada del Álbum: <br />
              <br />
              <input
                className={styles.miinput}
                type="file"
                onChange={handleCoverChange}
                id="cover-upload"
                style={{ display: "none" }}
              />
              <button
                type="button"
                className={styles.customfileupload}
                onClick={() => document.getElementById("cover-upload").click()}
              >
                Seleccionar archivo
              </button>
              <span className={styles.filename}>{coverFileName}</span>
            </label>
            <br />
            <button className={styles.buttonnew} type="submit">Crear Álbum</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewAlbumForm;
