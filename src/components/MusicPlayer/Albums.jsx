import React, { useState } from 'react';
import AlbumCard from './AlbumsCard';
import { useFetchAlbums } from '../../hooks/useFetchAlbums';

export default function AlbumList() {
    const [page, setPage] = useState(1);
    const { albums, nextURL, isError, isLoading } = useFetchAlbums(page);

    function handleLoadMore() {
        if (nextURL) {
            setPage(currentPage => currentPage + 1);
        }
    }

    return (
        <div>
            {isError && <p className="error-message">No se pudieron cargar los álbumes</p>}
            <div className="my-5">
                <h2 className="title">Lista de Álbumes</h2>
                <ul>
                    {albums.map(album => (
                        <div key={album.id} className="column is-two-thirds">
                            <AlbumCard album={album} />
                        </div>
                    ))}
                </ul>
                {isLoading && <p>Cargando más álbumes...</p>}
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
