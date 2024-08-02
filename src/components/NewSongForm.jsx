import React, { useState } from "react";
import "./NewSongForm.css";

function NewSongForm() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [album, setAlbum] = useState("");
  const [duration, setDuration] = useState("");
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [songFile, setSongFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Debe iniciar sesión para crear una canción.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year ? parseInt(year, 10) : "");
    formData.append("album", album ? parseInt(album, 10) : "");
    formData.append("duration", duration ? parseInt(duration, 10) : "");
    formData.append("song_file", songFile);
    artists.forEach((id, index) => formData.append(`artists[${index}]`, parseInt(id, 10)));
    genres.forEach((id, index) => formData.append(`genres[${index}]`, parseInt(id, 10)));

    try {
      const response = await fetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/songs/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al crear la canción.");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="new-song-form-container">
      <h1>Crear Nueva Canción</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Canción creada con éxito.</div>}
      <form onSubmit={handleSubmit} className="new-song-form">
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Año:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <label>
          Álbum:
          <input
            type="number"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </label>
        <label>
          Duración (segundos):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <label>
          Artistas (IDs separados por comas):
          <input
            type="text"
            value={artists}
            onChange={(e) => setArtists(e.target.value.split(","))}
          />
        </label>
        <label>
          Géneros (IDs separados por comas):
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value.split(","))}
          />
        </label>
        <label>
          Archivo de la canción:
          <input
            type="file"
            onChange={(e) => setSongFile(e.target.files[0])}
          />
        </label>
        <button type="submit">Crear Canción</button>
      </form>
    </div>
  );
}

export default NewSongForm;
