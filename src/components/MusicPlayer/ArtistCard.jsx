import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function ArtistCard({ artist, onUpdate, onDelete }) {
    const { user } = useContext(AuthContext);
    const isValidImage = artist.image && typeof artist.image === 'string' && artist.image.trim() !== '';

    return (
        <div className={`card has-background-dark artist-card`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        {isValidImage ? (
                            <figure className="image is-48x48">
                                <img src={artist.image} alt={artist.name} />
                            </figure>
                        ) : (
                            <figure className="image is-48x48">
                                <img src="artel-diseno-portada.jpg" alt={artist.name} />
                            </figure>
                        )}
                    </div>
                    <div className="media-content">
                        <p className="title3">
                            {artist.name}
                        </p>
                        <p className='info2'>{artist.bio}</p>
                        {artist.website !== null && (
                            <a className='info3' href={artist.website}>WebSite</a>)}
                    </div>
                </div>
                {user && user.user__id === artist.owner && (
                    <>
                        <button className="button is-primary" onClick={() => onUpdate(artist)}>
                            Actualizar
                        </button>
                        <button className="button is-danger" onClick={() => onDelete(artist.id)}>
                            Eliminar
                        </button>
                    </>
                )}
                <br /><br />
            </div>
        </div>
    );
}

export default ArtistCard;
