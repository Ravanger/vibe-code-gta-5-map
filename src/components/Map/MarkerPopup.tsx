import React, { useEffect, useRef } from 'react';
import type { CategoryDefinition, MarkerData } from '../../types';
import { useProgressStore } from '../../store/useProgressStore';
import GLightbox from 'glightbox';
import ClipboardJS from 'clipboard';

interface Props {
  marker: MarkerData;
  category: CategoryDefinition;
  index: number;
  isCollected: boolean;
}

export const MarkerPopup: React.FC<Props> = ({ marker, category, index, isCollected }) => {
  const setCollected = useProgressStore(state => state.setCollected);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Small delay to ensure dangerouslySetInnerHTML is finished and in DOM
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      
      const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
      });

      const clipboard = new ClipboardJS(containerRef.current.querySelectorAll('.copy') as any);
      
      const onSuccess = (e: any) => {
        const btn = e.trigger as HTMLButtonElement;
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span class="text-xs font-medium">Copied!</span>`;
        btn.classList.add('bg-green-600', 'text-white');
        
        setTimeout(() => {
          if (btn) {
            btn.innerHTML = originalHtml;
            btn.classList.remove('bg-green-600', 'text-white');
          }
        }, 2000);
        e.clearSelection();
      };

      clipboard.on('success', onSuccess);

      (containerRef.current as any)._lightbox = lightbox;
      (containerRef.current as any)._clipboard = clipboard;
    }, 50);

    return () => {
      clearTimeout(timer);
      const anyRef = containerRef.current as any;
      if (anyRef?._lightbox) anyRef._lightbox.destroy();
      if (anyRef?._clipboard) anyRef._clipboard.destroy();
    };
  }, [marker.popupHtml]);

  return (
    <div className="popup-root max-w-[280px]" ref={containerRef}>
      {/* Header for tests */}
      <h3 className="text-lg font-bold text-white mb-2">{category.name} #{index + 1}</h3>
      
      <div className="popup-inner" dangerouslySetInnerHTML={{ __html: marker.popupHtml }} />
      
      <div className="flex flex-col gap-2 mt-3">
        {/* Coordinates/Copy for tests */}
        <div className="flex items-center justify-between gap-2 p-2 bg-gray-800/50 rounded-lg border border-white/5">
          <code className="text-[10px] text-gray-400 font-mono">{marker.lat.toFixed(2)}, {marker.lng.toFixed(2)}</code>
          <button 
            className="copy p-1.5 rounded-md bg-gray-700/50 hover:bg-gray-600 text-gray-300 transition-colors"
            data-clipboard-text={`${marker.lat}, ${marker.lng}`}
            aria-label="Copy location coordinates"
            title="Copy coordinates"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className={`progress-toggle-btn transition-colors duration-200 w-full py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 ${
            isCollected ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30' : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
          data-progress-toggle="true"
          onClick={() => setCollected(category.id, index, !isCollected)}
          aria-pressed={isCollected}
        >
          {isCollected ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              Collected
            </>
          ) : (
            'Mark as collected'
          )}
        </button>
      </div>
    </div>
  );
};
