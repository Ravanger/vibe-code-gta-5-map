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
  - Covers CRS calculations, scale/zoom logic, map bounds, and the central storage utility.
  - Includes data validation for `markers.json`.
- **E2E Tests:** Located in `tests/` (Playwright).
  - Verifies map loading, marker presence, popup functionality, URL hash updates, and mouse position control.

## Recent Changes

- Added comprehensive unit tests for `mapUtils`.
- Added marker data schema validation.
- Expanded E2E tests to cover URL hash and mouse position interactions.
- Implemented `UserProgressStore` with a LocalStorage-backed backend to track collectible progress by `(categoryId, markerIndex)`.
- Refactored storage into a central `src/utils/storage.ts` utility using `store.js` for robust persistence and automatic serialization, replacing direct `localStorage` access.
- Wired progress into `main.ts`, `MarkerManager`, and `LayerSidebar` so that:
  - Popups allow marking collectibles as collected (fixed a bug in `main.ts` where attributes were being read from the wrong element).
  - Sidebar shows `collected/total` counts per category.
  - Collected markers are visually de-emphasized on the map.
- Fixed Build Errors:
  - Installed `@types/store` and removed `@types/storejs` to resolve module declaration issues.
  - Refactored tests to avoid parameter properties, satisfying `erasableSyntaxOnly` requirements in newer TypeScript configurations.
- Streamlined Sidebar UI: Removed redundant category checkboxes (color dots) to expand the name area and focus on the toggle slider.
- Improved Documentation: Reorganized `README.md` to move technology stack details (React, Zustand, etc.) into a dedicated "Tech Stack" section.
- Implemented Advanced Search:
  - Updated Sidebar filtering logic to search within marker titles and popup descriptions (stripping HTML for clean matching).
  - Modified `GroupSection` to automatically expand categories that contain search matches.
  - Updated E2E tests to accommodate DOM-based filtering (elements being removed vs hidden).
