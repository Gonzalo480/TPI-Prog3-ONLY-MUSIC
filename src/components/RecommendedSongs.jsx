import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetchData from '../hooks/useFetchData';
import styles from './recommendedSongs.module.css';

function RecommendedSongs() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { albums, artists, genres, isLoading: isDataLoading, error: dataError } = useFetchData(token);

  useEffect(() => {
    if (!token || !user) {
      setIsLoading(false);
      return;
    }

    const fetchAllSongs = async () => {
      try {
        let allSongs = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(
            `https://sandbox.academiadevelopers.com/harmonyhub/songs/?page=${page}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: `Token ${token}`,
              },
              credentials: "include",
            }
          );

          if (response.ok) {
            const data = await response.json();
            allSongs = [...allSongs, ...data.results];
            hasMore = data.next !== null;
            page++;
          } else {
            throw new Error("Error al cargar las canciones.");
          }
        }

        const otherUsersSongs = allSongs.filter(song => song.owner !== user.user__id);
        const shuffled = otherUsersSongs.sort(() => 0.5 - Math.random());
        setRecommendedSongs(shuffled.slice(0, 5));
        setIsLoading(false);
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchAllSongs();
  }, [token, user]);

  if (isLoading || isDataLoading) {
    return (
      <div className="loader-container">
        <span className="carga">Cargando recomendaciones...</span>
        <div className="fading-bars">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    );
  }

  if (error || dataError) {
    return <div className="error-message">Error: {error || dataError}</div>;
  }

  return (
    <div className={styles.songlistcontainer}>
      <span className={styles.titlerec}>
        <img
          src={
            user.image === null
              ? "user.png"
              : `http://sandbox.academiadevelopers.com/${user.image}`
          }
          alt="imagen usuario"
        />
        &nbsp;&nbsp;&nbsp;
        <h1>Bienvenido {user.first_name}</h1>
      </span>
      <h2>Canciones recomendadas para ti:</h2>
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
          </tr>
        </thead>
        <tbody>
          {recommendedSongs.map((song) => (
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
                <a href={`/song/${song.id}`}>Ver Canción<i className="fa-solid fa-headphones"></i></a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

    </div>
);
}

export default RecommendedSongs;