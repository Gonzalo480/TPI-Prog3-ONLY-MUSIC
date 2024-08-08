import React, { useState } from 'react';
import styles from "./newSongForm.module.css";

function NewArtistForm() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('Ningún archivo seleccionado');
  const [songs, setSongs] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageFileName(file ? file.name : 'Ningún archivo seleccionado');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debe iniciar sesión para crear un artista.');
      setError('Debe iniciar sesión para crear un artista.');
      return;
    }

    const songsArray = songs.split(',').map(song => parseInt(song.trim())).filter(song => !isNaN(song));

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('website', website);
    if (image) {
      formData.append('image', image);
    }
    formData.append('songs', JSON.stringify(songsArray));

    try {
      const response = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/artists/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        alert('Artista creado con éxito.');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear el artista.');
        alert(errorData.message || 'Error al crear el artista.');
      }
    } catch (e) {
      setError('Error de red al crear el artista.');
      alert('Error de red al crear el artista.');
    }
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Crear Nuevo Artista</h1>
      <div className="new-artist-form-container">
        <div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Artista creado con éxito.</div>}
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
              Sitio web: <br />
              <input
                className={styles.miinput}
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
            <br />
            <label>
              Imagen del Artista: <br />
              <br />
              <input
                className={styles.miinput}
                type="file"
                onChange={handleImageChange}
                id="image-upload"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className={styles.customfileupload}
                onClick={() => document.getElementById('image-upload').click()}
              >
                Seleccionar archivo
              </button>
              <span className={styles.filename}>{imageFileName}</span>
            </label>
            <br />
            <label>
              Canciones (IDs separados por comas): <br />
              <input
                className={styles.miinput}
                type="text"
                value={songs}
                onChange={(e) => setSongs(e.target.value)}
              />
            </label>
            <br />
            <button className={styles.buttonnew} type="submit">Crear Artista</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewArtistForm;
