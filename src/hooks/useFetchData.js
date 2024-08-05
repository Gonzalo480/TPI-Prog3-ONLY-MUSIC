// src/hooks/useFetchData.js
import { useState, useEffect } from "react";

const API_BASE_URL = "https://sandbox.academiadevelopers.com/harmonyhub";

const useFetchData = (token) => {
  const [albums, setAlbums] = useState({});
  const [genres, setGenres] = useState({});
  const [artists, setArtists] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumsResponse, genresResponse, artistsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/albums/`, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${token}`,
            },
            credentials: "include",
          }),
          fetch(`${API_BASE_URL}/genres/`, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${token}`,
            },
            credentials: "include",
          }),
          fetch(`${API_BASE_URL}/artists/`, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${token}`,
            },
            credentials: "include",
          }),
        ]);

        if (!albumsResponse.ok || !genresResponse.ok || !artistsResponse.ok) {
          throw new Error("Error al cargar los datos.");
        }

        const [albumsData, genresData, artistsData] = await Promise.all([
          albumsResponse.json(),
          genresResponse.json(),
          artistsResponse.json(),
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
