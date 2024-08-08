import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Playlists.css';

function PlaylistCard({ playlist, onUpdate, onDelete }) {
    const { user } = useContext(AuthContext);

    return (
        <div className={`card has-background-dark playlist-card`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>{playlist.name}</p>
                        <p className={`subtitle is-6 has-text-white`}>{playlist.owner}</p>
                    </div>
                </div>
                <div className="content">
                    <p className="has-text-white">{playlist.description}</p>
                    <p className="has-text-white">{`Pública: ${playlist.public ? 'Sí' : 'No'}`}</p>
                    <p className="has-text-white">{`Entradas: ${playlist.entries}`}</p>
                </div>
                {user && user.user__id === playlist.owner && (
                    <>
                        <button className="button is-primary" onClick={() => onUpdate(playlist)}>
                            Actualizar
                        </button>
                        <button className="button is-danger" onClick={() => onDelete(playlist.id)}>
                            Eliminar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PlaylistCard;
