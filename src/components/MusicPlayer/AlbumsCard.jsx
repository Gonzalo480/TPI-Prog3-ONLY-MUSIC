import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function AlbumCard({ album, onUpdate, onDelete }) {
    const { user } = useContext(AuthContext);
    const isValidImage = album.cover && typeof album.cover === 'string' && album.cover.trim() !== '';

    return (
        <div className={`card has-background-dark album-card`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                         <>   {isValidImage ? <img src={album.cover} alt={album.title} /> : <></> }</>
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>{album.title}</p>
                        <p className="has-text-white">Artista: {album.artist}</p>
                    </div>
                </div>
                {user && user.user__id === album.owner && (
                    <>
                        <button className="button is-primary" onClick={() => onUpdate(album)}>
                            Actualizar
                        </button>
                        <button className="button is-danger" onClick={() => onDelete(album.id)}>
                            Eliminar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default AlbumCard;
