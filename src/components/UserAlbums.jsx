import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AlbumCard from './MusicPlayer/AlbumsCard';

export default function UserAlbumList() {
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchAllUserAlbums();
        }
    }, [user]);

    const fetchAllUserAlbums = async () => {
        setIsLoading(true);
        setIsError(false);

        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                title: 'Error',
                text: 'Debe iniciar sesión para ver sus álbumes.',
                icon: 'error',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            });
            setIsLoading(false);
            return;
        }

        let allUserAlbums = [];
        let nextPage = 1;
        let hasMorePages = true;

        while (hasMorePages) {
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/albums/?page=${nextPage}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    const userAlbums = data.results.filter(album => album.owner === user.user__id);
                    allUserAlbums = [...allUserAlbums, ...userAlbums];
                    hasMorePages = !!data.next;
                    nextPage++;
                } else {
                    setIsError(true);
                    hasMorePages = false;
                }
            } catch (e) {
                setIsError(true);
                hasMorePages = false;
            }
        }

        setAlbums(allUserAlbums);
        setIsLoading(false);
    };

    const handleUpdate = (album) => {
        navigate(`/updatealbum/${album.id}`);
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
        <div className='contener'>
            <div className='cuer'>
                {isError && <p className="error-message">No se pudieron cargar los álbumes</p>}
                <div className="my-5">
                    <h2 className="title2">Mis Álbumes</h2>
                    <ul>
                        {albums.map(album => (
                            <div key={album.id} className="column is-two-thirds">
                                <AlbumCard album={album} onUpdate={handleUpdate} onDelete={handleDelete} />
                            </div>
                        ))}
                    </ul>
                    <br /><br />
                    {isLoading && <><div class="loader-container">
                        <spam className="carga" >Cargando álbumes...</spam>
                        <div class="fading-bars">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        </div>
                        </div></>}
                    <br /><br />
                </div>
            </div>
        </div>
    );
}
