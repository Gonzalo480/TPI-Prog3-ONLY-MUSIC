import React, { useState, useEffect } from "react";
import styles from "./songList.module.css";

function togglePlayPause(event) {
  const element = event.currentTarget;
  const audio = element.querySelector('audio');
  const icon = element.querySelector('.play-icon');
  const isPlaying = !audio.paused;

  document.querySelectorAll('.music-item audio').forEach(a => {
    if (a !== audio) {
      a.pause();
      a.currentTime = 0;
      const otherIcon = a.closest('.music-item').querySelector('.play-icon');
      otherIcon.classList.remove('fa-pause');
      otherIcon.classList.add('fa-play');
    }
  });

  if (isPlaying) {
    audio.pause();
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  } else {
    audio.play();
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
  }
}

function SongListnotoken() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/songs/?page=${page}`);
        if (!response.ok) {
          throw new Error("Error al cargar las canciones.");
        }
        const data = await response.json();
        setSongs(data.results);
        setHasMore(data.next !== null);
        setIsLoading(false);
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [page]);

  const handleNextPage = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className={styles.songlistcontainer}>
      <h1>Lista de Canciones</h1>
      <br />
      <div className={styles.paginationbuttons}>
        <button
          className="previous-page-button"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Página Anterior
        </button>
        <span className={styles.pagenumber}>Página {page}</span>
        <button
          className="next-page-button"
          onClick={handleNextPage}
          disabled={!hasMore}
        >
          Siguiente Página
        </button>
      </div>

      <br />
      <table className="song-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Álbum</th>
            <th>Artistas</th>
            <th>Géneros</th>
            <th>Año</th>
            <th>Visitas</th>
            <th>ID</th>
            <th>Reproducir</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.album}</td>
              <td>{song.artists.join(", ")}</td>
              <td>{song.genres.join(", ")}</td>
              <td>{song.year}</td>
              <td>{song.view_count}</td>
              <td>{song.id}</td>
              <td>
                <div className="music-item" onClick={togglePlayPause}>
                  <i className="play-icon fas fa-play"></i><br />
                  <audio className="audio-element" src={song.song_file} controls />
                  <p>____________</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginationbuttons}>
        <button
          className="previous-page-button"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Página Anterior
        </button>
        <span className={styles.pagenumber}>Página {page}</span>
        <button
          className="next-page-button"
          onClick={handleNextPage}
          disabled={!hasMore}
        >
          Siguiente Página
        </button>
      </div>
    </div>
  );
}

export default SongListnotoken;