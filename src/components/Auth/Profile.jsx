import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './profile.module.css';

function Profile() {
    const { user, isLoading, logout } = useContext(AuthContext);

    if (isLoading) return <div className={styles.loadingmessage}>Loading...</div>;

    return (
        <div className={styles.cuerpo}>
            <div className={styles.profilecontainer}>
                <div className={styles.profilecard}>
                    {user ? (
                        <div>
                            <h1 className={styles.profileheading}>Perfil</h1>
                            <img src={user.image === null ? "../../../public/user.png" : `http://sandbox.academiadevelopers.com/${user.image}`} alt="imagen usuario" />
                            <br />
                            <p className={styles.profiletext}>ID: {user.user__id}</p>
                            <p className={styles.profiletext}>Usuario: {user.username}</p>
                            <p className={styles.profiletext}>Nombre: {user.first_name}</p>
                            <p className={styles.profiletext}>Apellido: {user.last_name}</p>
                            <p className={styles.profiletext}>Email: {user.email}</p>
                            <p className={styles.profiletext}>Biografia: {user.bio}</p>
                            
                            
                            <button className={styles.profilebutton} onClick={() => (window.location.href = `/songsuser`)}>Mis Canciones Subidas</button>
                            <button className={styles.profilebutton} onClick={() => (window.location.href = `/userplaylist`)}>Mis PlayList</button>
                            <button className={styles.profilebutton} onClick={() => (window.location.href = `/updateprofile/${user.user__id}`)}>Actualizar</button>
                            <br />
                            <button className={styles.profilebutton} onClick={logout}>Cerrar la sesión</button>
                            <br />
                        </div>
                    ) : (
                        <div>
                            <h1>No se ha iniciado sesión</h1>
                            <div className={styles.profilebuttons}>
                                <button className={styles.profilebutton} onClick={() => (window.location.href = '/login')}>Iniciar sesión</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <br /><br /><br />
        </div>
    );
}

export default Profile;

