import React, { useState, useEffect, useContext } from 'react';
import ArtistCard from './MusicPlayer/ArtistCard'; 
import { useFetchArtists } from '../hooks/useFetchArtists';
import { AuthContext } from '../context/AuthContext';
import './MusicPlayer/Artists.css';
import { useNavigate } from 'react-router-dom';

export default function UserArtists() {
    const [artists, setArtists] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchTotalArtists();
        }
    }, [user]);

    const fetchTotalArtists = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        try {
      
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/harmonyhub/artists/?page=1`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                    credentials: 'include',
                }
            );

            if (response.ok) {
                const data = await response.json();
                const totalArtists = data.count;
                const totalPages = Math.ceil(totalArtists / 10);
                for (let page = 1; page <= totalPages; page++) {
                    await fetchArtists(page, token);
                }
                setIsLoading(false);
            } else {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const fetchArtists = async (page, token) => {
        try {
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/harmonyhub/artists/?page=${page}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                    credentials: 'include',
                }
            );

            if (response.ok) {
                const data = await response.json();
                const userArtists = data.results.filter(artist => artist.owner === user.user__id);
                setArtists((prevArtists) => [...prevArtists, ...userArtists]);
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }
    };

    return (
        <div className='conte'>
            <div className='cuer'>
                {isError && <p className="errormessage">No se pudieron cargar los artistas</p>}
                <div className="my5">
                    <h2 className="title2">Mis Artistas</h2>
                    <ul>
                        {artists.map(artist => (
                            <div key={artist.id} className="column">
                                <ArtistCard artist={artist} />
                            </div>
                        ))}
                    </ul>
                    <br /><br />
                    {isLoading && <><div className="loader-container">
                        <span className="carga">Cargando artistas...</span>
                        <div className="fading-bars">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div></>}
                    <br /><br />
                </div>
            </div>
        </div>
    );
}
