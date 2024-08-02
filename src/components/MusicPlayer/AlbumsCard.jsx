import React from 'react';
import './Albums.css';

function AlbumCard({ album }) {
    console.log(album.cover_image);

    return (
        <div className={`card has-background-dark album-card`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={album.cover} alt={album.cover} />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {album.title}
                        </p>
                        <p className={`subtitle is-6 has-text-white`}>
                            {album.artist}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <p className="has-text-white">
                        {album.description}
                    </p>
                    <p className="has-text-white">
                        {`Released: ${album.release_date}`}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AlbumCard;
