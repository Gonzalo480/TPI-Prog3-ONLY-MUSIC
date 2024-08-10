import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './profileViewer.module.css';

const ProfileViewer = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://sandbox.academiadevelopers.com/users/profiles/${id}/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('No se pudo cargar el perfil');
        }

        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, token]);

  if (loading) return <div>Cargando perfil...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No se encontró el perfil</div>;

  return (
    <div className={styles.cuerpo}>
    <div className={styles.profileContainer}>
      
      <div className={styles.profilecard}>
      <h1 className={styles.profileheading}>Perfil de Usuario</h1>

        <img src={profile.image === null ? "user.png" : `http://sandbox.academiadevelopers.com/${profile.image}`} alt="imagen usuario" />
        <br /><br />
        <p className={styles.profiletext}>Nombre de usuario: {profile.username}</p>
        <p className={styles.profiletext}>Nombre: {profile.first_name} {profile.last_name}</p>
        <p className={styles.profiletext}>Email: {profile.email}</p>
        <p className={styles.profiletext}>Fecha de nacimiento: {profile.dob || 'No especificada'}</p>
        <p className={styles.profiletext}>Biografía: {profile.bio || 'No especificada'}</p>
        <p className={styles.profiletext}>Estado: {profile.state || 'No especificado'}</p>
      </div>
    </div>
    </div>
  );
};

export default ProfileViewer;