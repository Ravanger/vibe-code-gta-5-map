import React, { useCallback, useMemo } from 'react';
import type { CategoryDefinition } from '../../types';
import { useProgressStore } from '../../store/useProgressStore';

interface Props {
  category: CategoryDefinition;
  color: string;
  search: string;
}

export const CategoryItem: React.FC<Props> = React.memo(({ category, color, search }) => {
  const isVisible = useProgressStore(state => state.visibleCategories[category.id] ?? category.visible);
  const toggleCategory = useProgressStore(state => state.toggleCategory);
  
  const progress = useProgressStore(state => {
    const cat = state.collected[category.id] || {};
    return Object.keys(cat).length;
  });

  const handleToggle = useCallback(() => {
    toggleCategory(category.id);
  }, [category.id, toggleCategory]);

  const matchesSearch = useMemo(() => {
    if (!search) return true;
    return category.name.toLowerCase().includes(search.toLowerCase());
  }, [category.name, search]);

  return (
    <div 
      className={`cat-item flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${isVisible ? 'cat-item--on bg-white/10' : 'bg-transparent opacity-50 hover:opacity-100'}`}
      onClick={handleToggle}
      style={{ display: matchesSearch ? 'flex' : 'none' }}
    >
      <div className="cat-check w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="cat-name text-white text-xs select-none flex-1">{category.name}</span>
      
      <span 
        className="cat-count text-[10px] text-gray-500 mr-1"
        data-progress-category={category.id} 
      >
        {progress}/{category.markers.length}
      </span>

      <div className={`w-8 h-4 rounded-full relative transition-colors ${isVisible ? 'bg-blue-600' : 'bg-gray-700'}`}>
        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isVisible ? 'left-5' : 'left-1'}`} />
      </div>
    </div>
  );
});
