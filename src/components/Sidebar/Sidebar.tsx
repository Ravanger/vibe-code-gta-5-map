import React, { useState, useMemo, useCallback } from 'react';
import type { CategoryDefinition, CategoryGroup } from '../../types';
import { categories } from '../../data/categories';
import { useProgressStore } from '../../store/useProgressStore';
import { GroupSection } from './GroupSection';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  
  const setHideFound = useProgressStore(state => state.setHideFound);
  const hideFound = useProgressStore(state => state.settings.hideFound);
  const setAllCategoriesVisible = useProgressStore(state => state.setAllCategoriesVisible);

  const groupedCategories = useMemo(() => {
    const map = new Map<CategoryGroup, CategoryDefinition[]>();
    categories.forEach(c => {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    });
    return map;
  }, []);

  const categoryIds = useMemo(() => categories.map(c => c.id), []);

  const groupOrder: CategoryGroup[] = [
    'Locations', 'Activities', 'Entertainment', 'Services', 
    'Collectibles', 'Places', 'Items', 'Quests', 'Online', 
    'Mysteries', 'Other'
  ];

  const handleShowAll = useCallback(() => {
    setAllCategoriesVisible(true, categoryIds);
  }, [setAllCategoriesVisible, categoryIds]);

  const handleHideAll = useCallback(() => {
    setAllCategoriesVisible(false, categoryIds);
  }, [setAllCategoriesVisible, categoryIds]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleToggleHideFound = useCallback(() => {
    setHideFound(!hideFound);
  }, [hideFound, setHideFound]);

  return (
    <div 
      id="sidebar" 
      className={`sidebar flex flex-col bg-[#0c0c18] border-r border-[#1e1e2d] transition-transform duration-300 ${collapsed ? 'sidebar--collapsed' : ''}`}
      role="complementary"
      aria-label="Map categories"
    >
      <div id="sb-header" className="flex items-center justify-between p-4 border-b border-[#1e1e2d]">
        <div className="sb-brand flex items-center gap-2">
          <svg className="sb-brand-icon w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 16l4.553-2.276A1 1 0 0021 19.382V8.618a1 1 0 00-.553-.894L15 5m0 18V5m0 0L9 7"/>
          </svg>
          <span className="sb-brand-text text-white font-semibold flex items-center gap-1">GTA V<strong className="text-blue-400">Map</strong></span>
        </div>
        <button 
          id="sb-collapse-btn"
          onClick={toggleCollapsed}
          className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className={`w-6 h-6 transform transition-transform ${collapsed ? '' : 'rotate-180'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 19l-7-7 7-7" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div id="sb-body" className="flex-1 overflow-y-auto overflow-x-hidden p-4">
        <div id="sb-search-wrap" className="relative mb-6">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" strokeWidth="2"/>
          </svg>
          <input 
            id="sb-search"
            type="search" 
            placeholder="Filter categories…" 
            className="w-full bg-[#1e1e2d] text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div id="sb-global-actions" className="grid grid-cols-2 gap-2 mb-6">
          <button id="btn-show-all" onClick={handleShowAll} className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-800 text-gray-300 text-xs hover:bg-blue-600 hover:text-white transition-all">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="2"/><circle cx="12" cy="12" r="3" strokeWidth="2"/>
            </svg>
            Show All
          </button>
          <button id="btn-hide-all" onClick={handleHideAll} className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-800 text-gray-300 text-xs hover:bg-red-600 hover:text-white transition-all">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" strokeWidth="2"/>
            </svg>
            Hide All
          </button>
          <button 
            id="btn-toggle-collected"
            onClick={handleToggleHideFound}
            className={`col-span-2 flex items-center justify-center gap-2 p-2 rounded-lg text-xs transition-all ${hideFound ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" strokeWidth="2"/>
            </svg>
            {hideFound ? 'Show Found' : 'Hide Found'}
          </button>
        </div>

        <div id="sb-cats" className="space-y-4">
          {groupOrder.map(groupName => {
            const groupCats = groupedCategories.get(groupName);
            if (!groupCats) return null;
            return (
              <GroupSection 
                key={groupName} 
                group={groupName} 
                categories={groupCats}
                search={search}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
