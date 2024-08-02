import React, { useState } from 'react';
import SongCard from './SongCard';
import { useFetchSongs } from '../../hooks/useFetchSongs';

export default function SongList() {
    const [page, setPage] = useState(1);
    const { songs, nextURL, isError, isLoading } = useFetchSongs(page);

    function handleLoadMore() {
        if (nextURL) {
            setPage(currentPage => currentPage + 1);
        }
    }

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Canciones</h2>
                <ul>
                    {songs.map(song => (
                        <div key={song.id} className="column is-two-thirds">
                            <SongCard song={song} />
                        </div>
                    ))}
                </ul>
                {isLoading && <p>Cargando más canciones...</p>}
                {nextURL && !isLoading && (
                    <button
                        className="button is-primary"
                        onClick={handleLoadMore}
                    >
                        Cargar más
                    </button>
                )}
                {isError && <p className="error-message">No se pudieron cargar las canciones</p>}
            </div>
        </div>
    );
}


