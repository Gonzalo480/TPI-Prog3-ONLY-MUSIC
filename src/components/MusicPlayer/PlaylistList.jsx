import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from './PlaylistCard';
import './Playlists.css';

function PlaylistList() {
    const [playlists, setPlaylists] = useState([]);
    const [page, setPage] = useState(1);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlaylists(page);
    }, [page]);

    const fetchPlaylists = async (page) => {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/harmonyhub/playlists/?page=${page}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: 'include',
                }
            );

            if (response.ok) {
                const data = await response.json();
                setPlaylists((prevPlaylists) => [...prevPlaylists, ...data.results]);
                setNextURL(data.next);
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

    const handleLoadMore = () => {
        if (nextURL) {
            setPage((prevPage) => prevPage + 1);
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
                    <h2 className="title2">Lista de Reproducción</h2>
                    <ul>
                        {playlists.map(playlist => (
                            <div key={playlist.id} className="column is-two-thirds">
                                <PlaylistCard playlist={playlist} onUpdate={handleUpdate} onDelete={handleDelete} />
                            </div>
                        ))}
                    </ul>
                    <br /><br />
                    {isLoading && <><div className="loader-container">
                        <spam className="carga">Cargando más listas de reproducción...</spam>
                        <div className="fading-bars">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div></>}
                    {nextURL && !isLoading && (
                        <button
                            className="button is-primary"
                            onClick={handleLoadMore}
                        >
                            Cargar más
                        </button>
                    )}
                    <br /><br />
                </div>
            </div>
        </div>
    );
}

export default PlaylistList;
