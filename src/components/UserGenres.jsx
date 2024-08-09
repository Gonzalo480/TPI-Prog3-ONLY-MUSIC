import React, { useState, useEffect, useContext } from 'react';
import GenreCard from './MusicPlayer/GenreCard';
import { AuthContext } from '../context/AuthContext';
import './MusicPlayer/Genre.css';
import { useNavigate } from 'react-router-dom';

export default function UserGenres() {
    const [genres, setGenres] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchAllGenres();
        }
    }, [user]);

    const fetchAllGenres = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/harmonyhub/genres/?page=1`,
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
                const totalGenres = data.count;
                const totalPages = Math.ceil(totalGenres / 10);
                for (let page = 1; page <= totalPages; page++) {
                    await fetchGenresByPage(page, token);
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

    const fetchGenresByPage = async (page, token) => {
        try {
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/harmonyhub/genres/?page=${page}`,
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
                const userGenres = data.results.filter(genre => genre.owner === user.user__id);
                setGenres((prevGenres) => [...prevGenres, ...userGenres]);
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
                {isError && <p className="errormessage">No se pudieron cargar los géneros</p>}
                <div className="my5">
                    <h2 className="title2">Mis Géneros</h2>
                    <ul>
                        {genres.map(genre => (
                            <div key={genre.id} className="column">
                                <GenreCard genre={genre} />
                            </div>
                        ))}
                    </ul>
                    <br /><br />
                    {isLoading && <p>Cargando géneros...</p>}
                    <br /><br />
                </div>
            </div>
        </div>
    );
}

