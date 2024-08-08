import React, { useState } from "react";
import styles from "./newSongForm.module.css";

function NewSongForm() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [album, setAlbum] = useState("");
  const [artists, setArtists] = useState("");
  const [genres, setGenres] = useState("");
  const [songFile, setSongFile] = useState("Ningún archivo seleccionado");
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
    if (year) formData.append("year", parseInt(year, 10));
    if (album) formData.append("album", parseInt(album, 10));
    
  
    const artistsArray = artists.split(',').map(id => parseInt(id.trim(), 10));
    const genresArray = genres.split(',').map(id => parseInt(id.trim(), 10));
    
    artistsArray.forEach((id, index) => formData.append(`artists[${index}]`, id));
    genresArray.forEach((id, index) => formData.append(`genres[${index}]`, id));
    
    if (songFile !== "Ningún archivo seleccionado") {
      const fileInput = document.getElementById('file-upload');
      formData.append("song_file", fileInput.files[0]);
    }

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
        const data = await response.json();
        setSuccess(true);
        Swal.fire({
          title: 'Éxito',
          text: 'Cancion creada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
      }).then(() => {
          window.location.href = '/songsuser';
      });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al crear la canción.");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSongFile(file ? file.name : "Ningún archivo seleccionado");
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Crear Nueva Canción</h1>
      <div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Canción creada con éxito.</div>}
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
            Álbum (ID): <br />
            <input
              className={styles.miinput}
              type="number"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
          </label>
          <br />
          <label>
            Artistas (IDs separados por comas): <br />
            <input
              className={styles.miinput}
              type="text"
              value={artists}
              onChange={(e) => setArtists(e.target.value)}
            />
          </label>
          <br />
          <label>
            Géneros (IDs separados por comas): <br />
            <input
              className={styles.miinput}
              type="text"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
            />
          </label>
          <br />
          <label>
            Archivo de la canción: <br />
            <br />
            <input
              className={styles.miinput}
              type="file"
              onChange={handleFileChange}
              id="file-upload"
              style={{ display: "none" }}
            />
            <button
              type="button"
              className={styles.customfileupload}
              onClick={() => document.getElementById("file-upload").click()}
            >
              Seleccionar archivo
            </button>
            <span className={styles.filename}>{songFile}</span>
          </label>
          <br />
          <button className={styles.buttonnew} type="submit">Crear Canción</button>
        </form>
      </div>
    </div>
  );
}

export default NewSongForm;