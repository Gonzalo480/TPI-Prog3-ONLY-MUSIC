import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

function AlbumCard({ album, onUpdate, onDelete }) {
    const { user } = useContext(AuthContext);
    const [artistName, setArtistName] = useState('');
    const isValidImage = album.cover && typeof album.cover === 'string' && album.cover.trim() !== '';

    useEffect(() => {
        const fetchArtistName = async () => {
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/artists/${album.artist}/`);
                if (!response.ok) {
                    throw new Error("No se pudo cargar el artista");
                }
                const data = await response.json();
                setArtistName(data.name);
            } catch (e) {
                console.error(e);
            }
        };

        if (album.artist) {
            fetchArtistName();
        }
    }, [album.artist]);

    return (
        <div className={`card has-background-dark album-card`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            {isValidImage ? <img src={album.cover} alt={album.title} /> : <img src="../../../public/artel-diseno-portada.jpg" alt={album.title} />}
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>{album.title}</p>
                        <p className="has-text-white">Artista: {artistName}</p>
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
