import React, { useState, useEffect } from 'react';
import estilos from './slider.module.css';

function Slider() {
  const imagenes = [
    "../../public/promos/promo.png",
    "../../public/promos/preview-page0.jpg",
    "../../public/promos/encabezado-twitter-festival.jpg",
    "../../public/promos/banner-twitch-colorido.jpg"
  ];
  const [imagenActual, setImagenActual] = useState(0);
  const cantidad = imagenes?.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImagenActual((prevImagen) => (prevImagen + 1) % cantidad);
    }, 8000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [cantidad]); // El segundo argumento asegura que se ejecute cuando cambie la cantidad de imágenes

  const siguienteImagen = () => {
    setImagenActual((prevImagen) => (prevImagen + 1) % cantidad);
  };

  const anteriorImagen = () => {
    setImagenActual((prevImagen) => (prevImagen - 1 + cantidad) % cantidad);
  };

  return (
    <div className={estilos.containers}>
      <button onClick={anteriorImagen}>←</button>
      {imagenes.map((imagen, index) => (
        <div
          key={index}
          className={
            imagenActual === index
              ? `${estilos.slide} ${estilos.active}`
              : estilos.slide
          }
        >
          {imagenActual === index && <img src={imagen} alt="imagen" />}
        </div>
      ))}
      <button onClick={siguienteImagen}>→</button>
    </div>
  );
}

export default Slider;
