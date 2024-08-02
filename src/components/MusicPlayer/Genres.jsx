import React, { useState } from 'react';
import './Genres.css';
import GenreCard from './GenreCard'; 
import { useFetchGenres } from '../../hooks/useFetchGenres';

export default function GenreList() {
    const [page, setPage] = useState(1);
    const { genres, nextURL, isError, isLoading } = useFetchGenres(page);

    function handleLoadMore() {
        if (nextURL) {
            setPage(currentPage => currentPage + 1);
        }
    }

    return (
        <div>
            {isError && <p className="error-message">No se pudieron cargar los géneros</p>}
            <div className="my-5">
                <h2 className="title">Lista de Géneros</h2>
                <ul>
                    {genres.map(genre => (
                        <div key={genre.id} className="column is-two-thirds">
                            <GenreCard genre={genre} />
                        </div>
                    ))}
                </ul>
                {isLoading && <p>Cargando más géneros...</p>}
                {nextURL && !isLoading && (
                    <button
                        className="button is-primary"
                        onClick={handleLoadMore}
                    >
                        Cargar más
                    </button>
                )}
            </div>
        </div>
    );
}
