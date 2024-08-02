import React from 'react';
import './Genres.css';

function GenreCard({ genre }) {
    return (
        <div className="card has-background-dark genre-card">
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                    </div>
                    <div className="media-content">
                        <p className="title is-4 has-text-white">{genre.name}</p>
                    </div>
                </div>
                <div className="content">
                    <p className="has-text-white">{genre.description}</p>
                </div>
            </div>
        </div>
    );
}

export default GenreCard;
