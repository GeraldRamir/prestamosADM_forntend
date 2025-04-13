import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Estilos globales (si tienes)

import App from './App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('..public/service-worker.js')  // Registra el Service Worker
      .then(() => console.log('Service Worker registrado'))
      .catch((error) => console.error('Error al registrar el Service Worker:', error));
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
