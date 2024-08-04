import React, { useState } from "react";
import styles from "./newSongForm.module.css";

function NewSongForm() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [album, setAlbum] = useState("");
  const [duration, setDuration] = useState("");
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
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
      <div >
        <div className={styles.contenido}>
          <form onSubmit={handleSubmit} className={styles.newsongformcontainer}>
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
              Álbum: <br />
              <input
                className={styles.miinput}
                type="number"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
              />
            </label>
            <br />
            <label>
              Duración (segundos): <br />
              <input
                className={styles.miinput}
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </label>
            <br />
            <label>
              Artistas (IDs separados por comas): <br />
              <input
                className={styles.miinput}
                type="text"
                value={artists}
                onChange={(e) => setArtists(e.target.value.split(","))}
              />
            </label>
            <br />
            <label>
              Géneros (IDs separados por comas): <br />
              <input
                className={styles.miinput}
                type="text"
                value={genres}
                onChange={(e) => setGenres(e.target.value.split(","))}
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
            <br />
            <button className={styles.buttonnew} type="submit">Crear Canción</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewSongForm;

