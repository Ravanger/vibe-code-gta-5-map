import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'glightbox/dist/css/glightbox.min.css';
import './css/style.css';
import './css/L.Control.MousePosition.css';

// Import local plugins
import './js/L.Control.MousePosition';
import './js/leaflet-hash';

import ClipboardJS from 'clipboard';
import GLightbox from 'glightbox';

import { createCrs, getMapBounds, type MapConfig } from './utils/mapUtils';
import { MarkerManager } from './utils/MarkerManager';
import { categories } from './data/categories';

const config: MapConfig = {
  mapExtent: [0, -8192, 8192, 0],
  mapMinZoom: 1,
  mapMaxZoom: 6,
  mapMaxResolution: 0.25,
  tileExtent: [0, -8192, 8192, 0]
};

const mapElement = document.getElementById("map");

if (mapElement) {
  const crs = createCrs(config);

  const map = new L.Map("map", {
    maxZoom: config.mapMaxZoom,
    minZoom: config.mapMinZoom,
    crs: crs
  });

  // @ts-ignore
  window.map = map;

  L.tileLayer("/images/{z}/{x}/{y}.png", {
    minZoom: config.mapMinZoom,
    maxZoom: config.mapMaxZoom,
    tileSize: 512,
    attribution: 'Created by <a href="https://github.com/Mo45">Kirill Krasin</a>. &copy; <a href="https://rockstarhub.ru">RockstarHub.ru</a>',
    noWrap: true,
    // @ts-ignore
    tms: false
  }).addTo(map);

  map.fitBounds(getMapBounds(crs, config));

  // @ts-ignore
  L.control.mousePosition().addTo(map);
  // @ts-ignore
  new L.Hash(map);

  // Initialize Marker Manager
  const markerManager = new MarkerManager(map);
  
  categories.forEach(category => {
    markerManager.addCategory(category);
  });

  // Add Layer Control
  L.control.layers(undefined, markerManager.getLayersMap(), { collapsed: false }).addTo(map);

  // Initialize Clipboard
  new ClipboardJS('.copy');

  // Initialize GLightbox
  const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
  });

  // Refresh GLightbox whenever a popup is opened
  map.on('popupopen', () => {
    lightbox.reload();
  });
}
