import React, { useState, useEffect, useRef } from "react";
import styles from "./songDetail.module.css";
import DeleteSong from "./DeleteSong";

function SongDetail() {
  const id = window.location.pathname.split("/")[2];
  const [song, setSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchSong = async () => {
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
          const data = await response.json();
          setSong(data);
        } else {
          setError("Error al cargar la canción.");
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  const startAudioContext = async () => {
    if (audioStarted) return;

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      setAudioStarted(true);
      audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Error al acceder al stream de audio:", err);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      if (audioContextRef.current) {
        audioContextRef.current.suspend();
      }
    } else {
      audioRef.current.play();
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const restartSong = () => {
    audioRef.current.currentTime = 0;
    if (!isPlaying) {
      audioRef.current.play();
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!analyserRef.current || !canvasRef.current || !audioStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        ctx.fillStyle = `rgb(${barHeight + 27}, 233, 19)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioStarted]);

  const handleEdit = (songId) => {
    window.location.href = `/update/${songId}`;
  };

  const handleDeleteSuccess = () => {
    window.location.href = window.location.href;
  };


  if (isLoading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className={styles.songdetailcontainer}>
      {song && (
        <>
          <h1>{song.title}</h1>
          <p>Álbum: {song.album}</p>
          <p>Artistas: {song.artists.join(", ")}</p>
          <p>Géneros: {song.genres.join(", ")}</p>
          <p>Año: {song.year}</p>
          <p>Visitas / Reproducciones:  {song.view_count}</p>
          <button onClick={() => handleEdit(song.id)}>Editar  <i className="fa-solid fa-pen-to-square"></i></button>
              <DeleteSong songId={song.id} onDeleteSuccess={handleDeleteSuccess} />

          <canvas ref={canvasRef} width="800" height="200" />
          {!audioStarted ? (
            <button onClick={startAudioContext}>Reproducir y Visualizar</button>
          ) : (
            <>
              <button onClick={togglePlayPause}>
                {isPlaying ? "Pausar" : "Reanudar"}
              </button>
              <button onClick={restartSong}>Reiniciar</button>
            </>
          )}
                    <audio
            className="audio-element"
            src={song.song_file}
            ref={audioRef}
            controls
          />
        </>
      )}
    </div>
  );
}

export default SongDetail;