import React from 'react';

function GenreCard({ genre }) {
    return (
        <div className="card">
            <div className='genre-card' >
            <div className="cardcontent">
                <div className="media">
                    <div className="medialeft">
                    </div>
                    <div className="mediacontent">
                        <p className="title">{genre.name}</p>
                    </div>
                </div>
                <div className="content">
                    <p className="hastextwhite">{genre.description}</p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default GenreCard;
