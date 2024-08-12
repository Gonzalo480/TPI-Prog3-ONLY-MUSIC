import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from './MusicPlayer/PlaylistCard';
import { AuthContext } from '../context/AuthContext';
import './MusicPlayer/Playlists.css';

function UserPlaylists() {

    const { user } = useContext(AuthContext);
    const [playlists, setPlaylists] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchTotalPlaylists();
        }
    }, [user]);

    const fetchTotalPlaylists = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/harmonyhub/playlists/?page=1`,
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
                const totalPlaylists = data.count;
                const totalPages = Math.ceil(totalPlaylists / 10);

                for (let page = 1; page <= totalPages; page++) {
                    await fetchPlaylists(page, token);
                }
                setIsLoading(false);
            } else {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const fetchPlaylists = async (page, token) => {
        try {
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/harmonyhub/playlists/?page=${page}`,
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
                const userPlaylists = data.results.filter(playlist => playlist.owner === user.user__id);
                setPlaylists((prevPlaylists) => [...prevPlaylists, ...userPlaylists]);
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }
    };

    const handleUpdate = (playlist) => {
        navigate(`/updateplaylist/${playlist.id}`);
    };

    const handleDelete = (playlistId) => {
        const token = localStorage.getItem('token');

        if (!token) {
            Swal.fire({
                title: 'Error',
                text: 'Debe iniciar sesión para eliminar una lista de reproducción.',
                icon: 'error',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            });
            return;
        }

        Swal.fire({
            title: '¿Está seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `https://sandbox.academiadevelopers.com/harmonyhub/playlists/${playlistId}/`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: `Token ${token}`,
                            },
                            credentials: 'include',
                        }
                    );

                    if (response.ok) {
                        Swal.fire({
                            title: 'Eliminado',
                            text: 'La lista de reproducción ha sido eliminada.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false
                        }).then(() => {
                            setPlaylists((prevPlaylists) => prevPlaylists.filter(p => p.id !== playlistId));
                        });
                    } else {
                        const errorData = await response.json();
                        Swal.fire({
                            title: 'Error',
                            text: errorData.message || 'Error al eliminar la lista de reproducción.',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false
                        });
                    }
                } catch (e) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error de red al eliminar la lista de reproducción. Por favor, intente nuevamente.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false
                    });
                }
            }
        });
    };

    return (
        <div className='contener'>
            <div className='cuer'>
                {isError && <p className="error-message">No se pudieron cargar las listas de reproducción</p>}
                <div className="my-5">
                    <h2 className="title2">Mis Listas de Reproducción</h2>
                    <ul>
                        {playlists.map(playlist => (
                            <div key={playlist.id} className="column is-two-thirds">
                                <PlaylistCard playlist={playlist} onUpdate={handleUpdate} onDelete={handleDelete} />
                            </div>
                        ))}
                    </ul>
                    <br /><br />
                    {isLoading && <><div className="loader-container">
                        <span className="carga">Cargando listas de reproducción...</span>
                        <div className="fading-bars">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div></>}
                    <br /><br />
                </div>
            </div>
        </div>
    );
}




export default UserPlaylists;