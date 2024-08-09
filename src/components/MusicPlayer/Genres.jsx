import React, { useState } from 'react';
import GenreCard from './GenreCard'; 
import { useFetchGenres } from '../../hooks/useFetchGenres';
import './Genre.css';
import { useNavigate } from 'react-router-dom';

export default function GenreList() {
    const [page, setPage] = useState(1);
    const { genres, nextURL, isError, isLoading } = useFetchGenres(page);
    const navigate = useNavigate();

    function handleLoadMore() {
        if (nextURL) {
            setPage(currentPage => currentPage + 1);
        }
    }

    function handleUpdate(genreId) {
        navigate(`/updategenre/${genreId}`);
    }

    async function handleDelete(genreId) {
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
                    `https://sandbox.academiadevelopers.com/harmonyhub/genres/${genreId}/`,
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
        <div className='conte'>
            <div className='cuer'>
                {isError && <p className="errormessage">No se pudieron cargar los géneros</p>}
                <div className="my5">
                    <h2 className="title2">Lista de Géneros</h2>
                    <ul>
                        {genres.map(genre => (
                            <div key={genre.id} className="column">
                                <GenreCard genre={genre} onUpdate={handleUpdate} onDelete={handleDelete} />
                            </div>
                        ))}
                    </ul>
                    <br /><br />
                    {isLoading && <p>Cargando más géneros...</p>}
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
