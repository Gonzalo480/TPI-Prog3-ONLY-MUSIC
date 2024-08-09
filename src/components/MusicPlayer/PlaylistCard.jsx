import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


function PlaylistCard({ playlist, onUpdate, onDelete }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleOpenPlaylist = () => {
        navigate(`/playlists/${playlist.id}`);
    };


    const handleOpenProfile = () => {
        navigate(`/viewerprofile/${playlist.owner}`);
    };

    return (
        <div className={`card has-background-dark playlist-card`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="titlep">{playlist.name}</p>
                        <p className="has-text-white">Creador:  {playlist.owner}</p>
                        <button className="button is-link" onClick={handleOpenProfile}>
                        Ver Perfil
                        </button>
                       <br /><br />
                    </div>
                </div>
                <div className="content">
                    <p className="has-text-white">Descripcion: {playlist.description}</p>
                    <p className="has-text-white">{`Pública: ${playlist.public ? 'Sí' : 'No'}`}</p>
                    <p className="has-text-white">{`Entradas: ${playlist.entries.length}`}</p>
                </div>
                {playlist.entries.length === 0 ? (
                    <p className="has-text-warning">Playlist vacía</p>
                ) : (
                    <button className="button is-link" onClick={handleOpenPlaylist}>
                        Abrir Playlist
                    </button>
                )}
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
