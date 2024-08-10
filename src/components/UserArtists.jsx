import React, { useState, useEffect, useContext } from 'react';
import ArtistCard from './MusicPlayer/ArtistCard'; 
import { useFetchArtists } from '../hooks/useFetchArtists';
import { AuthContext } from '../context/AuthContext';
import './MusicPlayer/Artists.css';
import { useNavigate } from 'react-router-dom';

export default function UserArtists() {
    const [artists, setArtists] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchTotalArtists();
        }
    }, [user]);

    const fetchTotalArtists = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        try {
      
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/harmonyhub/artists/?page=1`,
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
                const totalArtists = data.count;
                const totalPages = Math.ceil(totalArtists / 10);
                for (let page = 1; page <= totalPages; page++) {
                    await fetchArtists(page, token);
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

    const fetchArtists = async (page, token) => {
        try {
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/harmonyhub/artists/?page=${page}`,
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
                const userArtists = data.results.filter(artist => artist.owner === user.user__id);
                setArtists((prevArtists) => [...prevArtists, ...userArtists]);
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }
    };


    
    const handleUpdate = (album) => {
        navigate(`/updateartist/${album.id}`);
    };

    const handleDelete = async (albumId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                title: 'Error',
                text: 'Debe iniciar sesión para eliminar un álbum.',
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
                        `https://sandbox.academiadevelopers.com/harmonyhub/albums/${albumId}/`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            credentials: 'include',
                        }
                    );

                    if (response.ok) {
                        Swal.fire({
                            title: 'Eliminado',
                            text: 'El álbum ha sido eliminado.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false
                        }).then(() => {
                            setAlbums(albums.filter(album => album.id !== albumId));
                        });
                    } else {
                        const errorData = await response.json();
                        Swal.fire({
                            title: 'Error',
                            text: errorData.message || 'Error al eliminar el álbum.',
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
                        text: 'Error de red al eliminar el álbum. Por favor, intente nuevamente.',
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
        <div className='conte'>
            <div className='cuer'>
                {isError && <p className="errormessage">No se pudieron cargar los artistas</p>}
                <div className="my5">
                    <h2 className="title2">Mis Artistas</h2>
                    <ul>
                        {artists.map(artist => (
                            <div key={artist.id} className="column">
                                <ArtistCard artist={artist} onUpdate={handleUpdate} onDelete={handleDelete} />
                            </div>
                        ))}
                    </ul>
                    <br /><br />
                    {isLoading && <><div className="loader-container">
                        <span className="carga">Cargando artistas...</span>
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
