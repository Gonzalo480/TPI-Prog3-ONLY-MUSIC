import React, { useState } from 'react';


function DeleteSong({ songId, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que quieres eliminar esta canción?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión para eliminar una canción.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
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
        Swal.fire({
          title: 'Eliminado',
          text: 'La canción ha sido eliminada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(() => {
          if (onDeleteSuccess) {
            onDeleteSuccess();
          }
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al eliminar la canción.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al intentar eliminar la canción.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
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
