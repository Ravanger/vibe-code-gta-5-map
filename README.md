# GTA V Interactive Collectibles & Locations Map

A modern, high-performance interactive map for Grand Theft Auto V collectibles, locations, and points of interest. This project is a refactored and modernized version of the original interactive map, now leveraging a contemporary development stack.

## 🚀 Features

- **Custom Coordinate System:** Accurately maps pixel coordinates to the GTA V in-game grid using a custom Leaflet CRS.
- **Marker Categories & Filtering:** Advanced, searchable sidebar for toggling collectible categories with group-level show/hide controls.
- **Extensible Data Pattern:** Easily add new categories by creating a JSON file in `src/data/categories/` and registering it in `src/data/categories.ts`.
- **Deep Linking:** URL hash integration via `leaflet-hash` for easy sharing of specific map locations.
- **Coordinate Tracking:** Real-time in-game coordinate display via a custom MousePosition control.
- **Image Previews:** Integrated **GLightbox** for viewing in-game screenshots of collectible locations.
- **User Progress Tracking:** Per-collectible completion tracking stored in browser localStorage, with an architecture ready for future account-based sync.
- **Modern UI:** Custom glassmorphism sidebar, smooth animations, and optimized layout.
- **Automated Testing:** Comprehensive suite including unit tests (Vitest) and End-to-End tests (Playwright).

- **[React](https://react.dev/):** Declarative UI library for high-performance components.
- **[Zustand](https://zustand-demo.pmnd.rs/):** Minimalistic, scalable state management for MVVM logic.
- **[Leaflet](https://leafletjs.com/):** Leading open-source library for interactive maps.
- **[React-Leaflet](https://react-leaflet.js.org/):** React bindings for Leaflet.
- **[TypeScript](https://www.typescriptlang.org/):** Ensures code reliability and maintainability.
- **[Vite](https://vitejs.dev/):** Fast development and optimized builds.

### UI & Utilities

- **[Tailwind CSS](https://tailwindcss.com/):** For utility-first responsive styling.
- **[GLightbox](https://biati-digital.github.io/glightbox/):** Modern lightbox for image overlays.
- **[ClipboardJS](https://clipboardjs.com/):** For easy coordinate link sharing.

### Testing

- **[Vitest](https://vitest.dev/):** Fast unit testing framework.
- **[Playwright](https://playwright.dev/):** Reliable end-to-end testing for modern web apps.

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

### Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

### Building for Production

Create an optimized production build in the `dist/` folder:

```bash
npm run build
```

### Running Tests

- **Unit Tests:** `npm test`
- **E2E Tests:** `npm run test:e2e`

## 📂 Data Structure & Extraction

The project now uses a categorized data structure in `src/data/`. To manage the large amount of GTA V data, we use an automated extraction utility:

1. **Raw Data:** Store raw JSON dumps in the root `/data/` directory.
2. **Extraction Script:** Run `node src/utils/extract_data.cjs` to:
   - Parse the raw dumps.
   - Convert geographic coordinates to the app-specific grid.
   - Generate individual category JSON files in `src/data/[group]/`.
   - Auto-generate `src/data/categories.ts` with all required imports and definitions.

## 🗺️ Roadmap

- [x] **Filter System:** Custom sidebar with searchable categories and group-level toggling.
- [x] **Data Expansion:** Automated processing for all 67+ categories including Letter Scraps, Spaceship Parts, etc.
- [x] **UI/UX Overhaul:** Modernized map interface with glassmorphism aesthetics, group-based filtering, and visual stability improvements.
- [x] **User Progress Tracking:** LocalStorage-based progress saving for collected items, with a pluggable design for future account-based backends.
- [ ] **Icon Refresh:** Audit and update map markers with higher-quality, consistent iconography for better clarity at all zoom levels.

## 📜 Credits

- **Original Data:** Special thanks to **[gta-5-map.com](https://gta-5-map.com/)** for providing extensive locations data utilized in this project.
- **Original Author:** Created by [Kirill Krasin (Mo45)](https://github.com/Mo45). Original concept provided by [RockstarHub.ru](https://rockstarhub.ru).
- **Original Repository:** [Mo45/gta5-player-cards-map](https://github.com/Mo45/gta5-player-cards-map)
- **Modernization:** Refactored to TypeScript, migrated to Vite, and modernized with assistance from several AI models to help vibe-code the experience.

---

*This project is for educational and community purposes. Grand Theft Auto V is a trademark of Rockstar Games.*
