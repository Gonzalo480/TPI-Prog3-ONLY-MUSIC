import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styles from "./newSongForm.module.css";

function UpdateSongForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [album, setAlbum] = useState("");
  const [genres, setGenres] = useState("");
  const [artists, setArtists] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSongData();
  }, [id]);

  const fetchSongData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión para actualizar una canción.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError("Debe iniciar sesión para actualizar una canción.");
      return;
    }

    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const songData = await response.json();
        setTitle(songData.title);
        setYear(songData.year || "");
        setAlbum(songData.album || "");
        setGenres(songData.genres ? songData.genres.join(",") : "");
        setArtists(songData.artists ? songData.artists.join(",") : "");
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los datos de la canción.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
        setError("Error al cargar los datos de la canción.");
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al cargar los datos de la canción.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError("Error de red al cargar los datos de la canción.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión para actualizar una canción.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError("Debe iniciar sesión para actualizar una canción.");
      return;
    }

    // Convertir los campos de géneros y artistas a arrays de números
    const genresArray = genres.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
    const artistsArray = artists.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));

    const updateData = {
      title,
      year: year ? parseInt(year, 10) : null,
      album: album ? parseInt(album, 10) : null,
      genres: genresArray,
      artists: artistsArray,
    };

    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(updateData),
          credentials: "include",
        }
      );

      if (response.ok) {
        setSuccess(true);
        Swal.fire({
          title: 'Éxito',
          text: 'Canción actualizada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(() => {
          window.location.href = `/song/${id}`;
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al actualizar la canción.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
        setError(errorData.message || "Error al actualizar la canción.");
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al actualizar la canción. Por favor, intente nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setError("Error de red al actualizar la canción.");
    }
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Actualizar Canción</h1>
      <div className="update-song-form-container">
        <div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Canción actualizada con éxito.</div>}
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
              Géneros (números separados por coma): <br />
              <input
                className={styles.miinput}
                type="text"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
              />
            </label>
            <br />
            <label>
              Artistas (números separados por coma): <br />
              <input
                className={styles.miinput}
                type="text"
                value={artists}
                onChange={(e) => setArtists(e.target.value)}
              />
            </label>
            <br />
            <button className={styles.buttonnew} type="submit">Actualizar Canción</button>
          </form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default UpdateSongForm;
