import { useState, useEffect } from 'react';

export function useFetchPlaylists(page) {
    const [playlists, setPlaylists] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPlaylists = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(
                    `https://sandbox.academiadevelopers.com/harmonyhub/playlists/?page=${page}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: 'include',
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setPlaylists((prevPlaylists) => [...prevPlaylists, ...data.results]);
                    setNextURL(data.next);
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

        fetchPlaylists();
    }, [page]);

    return { playlists, nextURL, isError, isLoading };
}
