import { useState, useEffect } from 'react';

export function useFetchSongs(page) {
    const [songs, setSongs] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const doFetch = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/songs/`);
                if (!response.ok) {
                    throw new Error("No se pudieron cargar las canciones");
                }
                const data = await response.json();
                if (data.results) {
                    setSongs(prevSongs => [...prevSongs, ...data.results]);
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

    return { songs, nextURL, isError, isLoading };
}
