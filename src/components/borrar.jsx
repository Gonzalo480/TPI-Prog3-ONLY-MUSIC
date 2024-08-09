/* <div className="conteni2">

localStorage.getItem('token')  */

import React, { useState } from 'react';



function NewPlaylistForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [entries, setEntries] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debe iniciar sesión para crear una playlist.');
      return;
    }

    const entriesArray = entries.split(',').map(id => parseInt(id.trim(), 10));

    const playlistData = {
      name,
      description,
      public: isPublic,
      entries: [97],
    };

    try {
      const response = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/playlists/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(playlistData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        Swal.fire({
          title: 'Éxito',
          text: 'Playlist creada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.href = '/playlists';
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear la playlist.');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Crear Nueva Playlist</h1>
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
            Marcar como Pública: &nbsp; &nbsp; 
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          </label>
          <br />
          <label>
            Entradas (IDs de canciones separados por comas): <br />
            <input
              className={styles.miinput}
              type="text"
              value={entries}
              onChange={(e) => setEntries(e.target.value)}
            />
          </label>
          <br />
          <button className={styles.buttonnew} type="submit">Crear Playlist</button>
        </form>
      </div>
    </div>
  );
}

export default NewPlaylistForm;
