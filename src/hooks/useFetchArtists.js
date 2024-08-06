import { useState, useEffect } from 'react';

export function useFetchArtists(page) {
    const [artists, setArtists] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const doFetch = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/artists/?page=${page}`);
                if (!response.ok) {
                    throw new Error("No se pudieron cargar los artistas");
                }
                const data = await response.json();
                if (data.results) {
                    setArtists(prevArtists => [...prevArtists, ...data.results]);
                    setNextURL(data.next);
                }
            } catch (e) {
                setIsError(true);
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        doFetch();
    }, [page]);

    return { artists, nextURL, isError, isLoading };
}