import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PlaylistDetail.module.css';
import './estilo.css';

function PlaylistDetail() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [ownerName, setOwnerName] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef(null);
    const playlistRef = useRef(null);

    const [audioStarted, setAudioStarted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeSong, setActiveSong] = useState(null);  // Estado para la canción activa
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!analyserRef.current || !canvasRef.current || !audioStarted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);

            analyserRef.current.getByteFrequencyData(dataArray);

            ctx.fillStyle = 'rgb(0, 0, 0)';
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

            if (songs.length > 0) {
                setActiveSong(songs[0].song_file);  // Establecer la primera canción como activa
                audioRef.current.src = songs[0].song_file;
                audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (err) {
            console.error('Error al acceder al stream de audio:', err);
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

    useEffect(() => {
        fetchPlaylist();
    }, [id]);

    useEffect(() => {
        if (songs.length > 0) {
            init();
        }
    }, [songs]);

    const fetchPlaylist = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/harmonyhub/playlists/${id}/`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                    credentials: 'include',
                }
            );

            if (response.ok) {
                const data = await response.json();
                setPlaylist(data);
                fetchOwnerName(data.owner);
                fetchSongsDetails(data.entries);
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOwnerName = async (ownerId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/users/profiles/${ownerId}/`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                    credentials: 'include',
                }
            );

            if (response.ok) {
                const data = await response.json();
                setOwnerName(`${data.first_name} ${data.last_name}`);
            } else {
                setOwnerName('Desconocido');
            }
        } catch (error) {
            setOwnerName('Desconocido');
        }
    };

    const fetchSongsDetails = async (songIds) => {
        const token = localStorage.getItem('token');

        try {
            const songPromises = songIds.map((songId) =>
                fetch(
                    `https://sandbox.academiadevelopers.com/harmonyhub/songs/${songId}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Token ${token}`,
                        },
                        credentials: 'include',
                    }
                ).then((res) => res.json())
            );

            const songsData = await Promise.all(songPromises);
            setSongs(songsData);
        } catch (error) {
            console.error('Error al obtener los detalles de las canciones:', error);
        }
    };

    const init = () => {
        const audio = audioRef.current;
        const playlist = playlistRef.current;
        const tracks = playlist.getElementsByTagName('a');

        audio.volume = 0.10;

        for (let track in tracks) {
            const link = tracks[track];
            if (typeof link === 'function' || typeof link === 'number') continue;
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const song = this.getAttribute('href');
                run(song, audio, this);
            });
        }

        audio.addEventListener('ended', function () {
            for (let track in tracks) {
                const link = tracks[track];
                let nextTrack = parseInt(track) + 1;
                if (typeof link === 'function' || typeof link === 'number') continue;
                if (!this.src) this.src = tracks[0];
                if (track === tracks.length - 1) nextTrack = 0;
                if (link.getAttribute('href') === this.src) {
                    const nextLink = tracks[nextTrack];
                    run(nextLink.getAttribute('href'), audio, nextLink);
                    break;
                }
            }
        });
    };

    const run = (song, audio, link) => {
        const parent = link.parentElement;
        const items = parent.parentElement.getElementsByTagName('li');

        for (let item in items) {
            if (items[item].classList) items[item].classList.remove('active');
        }

        parent.classList.add('active');
        setActiveSong(song);  // Establecer la canción activa
        audio.src = song;
        audio.load();
        audio.play();
    };

    if (isLoading) {
        return <div className={styles.loader}>Cargando la lista de reproducción...</div>;
    }

    if (isError) {
        return <div className={styles.errormessage}>No se pudo cargar la lista de reproducción.</div>;
    }

    if (!playlist) {
        return null;
    }

    return (
        <div className={styles.playlistviewcontainer}>
            <h2 className={styles.title}>{playlist.name}</h2>
            <br />
            <p>{`Propietario: ${ownerName}`}</p>
            <p>{playlist.description}</p>
            <p>{`Pública: ${playlist.public ? 'Sí' : 'No'}`}</p>
            <h3>Canciones:</h3>
            <div className={styles.canv}>
                <canvas ref={canvasRef} width="800" height="200" />
            </div>
            {!audioStarted ? (
                <button onClick={startAudioContext}>Reproducir y Visualizar</button>
            ) : (
                <>
                    <button onClick={togglePlayPause}>
                        {isPlaying ? 'Pausar' : 'Reanudar'}
                    </button>
                    <button onClick={restartSong}>Reiniciar</button>
                </>
            )}
            <div>
                <ul ref={playlistRef}>
                    {songs.map((song) => (
                        <li key={song.id} className={activeSong === song.song_file ? styles.active : styles.desactive}>
                            <a className={styles.reset} href={song.song_file}>{song.title}</a>
                        </li>
                    ))}
                </ul>
                <audio ref={audioRef} controls></audio>
            </div>
        </div>
    );
}

export default PlaylistDetail;

