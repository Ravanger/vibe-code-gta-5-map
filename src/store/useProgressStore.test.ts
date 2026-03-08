import { describe, it, expect, beforeEach } from 'vitest';
import { useProgressStore } from './useProgressStore';

describe('useProgressStore', () => {
  beforeEach(() => {
    useProgressStore.setState({
      collected: {},
      visibleCategories: {},
      expandedGroups: {},
      settings: { hideFound: false, markerSearchQuery: '' }
    });
  });

  it('initializes with default state', () => {
    const state = useProgressStore.getState();
    expect(state.collected).toEqual({});
    expect(state.expandedGroups).toEqual({});
    expect(state.settings.hideFound).toBe(false);
  });

  it('tracks collected markers', () => {
    const { setCollected, isCollected, getCategoryProgress } = useProgressStore.getState();
    
    setCollected('cat1', 0, true);
    expect(isCollected('cat1', 0)).toBe(true);
    expect(isCollected('cat1', 1)).toBe(false);

    const progress = getCategoryProgress('cat1', 10);
    expect(progress.collected).toBe(1);
    expect(progress.total).toBe(10);
  });

  it('toggles category visibility', () => {
    const { toggleCategory } = useProgressStore.getState();
    
    toggleCategory('cat1');
    expect(useProgressStore.getState().visibleCategories['cat1']).toBe(false);
    
    toggleCategory('cat1');
    expect(useProgressStore.getState().visibleCategories['cat1']).toBe(true);
  });

  it('manages group expansion state', () => {
    const { toggleGroupExpanded, setGroupExpanded } = useProgressStore.getState();
    
    // Toggle (defaults to true, so first toggle makes it false)
    toggleGroupExpanded('Locations');
    expect(useProgressStore.getState().expandedGroups['Locations']).toBe(false);
    
    toggleGroupExpanded('Locations');
    expect(useProgressStore.getState().expandedGroups['Locations']).toBe(true);

    // Explicit set
    setGroupExpanded('Activities', false);
    expect(useProgressStore.getState().expandedGroups['Activities']).toBe(false);
  });

  it('manages hideFound setting', () => {
    const { setHideFound } = useProgressStore.getState();
    
    setHideFound(true);
    expect(useProgressStore.getState().settings.hideFound).toBe(true);
  });

  it('clears all collected markers', () => {
    const { setCollected, clearAll } = useProgressStore.getState();
    
    setCollected('cat1', 0, true);
    setCollected('cat2', 5, true);
    
    clearAll();
    expect(useProgressStore.getState().collected).toEqual({});
  });
});
