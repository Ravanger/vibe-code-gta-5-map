import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createCrs, type MapConfig } from '../../utils/mapUtils';
import { useProgressStore } from '../../store/useProgressStore';
import { categories } from '../../data/categories';
import { CategoryLayer } from './CategoryLayer';

// Ported plugins
import '../../js/L.Control.MousePosition';
import '../../js/leaflet-hash';

const mapConfig: MapConfig = {
  mapExtent: [0, -8192, 8192, 0],
  mapMinZoom: 1,
  mapMaxZoom: 6,
  mapMaxResolution: 0.25,
  tileExtent: [0, -8192, 8192, 0]
};

const MapSetup = ({ onReady }: { onReady: () => void }) => {
  const map = useMap();
  const setupRef = useRef(false);
  
  useEffect(() => {
    if (setupRef.current) return;

    // @ts-ignore
    window.map = map;
    console.log(`MAP INITIALIZED: size is ${JSON.stringify(map.getSize())}`);
    
    // @ts-ignore
    if (!map.mousePositionControl) {
      const ctrl = L.control as any;
      if (typeof ctrl.mousePosition === 'function') {
        ctrl.mousePosition().addTo(map);
        // @ts-ignore
        map.mousePositionControl = true;
      }
    }
    // @ts-ignore
    if (!map.hashControl) {
      // @ts-ignore
      new L.Hash(map);
      // @ts-ignore
      map.hashControl = true;
    }

    setupRef.current = true;
    
    // Ensure map is actually ready and markers can be found
    map.whenReady(() => {
      setTimeout(onReady, 500);
    });
  }, [map, onReady]);

  return null;
};

export const GTA5Map = () => {
  const crs = useMemo(() => createCrs(mapConfig), []);
  const bounds = useMemo(() => {
    // Unproject corners using the CRS
    const c1 = crs.unproject(L.point(mapConfig.mapExtent[0], mapConfig.mapExtent[1]));
    const c2 = crs.unproject(L.point(mapConfig.mapExtent[2], mapConfig.mapExtent[3]));
    return L.latLngBounds(c1, c2);
  }, [crs]);

  const [mapLoaded, setMapLoaded] = useState(false);
  
  const visibleCategories = useProgressStore(state => state.visibleCategories);

  return (
    <div id="map" className="w-full h-full bg-[#0c0c18] relative overflow-hidden" data-map-loaded={mapLoaded}>
      <MapContainer
        center={[-4096, 4096]}
        zoom={2}
        minZoom={mapConfig.mapMinZoom}
        maxZoom={mapConfig.mapMaxZoom}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        crs={crs}
        attributionControl={false}
        className="w-full h-full"
      >
        <MapSetup onReady={() => setMapLoaded(true)} />
        <TileLayer
          url="/images/{z}/{x}/{y}.png"
          tileSize={512}
          noWrap
          // @ts-ignore
          tms={false}
        />
        {categories.map(category => {
          const isVisible = visibleCategories[category.id] ?? category.visible;
          return (
            <CategoryLayer 
              key={category.id} 
              category={category} 
              visible={isVisible} 
            />
          );
        })}
      </MapContainer>
    </div>
  );
};
