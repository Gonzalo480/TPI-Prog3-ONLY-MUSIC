import React, { useState } from 'react';
import GenreCard from './GenreCard'; 
import { useFetchGenres } from '../../hooks/useFetchGenres';
import './Genre.css';

export default function GenreList() {
    const [page, setPage] = useState(1);
    const { genres, nextURL, isError, isLoading } = useFetchGenres(page);

    function handleLoadMore() {
        if (nextURL) {
            setPage(currentPage => currentPage + 1);
        }
    }

    return (
        <div className='conte' >
        <div className='cuer' >
            {isError && <p className="errormessage">No se pudieron cargar los géneros</p>}
            <div className="my5">
                <h2 className="title2">Lista de Géneros</h2>
                <ul>
                    {genres.map(genre => (
                        <div key={genre.id} className="column">
                            <GenreCard genre={genre} />
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
