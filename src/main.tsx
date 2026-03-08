import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/style.css';

window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.log('BROWSER CRASH:', msg, url, lineNo, columnNo, error);
  return false;
};
import './css/L.Control.MousePosition.css';
import 'leaflet/dist/leaflet.css';
import 'glightbox/dist/css/glightbox.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
