import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumCard from './AlbumsCard';
import { useFetchAlbums } from '../../hooks/useFetchAlbums';
import "./Albums.css";

export default function AlbumList() {
    const [page, setPage] = useState(1);
    const { albums, nextURL, isError, isLoading } = useFetchAlbums(page);
    const navigate = useNavigate();

    function handleLoadMore() {
        if (nextURL) {
            setPage(currentPage => currentPage + 1);
        }
    }

    function handleUpdate(album) {
        navigate(`/updatealbum/${album.id}`);
    }

    function handleDelete(albumId) {
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
                                Authorization: `Token ${token}`,
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
                            window.location.reload();
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
    }

    return (
        <div className='contener'>
            <div className='cuer' >
                {isError && <p className="error-message">No se pudieron cargar los álbumes</p>}
                <div className="my-5">
                    <h2 className="title2">Lista de Álbumes</h2>
                    <ul>
                        {albums.map(album => (
                            <div key={album.id} className="column is-two-thirds">
                                <AlbumCard album={album} onUpdate={handleUpdate} onDelete={handleDelete} />
                            </div>
                        ))}
                    </ul>
                    <br /><br />
                    {isLoading && <><div class="loader-container">
                        <spam className="carga" >Cargando mas álbumes...</spam>
                        <div class="fading-bars">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
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
