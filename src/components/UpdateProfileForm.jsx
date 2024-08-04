import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./newSongForm.module.css";

function UpdateProfileForm() {
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Debe iniciar sesión para actualizar su perfil.");
      return;
    }

    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/users/profiles/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUsername(userData.username);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
        setDob(userData.dob || "");
        setBio(userData.bio || "");
      } else {
        setError("Error al cargar los datos del usuario.");
      }
    } catch (e) {
      setError("Error de red al cargar los datos del usuario.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Debe iniciar sesión para actualizar su perfil.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("bio", bio);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/users/profiles/${userId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        setSuccess(true);
        alert("Perfil actualizado con éxito.");
        window.location.href = '/profile';
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al actualizar el perfil.");
        alert("Error al actualizar el perfil: " + (errorData.message || "Intente nuevamente."));
      }
    } catch (e) {
      setError("Error de red al actualizar el perfil.");
      alert("Error de red al actualizar el perfil. Por favor, intente nuevamente.");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.cuerp}>
      <h1 className={styles.acheuno}>Actualizar Perfil</h1>
      <div className="update-profile-form-container">
        <div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Perfil actualizado con éxito.</div>}
        </div>
        <div className={styles.contenido}>
          <form onSubmit={handleSubmit} className={styles.newsongformcontainer}>
            <label>
              Usuario: <br />
              <input
                className={styles.miinput}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Nombre: <br />
              <input
                className={styles.miinput}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Apellido: <br />
              <input
                className={styles.miinput}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Email: <br />
              <input
                className={styles.miinput}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Fecha de nacimiento: <br />
              <input
                className={styles.miinput}
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </label>
            <br />
            <label>
              Biografía: <br />
              <textarea
                className={styles.miinput}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={1000}
              />
            </label>
            <br />
            <label>
              Imagen de perfil: <br />
              <input
                className={styles.miinput}
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
            <br />
            <button className={styles.buttonnew} type="submit">Actualizar Perfil</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfileForm;