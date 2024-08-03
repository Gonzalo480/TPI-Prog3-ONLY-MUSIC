import { useState, useEffect } from 'react';

export function useFetchAlbums(page) {
    const [albums, setAlbums] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const doFetch = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/albums/?page=${page}`);
                if (!response.ok) {
                    throw new Error("No se pudieron cargar los álbumes");
                }
                const data = await response.json();
                if (data.results) {
                    setAlbums(prevAlbums => [...prevAlbums, ...data.results]);
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

    return { albums, nextURL, isError, isLoading };
}
