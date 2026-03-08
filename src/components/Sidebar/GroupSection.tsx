import React, { useState, useCallback, useMemo } from 'react';
import type { CategoryDefinition, CategoryGroup } from '../../types';
import { useProgressStore } from '../../store/useProgressStore';
import { CategoryItem } from './CategoryItem';

const GROUP_META: Record<string, { color: string; path: string }> = {
  Locations:     { color: '#60a5fa', path: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  Activities:    { color: '#fbbf24', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
  Entertainment: { color: '#c084fc', path: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z' },
  Services:      { color: '#34d399', path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  Collectibles:  { color: '#fb923c', path: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  Places:        { color: '#6ee7b7', path: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  Items:         { color: '#f472b6', path: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  Quests:        { color: '#fde68a', path: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9' },
  Online:        { color: '#38bdf8', path: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9' },
  Mysteries:     { color: '#a78bfa', path: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  Other:         { color: '#94a3b8', path: 'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' },
};

interface Props {
  group: CategoryGroup;
  categories: CategoryDefinition[];
  search: string;
}

export const GroupSection: React.FC<Props> = React.memo(({ group, categories, search }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const meta = GROUP_META[group] || { color: '#94a3b8', path: '' };
  
  const setCategoryVisible = useProgressStore(state => state.setCategoryVisible);
  const visibleCategories = useProgressStore(state => state.visibleCategories);

  const allVisible = useMemo(() => {
    return categories.every(c => visibleCategories[c.id] ?? c.visible);
  }, [categories, visibleCategories]);

  const handleToggleAll = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !allVisible;
    categories.forEach(c => setCategoryVisible(c.id, next));
  }, [allVisible, categories, setCategoryVisible]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <div className="cat-group mb-2 border border-[#1e1e2d] rounded-xl overflow-hidden shadow-lg bg-[#0c0c18]/50 ring-1 ring-white/5">
      <div 
        onClick={toggleExpanded}
        className="cat-group-hd w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors text-left cursor-pointer"
        aria-expanded={isExpanded}
        data-ghd={group}
      >
        <span className={`chev w-4 h-4 text-gray-400 transition-transform ${isExpanded ? '' : '-rotate-90'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </span>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={meta.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={meta.path}/>
        </svg>
        <span className="group-name text-sm font-semibold text-gray-200">{group}</span>
        <span className="group-count text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-full ml-auto">{categories.length}</span>
        <div 
          onClick={handleToggleAll}
          className={`gtoggle-btn text-[10px] font-bold px-2 py-1 rounded transition-all ml-2 cursor-pointer select-none ${allVisible ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'bg-gray-800 text-gray-500 border border-transparent'}`}
        >
          {allVisible ? 'HIDE' : 'SHOW'}
        </div>
      </div>

      <div 
        data-gbody={group}
        className={`cat-group-body p-2 space-y-1 transition-all duration-200 ${isExpanded ? 'block' : 'hidden group-body--closed'}`}
      >
        {categories.map(c => (
          <CategoryItem key={c.id} category={c} color={meta.color} search={search} />
        ))}
      </div>
    </div>
  );
});
