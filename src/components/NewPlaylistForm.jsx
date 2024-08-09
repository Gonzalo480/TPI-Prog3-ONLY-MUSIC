import React, { useState } from 'react';
import styles from "./newSongForm.module.css";

const NewPlaylistForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [entries, setEntries] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const playlistResponse = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/playlists/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ name, description, public: isPublic, entries }),
      });

      if (playlistResponse.ok) {
        const playlistData = await playlistResponse.json();
        console.log('Playlist created:', playlistData);

        // Add entries to the new playlist
        for (const song of entries) {
          await fetch('https://sandbox.academiadevelopers.com/harmonyhub/playlist-entries/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({ order: song.order, playlist: playlistData.id, song: song.id }),
          });
        }

        // Reset form fields
        setName('');
        setDescription('');
        setIsPublic(false);
        setEntries([]);
      } else {
        console.error('Error creating playlist:', playlistResponse.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddEntry = () => {
    setEntries([...entries, { order: entries.length, id: null }]);
  };

  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    updatedEntries[index].order = index;
    setEntries(updatedEntries);
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Crear Nueva Playlist</h1>
      <div className={styles.contenido}>
        <form onSubmit={handleSubmit} className={styles.newform}>
          <label>
            Nombre: <br />
            <input type="text" value={name} className={styles.miinput} onChange={(e) => setName(e.target.value)} required />
          </label>
          <br />
          <label>
            Descripción: <br />
            <textarea value={description} className={styles.miinput} onChange={(e) => setDescription(e.target.value)}></textarea>
          </label>
          <br />
          <label>
            Marcar como Pública: &nbsp; &nbsp;
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
          </label>
          <br />
          <br />
          <h3>Canciones</h3>
          {entries.map((entry, index) => (
            <div key={index}>
              <label>
                Número de Orden {index} para ID de canción:
                <input type="number" value={entry.id} className={styles.miinput} onChange={(e) => handleEntryChange(index, 'id', e.target.value)} />
              </label>
            </div>
          ))}
          <button className={styles.customfileupload} type="button" onClick={handleAddEntry}>
            Agregar Cancion:
          </button>
          <button className={styles.buttonnew} type="submit">Crear Playlist</button>
        </form>
      </div>
    </div>
  );
};

export default NewPlaylistForm;