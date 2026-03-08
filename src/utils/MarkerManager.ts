import L from 'leaflet';
import type { CategoryDefinition } from '../types';

export class MarkerManager {
  private map: L.Map;
  private layerMap: Map<string, L.LayerGroup> = new Map();
  private visibleMap: Map<string, boolean> = new Map();

  constructor(map: L.Map) {
    this.map = map;
  }

  addCategory(category: CategoryDefinition): void {
    const layerGroup = L.layerGroup();
    const iconSize = category.iconSize || [32, 32];
    const iconAnchor = category.iconAnchor || [16, 16];

    category.markers.forEach(m => {
      const iconUrl = typeof category.iconUrl === 'function'
        ? category.iconUrl(m)
        : category.iconUrl;

      const icon = L.icon({
        iconUrl,
        iconSize: iconSize as L.PointTuple,
        iconAnchor: iconAnchor as L.PointTuple,
        popupAnchor: [0, -iconAnchor[1]]
      });

      L.marker([m.lat, m.lng], { icon })
        .bindPopup(m.popupHtml)
        .addTo(layerGroup);
    });

    this.layerMap.set(category.id, layerGroup);
    this.visibleMap.set(category.id, category.visible);
    if (category.visible) layerGroup.addTo(this.map);
  }

  showLayer(id: string): void {
    const layer = this.layerMap.get(id);
    if (layer && !this.map.hasLayer(layer)) layer.addTo(this.map);
    this.visibleMap.set(id, true);
  }

  hideLayer(id: string): void {
    const layer = this.layerMap.get(id);
    if (layer) this.map.removeLayer(layer);
    this.visibleMap.set(id, false);
  }

  isVisible(id: string): boolean {
    return this.visibleMap.get(id) ?? false;
  }

  getLayer(id: string): L.LayerGroup | undefined {
    return this.layerMap.get(id);
  }
}
