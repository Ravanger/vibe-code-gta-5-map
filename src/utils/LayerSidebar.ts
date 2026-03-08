import type { CategoryDefinition, CategoryGroup } from '../types';
import type { MarkerManager } from './MarkerManager';

// Per-group metadata: accent color + SVG path
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

function icon(path: string, color: string): string {
  return `<svg class="group-icon" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;
}

export class LayerSidebar {
  private mm: MarkerManager;
  private cats: CategoryDefinition[];
  private el: HTMLElement;
  private collapsed = false;

  constructor(mm: MarkerManager, cats: CategoryDefinition[]) {
    this.mm = mm;
    this.cats = cats;
    this.el = document.getElementById('sidebar')!;
    this.render();
  }

  // ---------- layer helpers ----------

  private show(id: string): void {
    this.mm.showLayer(id);
    this.syncItemUI(id, true);
  }

  private hide(id: string): void {
    this.mm.hideLayer(id);
    this.syncItemUI(id, false);
  }

  private syncItemUI(id: string, visible: boolean): void {
    const cb = document.getElementById(`cb-${id}`) as HTMLInputElement | null;
    if (!cb) return;
    cb.checked = visible;
    cb.closest('.cat-item')?.classList.toggle('cat-item--on', visible);
  }

  private setGroup(group: string, visible: boolean): void {
    this.cats.filter(c => c.group === group).forEach(c => {
      visible ? this.show(c.id) : this.hide(c.id);
    });
    this.refreshGroupBtn(group);
  }

  private setAll(visible: boolean): void {
    const groups = new Set(this.cats.map(c => c.group));
    this.cats.forEach(c => { visible ? this.show(c.id) : this.hide(c.id); });
    groups.forEach(g => this.refreshGroupBtn(g));
  }

  private refreshGroupBtn(group: string): void {
    const btn = this.el.querySelector<HTMLButtonElement>(`[data-gtoggle="${group}"]`);
    if (!btn) return;
    const allOn = this.cats.filter(c => c.group === group).every(c => this.mm.isVisible(c.id));
    btn.textContent = allOn ? 'Hide' : 'Show';
    btn.dataset.on = String(allOn);
    btn.setAttribute('aria-label', `${allOn ? 'Hide' : 'Show'} all ${group}`);
  }

  private collapseGroup(group: string): void {
    const body = this.el.querySelector<HTMLElement>(`[data-gbody="${group}"]`);
    const chevron = this.el.querySelector<HTMLElement>(`[data-gchev="${group}"]`);
    if (!body) return;
    const closing = !body.classList.contains('group-body--closed');
    body.classList.toggle('group-body--closed', closing);
    if (chevron) chevron.classList.toggle('chev--closed', closing);
  }

  private toggleSidebar(): void {
    this.collapsed = !this.collapsed;
    this.el.classList.toggle('sidebar--collapsed', this.collapsed);
    document.getElementById('map')!.classList.toggle('map--expanded', this.collapsed);
    // Let Leaflet recalculate size after CSS transition
    setTimeout(() => {
      // @ts-ignore
      window.map?.invalidateSize();
    }, 300);
  }

  // ---------- render ----------

  private buildGroup(group: CategoryGroup, cats: CategoryDefinition[]): string {
    const meta = GROUP_META[group] ?? { color: '#94a3b8', path: '' };
    const allOn = cats.every(c => this.mm.isVisible(c.id));

    const items = cats.map(c => {
      const on = this.mm.isVisible(c.id);
      return `
        <label class="cat-item${on ? ' cat-item--on' : ''}" for="cb-${c.id}" style="--accent:${meta.color}">
          <input type="checkbox" class="cat-cb sr-only" id="cb-${c.id}"
            data-category-id="${c.id}" ${on ? 'checked' : ''}
            aria-label="Toggle ${c.name}" />
          <span class="cat-check" aria-hidden="true">
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1.5 5l2.5 2.5 4.5-4"/></svg>
          </span>
          <span class="cat-name">${c.name}</span>
          <span class="cat-count" aria-label="${c.markers.length} markers">${c.markers.length}</span>
        </label>`;
    }).join('');

    return `
      <div class="cat-group" data-group="${group}">
        <button class="cat-group-hd" data-ghd="${group}" aria-expanded="true" style="--accent:${meta.color}">
          <span class="chev" data-gchev="${group}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></span>
          ${icon(meta.path, meta.color)}
          <span class="group-name">${group}</span>
          <span class="group-count">${cats.length}</span>
          <span class="group-spacer"></span>
          <span class="gtoggle-wrap" role="none">
            <button class="gtoggle-btn${allOn ? ' gtoggle-btn--on' : ''}"
              data-gtoggle="${group}" data-on="${allOn}"
              aria-label="${allOn ? 'Hide' : 'Show'} all ${group}">
              ${allOn ? 'Hide' : 'Show'}
            </button>
          </span>
        </button>
        <div class="cat-group-body" data-gbody="${group}">${items}</div>
      </div>`;
  }

  private render(): void {
    const groupOrder: CategoryGroup[] = [];
    const groupMap = new Map<string, CategoryDefinition[]>();
    this.cats.forEach(c => {
      if (!groupMap.has(c.group)) { groupMap.set(c.group, []); groupOrder.push(c.group); }
      groupMap.get(c.group)!.push(c);
    });

    this.el.innerHTML = `
      <div id="sb-header">
        <div class="sb-brand">
          <svg class="sb-brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 16l4.553-2.276A1 1 0 0021 19.382V8.618a1 1 0 00-.553-.894L15 5m0 18V5m0 0L9 7"/>
          </svg>
          <span class="sb-brand-text">GTA V<strong>Map</strong></span>
        </div>
        <button id="sb-collapse-btn" aria-label="Collapse sidebar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
      </div>
      <div id="sb-body">
        <div id="sb-search-wrap">
          <svg class="sb-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input id="sb-search" type="search" placeholder="Filter categories…" aria-label="Filter categories" autocomplete="off" />
        </div>
        <div id="sb-global-actions">
          <button id="btn-show-all" class="global-btn global-btn--show" aria-label="Show all categories">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Show All
          </button>
          <button id="btn-hide-all" class="global-btn global-btn--hide" aria-label="Hide all categories">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
            Hide All
          </button>
        </div>
        <div id="sb-cats">
          ${groupOrder.map(g => this.buildGroup(g, groupMap.get(g)!)).join('')}
        </div>
      </div>`;

    this.bindEvents();
  }

  private bindEvents(): void {
    // Collapse sidebar
    document.getElementById('sb-collapse-btn')?.addEventListener('click', () => this.toggleSidebar());

    // Global show/hide
    document.getElementById('btn-show-all')?.addEventListener('click', () => this.setAll(true));
    document.getElementById('btn-hide-all')?.addEventListener('click', () => this.setAll(false));

    // Search filter
    document.getElementById('sb-search')?.addEventListener('input', e => {
      const q = (e.target as HTMLInputElement).value.toLowerCase();
      this.el.querySelectorAll<HTMLElement>('.cat-item').forEach(item => {
        const name = item.querySelector('.cat-name')?.textContent?.toLowerCase() ?? '';
        item.style.display = name.includes(q) ? '' : 'none';
      });
      this.el.querySelectorAll<HTMLElement>('.cat-group').forEach(grp => {
        const hasVisible = [...grp.querySelectorAll<HTMLElement>('.cat-item')].some(i => i.style.display !== 'none');
        grp.style.display = hasVisible ? '' : 'none';
      });
    });

    // Group header collapse (but not when clicking the toggle button)
    this.el.querySelectorAll<HTMLElement>('[data-ghd]').forEach(hd => {
      hd.addEventListener('click', e => {
        if ((e.target as HTMLElement).closest('[data-gtoggle]')) return;
        this.collapseGroup(hd.dataset.ghd!);
      });
    });

    // Group show/hide buttons
    this.el.querySelectorAll<HTMLButtonElement>('[data-gtoggle]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const group = btn.dataset.gtoggle!;
        this.setGroup(group, btn.dataset.on !== 'true');
      });
    });

    // Individual checkboxes
    this.el.querySelectorAll<HTMLInputElement>('[data-category-id]').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.dataset.categoryId!;
        cb.checked ? this.show(id) : this.hide(id);
        const cat = this.cats.find(c => c.id === id);
        if (cat) this.refreshGroupBtn(cat.group);
      });
    });
  }
}
