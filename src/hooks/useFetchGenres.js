import { useState, useEffect } from 'react';

export function useFetchGenres(page) {
    const [genres, setGenres] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const doFetch = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/genres/?page=${page}`);
                if (!response.ok) {
                    throw new Error("No se pudieron cargar los géneros");
                }
                const data = await response.json();
                if (data.results) {
                    setGenres(prevGenres => [...prevGenres, ...data.results]);
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

    return { genres, nextURL, isError, isLoading };
}
