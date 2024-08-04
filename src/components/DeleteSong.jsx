import React, { useState } from 'react';

function DeleteSong({ songId, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta canción?')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    const token = localStorage.getItem('token');

    if (!token) {
      setError('Debe iniciar sesión para eliminar una canción.');
      setIsDeleting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/songs/${songId}/`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${token}`,
          },
          credentials: 'include',
        }
      );

      if (response.ok) {
        alert('Canción eliminada con éxito.');
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al eliminar la canción.');
      }
    } catch (e) {
      setError('Error de red al intentar eliminar la canción.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Eliminando...' : 'Eliminar'}<i className="fa-solid fa-trash"></i>
      </button>
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

export default DeleteSong;