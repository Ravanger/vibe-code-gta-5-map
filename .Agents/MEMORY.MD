# Project Memory

## Map Configuration
- **Map Extent:** `[0, -8192, 8192, 0]` (GTA 5 coordinate system style)
- **Zoom Range:** 1 to 6
- **Tile Size:** 512px
- **Coordinate System:** Custom CRS based on Leaflet's `L.CRS.Simple`.

## Key Components
- **Leaflet:** Main map library.
- **Markers:** Loaded from `src/data/markers.json`.
- **Plugins:**
  - `leaflet-hash`: For URL-based coordinate tracking.
  - `L.Control.MousePosition`: Custom coordinate display in the bottom-left corner.
- **ClipboardJS:** Used for copying coordinate links in popups.
- **Lightbox2:** For image viewing (referenced in `main.ts`).

## Testing Strategy
- **Unit Tests:** Located in `src/**/*.test.ts` (Vitest).
  - Covers CRS calculations, scale/zoom logic, and map bounds.
  - Includes data validation for `markers.json`.
- **E2E Tests:** Located in `tests/` (Playwright).
  - Verifies map loading, marker presence, popup functionality, URL hash updates, and mouse position control.

## Recent Changes
- Added comprehensive unit tests for `mapUtils`.
- Added marker data schema validation.
- Expanded E2E tests to cover URL hash and mouse position interactions.
