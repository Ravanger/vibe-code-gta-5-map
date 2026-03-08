# HOWTO: Converting Dumped Data for the Map App

This guide explains how to take locations from `gta-v-locations.json` and convert them into a format compatible with our map application.

## Prerequisites

- `gta-v-locations.json`: The categorized data dump.
- `map_converter.cjs`: The coordinate transformation utility.

## Conversion Process

### 1. Create a Conversion Script

Create a script (e.g., `convert_category.cjs`) to extract a specific category and transform its coordinates.

```javascript
const fs = require('fs');
const { geographicToApp } = require('../src/utils/map_converter.cjs');

// Load the dump
const dump = JSON.parse(fs.readFileSync('../data/gta-v-locations.json', 'utf8'));

// Choose a category (e.g., "Locations" -> "Ammu-Nation")
const sourceMarkers = dump["Locations"]["Ammu-Nation"];

const convertedMarkers = sourceMarkers.map(m => {
    // 1. Convert coordinates
    const coords = geographicToApp(m.lat, m.lng);
    
    // 2. Map to MarkerData interface
    return {
        lat: coords.lat,
        lng: coords.lng,
        title: m.title,
        icon: m.icon,
        // Build popup HTML
        popupHtml: `<h2>${m.title}</h2><p>${m.description || ''}</p>`
    };
});

// Save to the app's data directory
fs.writeFileSync(
    '../src/data/categories/locations/ammu_nation.json', 
    JSON.stringify(convertedMarkers, null, 2)
);

console.log(`Converted ${convertedMarkers.length} markers.`);
```

### 2. Register the New Category

Update `src/data/categories.ts` to include the new data file.

```typescript
// 1. Import the new JSON
import ammuNation from './categories/ammu_nation.json';

export const categories: CategoryDefinition[] = [
  // ... existing categories
  {
    id: 'ammu_nation',
    name: 'Ammu-Nation',
    // Define how icons are resolved
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: ammuNation as MarkerData[],
    visible: true
  }
];
```

## Tips for Better Popups

The `gta-v-locations.json` contains media links. You can incorporate them into the `popupHtml`:

```javascript
const popupHtml = `
    <h2>${m.title}</h2>
    ${m.media.length > 0 ? `<img src="${m.media[0].url}" style="width:100%"/>` : ''}
    <p>${m.description || ''}</p>
`;
```

## Coordinate System Note

- **Source (Dump):** Geographic Latitude/Longitude (Mercator).
- **App:** Custom pixel-based `L.CRS.Simple` (0 to -8192).
- **Conversion:** Always use `geographicToApp(lat, lng)` from `map_converter.cjs` to ensure alignment.
