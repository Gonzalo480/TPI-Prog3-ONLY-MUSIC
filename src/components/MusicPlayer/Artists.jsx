import React, { useState } from 'react';
import ArtistCard from './ArtistCard'; 
import { useFetchArtists } from '../../hooks/useFetchArtists';
import './Artists.css';
import { useNavigate } from 'react-router-dom';

export default function ArtistList() {
    const [page, setPage] = useState(1);
    const { artists, nextURL, isError, isLoading } = useFetchArtists(page);
    const navigate = useNavigate();

    function handleLoadMore() {
        if (nextURL) {
            setPage(currentPage => currentPage + 1);
        }
    }

    function handleUpdate(artist) {
        navigate(`/updateartist/${artist.id}`);
    }

    async function handleDelete(artistId) {
        const token = localStorage.getItem('token');

        if (!token) {
            Swal.fire({
                title: 'Error',
                text: 'Debe iniciar sesión para eliminar un artista.',
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
                        `https://sandbox.academiadevelopers.com/harmonyhub/artists/${artistId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    credentials: 'include',
                }
            );

            if (response.ok) {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El artista ha sido eliminado.',
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
                    text: errorData.message || 'Error al eliminar el artista.',
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
                text: 'Error de red al eliminar el artista. Por favor, intente nuevamente.',
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
        <div className='conte'>
            <div className='cuer'>
                {isError && <p className="errormessage">No se pudieron cargar los artistas</p>}
                <div className="my5">
                    <h2 className="title2">Lista de Artistas</h2>
                    <ul>
                        {artists.map(artist => (
                            <div key={artist.id} className="column">
                                <ArtistCard artist={artist} onUpdate={handleUpdate} onDelete={handleDelete} />
                            </div>
                        ))}
                    </ul>
                    <br /><br />
                    {isLoading && <><div className="loader-container">
                        <span className="carga">Cargando más artistas...</span>
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
                            className="button"
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
