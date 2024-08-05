import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./navBar.module.css";

function SearchSongs() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const formattedSearchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const searchWords = formattedSearchTerm.split(' ');
    
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No se encontró el token de autenticación");
      return;
    }

    try {
      const searchPromises = searchWords.map(word => 
        fetch(
          `https://sandbox.academiadevelopers.com/harmonyhub/songs/?title=${encodeURIComponent(word)}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        ).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      );

      const searchResults = await Promise.all(searchPromises);
      const combinedResults = Array.from(new Set(searchResults.flatMap(result => result.results)));
    
      navigate('/search-results', { state: { results: combinedResults } });
    } catch (e) {
      console.error("Error al buscar canciones:", e.message);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        className={styles.busqueda}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar canciones por Titulo"
      />
      <button className={styles.btn3} type="submit">Buscar </button>
    </form>
  );
}

export default SearchSongs;