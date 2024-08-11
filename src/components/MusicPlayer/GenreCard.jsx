import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function GenreCard({ genre, onUpdate, onDelete }) {
    const { user } = useContext(AuthContext);


    return (
        <div className="card">
            <div className='genre-card'>
                <div className="cardcontent">
                    <div className="media">
                        <div className="medialeft"></div>
                        <div className="mediacontent">
                            <p className="title">{genre.name}</p>
                             <p className="title">{genre.id}</p>
                        </div>
                    </div>
                    <div className="content">
                        <p className="hastextwhite">{genre.description}</p>
                    </div>
                    {user && user.user__id === genre.owner && (
                    <div className="buttons">
                    
                        <button
                            className="button is-primary"
                            onClick={() => onUpdate(genre.id)}
                        >
                            Editar
                        </button>
                        <button
                            className="button is-danger"
                            onClick={() => onDelete(genre.id)}
                        >
                            Eliminar
                        </button>
                        
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default GenreCard;
