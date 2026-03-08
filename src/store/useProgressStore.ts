import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CategoryProgress {
  [markerIndex: string]: boolean;
}

export interface ProgressState {
  version: number;
  collected: Record<string, CategoryProgress>;
  visibleCategories: Record<string, boolean>;
  settings: {
    hideFound: boolean;
  };

  // Actions
  setCollected: (categoryId: string, index: number, collected: boolean) => void;
  toggleCategory: (categoryId: string) => void;
  setCategoryVisible: (categoryId: string, visible: boolean) => void;
  setAllCategoriesVisible: (visible: boolean, categoryIds: string[]) => void;
  setHideFound: (hide: boolean) => void;
  clearCategory: (categoryId: string) => void;
  clearAll: () => void;
  
  // Logic
  isCollected: (categoryId: string, index: number) => boolean;
  getCategoryProgress: (categoryId: string, total: number) => { collected: number; total: number };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      version: 2,
      collected: {},
      visibleCategories: {},
      settings: {
        hideFound: false,
      },

      setCollected: (categoryId, index, collected) => {
        const state = get();
        const currentCat = state.collected[categoryId] || {};
        const isCurrentlyCollected = !!currentCat[String(index)];
        
        if (isCurrentlyCollected === collected) return;

        const nextCat = { ...currentCat };
        if (collected) {
          nextCat[String(index)] = true;
        } else {
          delete nextCat[String(index)];
        }

        set({
          collected: {
            ...state.collected,
            [categoryId]: nextCat,
          },
        });
      },

      toggleCategory: (categoryId) => {
        const state = get();
        const current = state.visibleCategories[categoryId] ?? true; // Default to true if not set (legacy check)
        
        set({
          visibleCategories: {
            ...state.visibleCategories,
            [categoryId]: !current,
          },
        });
      },

      setCategoryVisible: (categoryId, visible) => {
        const state = get();
        if ((state.visibleCategories[categoryId] ?? false) === visible) return;
        
        set({
          visibleCategories: {
            ...state.visibleCategories,
            [categoryId]: visible,
          },
        });
      },

      setAllCategoriesVisible: (visible, categoryIds) => {
        const nextVisible: Record<string, boolean> = {};
        categoryIds.forEach(id => {
          nextVisible[id] = visible;
        });
        set({ visibleCategories: nextVisible });
      },

      setHideFound: (hide) => {
        const state = get();
        if (state.settings.hideFound === hide) return;
        
        set({
          settings: {
            ...state.settings,
            hideFound: hide,
          },
        });
      },

      clearCategory: (categoryId) => {
        const nextCollected = { ...get().collected };
        delete nextCollected[categoryId];
        set({ collected: nextCollected });
      },

      clearAll: () => {
        set({ collected: {} });
      },

      isCollected: (categoryId, index) => {
        return !!get().collected[categoryId]?.[String(index)];
      },

      getCategoryProgress: (categoryId, total) => {
        const cat = get().collected[categoryId] || {};
        const collectedCount = Object.keys(cat).length;
        return { collected: collectedCount, total };
      },
    }),
    {
      name: 'gta5map-progress-v2',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        collected: state.collected,
        visibleCategories: state.visibleCategories,
        settings: state.settings,
      }),
    }
  )
);
