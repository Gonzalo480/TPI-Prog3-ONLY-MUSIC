import React from 'react';
import './Artists.css';

function ArtistCard({ artist }) {
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
                            <div style={{ width: '48px', height: '48px' }}></div>
                        )}
                    </div>
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {artist.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistCard;
