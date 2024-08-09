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

    return (
        <div className='conte'>
            <div className='cuer'>
                {isError && <p className="errormessage">No se pudieron cargar los artistas</p>}
                <div className="my5">
                    <h2 className="title2">Lista de Artistas</h2>
                    <ul>
                        {artists.map(artist => (
                            <div key={artist.id} className="column">
                                <ArtistCard artist={artist} onUpdate={handleUpdate} />
                            </div>
                        ))}
                    </ul>
                    <br /><br />
                    {isLoading && <p>Cargando más artistas...</p>}
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