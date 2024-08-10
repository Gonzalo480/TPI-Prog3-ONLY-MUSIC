import React, { useState, useEffect, useContext } from "react";
import styles from "./songList.module.css";
import DeleteSong from "./DeleteSong";
import { AuthContext } from '../context/AuthContext';
import useFetchData from '../hooks/useFetchData';

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

function SongUser() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { albums, genres, artists, isLoading: isDataLoading, error: dataError } = useFetchData(token);

  useEffect(() => {
    if (!token || !user) {
      setIsLoading(false);
      return;
    }

    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `https://sandbox.academiadevelopers.com/harmonyhub/songs/?owner=${user.user__id}&page=${page}`,
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
          const data = await response.json();
          setSongs(data.results);
          setHasMore(data.next !== null);
          setIsLoading(false);
        } else {
          setError("Error al cargar las canciones.");
          setIsLoading(false);
        }
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [page, user, token]);

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

  const handleEdit = (songId) => {
    window.location.href = `/update/${songId}`;
  };

  const handleDeleteSuccess = () => {
    window.location.href = window.location.href;
  };

  if (isLoading || isDataLoading) return <div className="loading-message">Loading...</div>;
  if (error || dataError) return <div className="error-message">Error: {error || dataError}</div>;

  return (
    <div className={styles.songlistcontainer}>
      <h1>Canciones Subidas</h1>
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
            <th>Ver</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{albums[song.album]}</td>
              <td>{song.artists.map((artistId) => artists[artistId]).join(", ")}</td>
              <td>{song.genres.map((genreId) => genres[genreId]).join(", ")}</td>
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
              <td>
                <a href={`/song/${song.id}`}>Ver Canción <i className="fa-solid fa-headphones"></i></a>
              </td>
              <td>
                {user && user.user__id === song.owner ? (
                  <>
                    <button onClick={() => handleEdit(song.id)}>
                      <span>Editar <i className="fa-solid fa-pen-to-square"></i></span>
                    </button>
                    <DeleteSong songId={song.id} onDeleteSuccess={handleDeleteSuccess} />
                  </>
                ) : (
                  <span>Sin Permisos de Edición</span>
                )}
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

export default SongUser;
