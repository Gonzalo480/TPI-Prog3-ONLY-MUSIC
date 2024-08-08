import { useState, useEffect } from "react";

const API_BASE_URL = "https://sandbox.academiadevelopers.com/harmonyhub";

const useFetchData = (token) => {
  const [albums, setAlbums] = useState({});
  const [genres, setGenres] = useState({});
  const [artists, setArtists] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWithAuth = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const fetchAllItems = async (endpoint) => {
    const countResponse = await fetchWithAuth(`${API_BASE_URL}/${endpoint}/?page_size=1`);
    const totalItems = countResponse.count;
    return fetchWithAuth(`${API_BASE_URL}/${endpoint}/?page_size=${totalItems}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumsData, genresData, artistsData] = await Promise.all([
          fetchAllItems('albums'),
          fetchAllItems('genres'),
          fetchAllItems('artists'),
        ]);

        const albumsMap = {};
        albumsData.results.forEach((album) => {
          albumsMap[album.id] = album.title;
        });

        const genresMap = {};
        genresData.results.forEach((genre) => {
          genresMap[genre.id] = genre.name;
        });

        const artistsMap = {};
        artistsData.results.forEach((artist) => {
          artistsMap[artist.id] = artist.name;
        });

        setAlbums(albumsMap);
        setGenres(genresMap);
        setArtists(artistsMap);
        setIsLoading(false);
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { albums, genres, artists, isLoading, error };
};

export default useFetchData;