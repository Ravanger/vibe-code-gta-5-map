import React, { useMemo, useCallback } from 'react';
import { LayerGroup, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { CategoryDefinition, MarkerData } from '../../types';
import { useProgressStore } from '../../store/useProgressStore';
import { MarkerPopup } from './MarkerPopup';

interface Props {
  category: CategoryDefinition;
  visible: boolean;
}

// Internal Marker component to isolate re-renders of individual markers
const MemoizedMarker: React.FC<{
  marker: MarkerData;
  category: CategoryDefinition;
  index: number;
  isCollected: boolean;
  icon: L.Icon;
}> = React.memo(({ marker, category, index, isCollected, icon }) => {
  return (
    <Marker
      position={[marker.lat, marker.lng]}
      icon={icon}
    >
      <Popup className="gta-popup">
        <MarkerPopup 
          marker={marker} 
          category={category} 
          index={index} 
          isCollected={isCollected} 
        />
      </Popup>
    </Marker>
  );
});

export const CategoryLayer: React.FC<Props> = React.memo(({ category, visible }) => {
  const hideFound = useProgressStore(state => state.settings.hideFound);
  const collectedMarkers = useProgressStore(state => state.collected[category.id]);

  const iconSize = useMemo(() => (category.iconSize || [32, 32]) as L.PointTuple, [category.iconSize]);
  const iconAnchor = useMemo(() => (category.iconAnchor || [16, 16]) as L.PointTuple, [category.iconAnchor]);

  const getIcon = useCallback((marker: MarkerData, isCollected: boolean) => {
    const iconUrl = typeof category.iconUrl === 'function' ? category.iconUrl(marker) : category.iconUrl;
    const className = isCollected ? 'marker--collected' : '';
    
    return L.icon({
      iconUrl,
      iconSize,
      iconAnchor,
      popupAnchor: [0, -iconAnchor[1]],
      className
    });
  }, [category.iconUrl, iconSize, iconAnchor]);

  // IMPORTANT: We return NULL here if not visible.
  // This removes markers from the map when category is toggled OFF.
  if (!visible) return null;

  return (
    <LayerGroup>
      {category.markers.map((marker, index) => {
        const isCollected = !!(collectedMarkers && collectedMarkers[String(index)]);
        if (hideFound && isCollected) return null;

        const icon = getIcon(marker, isCollected);

        return (
          <MemoizedMarker
            key={`${category.id}-${index}`}
            marker={marker}
            category={category}
            index={index}
            isCollected={isCollected}
            icon={icon}
          />
        );
      })}
    </LayerGroup>
  );
});
