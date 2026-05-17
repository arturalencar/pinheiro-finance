// ===== App Entry Point =====
// Responsible only for bootstrapping: import modules, fetch data, wire them up.

import { getCoins }                        from './api.js';
import { renderTable, renderHighlights }   from './ui.js';
import { initTheme }                       from './theme.js';
import { initSidebar }                     from './sidebar.js';
import { showView, setAllCoins }           from './views.js';
import { initFavorites, syncFavoriteButtons } from './favorites.js';
import { initSearch }                      from './search.js';
import { initSorter }                      from './sorter.js';

async function init() {
    // ── UI initialisation ─────────────────────────────────────────────────

    initTheme();
    initSidebar(showView);   // sidebar delegates navigation to showView()
    showView('market');      // start on the market view
    
    // ── Data fetching ─────────────────────────────────────────────────────
    const coins = await getCoins();      

    if (coins.length === 0) return;

    // ── Render ────────────────────────────────────────────────────────────
    setAllCoins(coins);               // share coin list with the views module
    renderTable(coins);
    renderHighlights(coins.slice(0, 3));
    syncFavoriteButtons();            // apply persisted favorites to the table
    initFavorites();                  // wire up favorite-toggle click handler
    initSearch(coins);                // wire up search input (filter + re-render)
    initSorter(coins);                // wire up sorter
}

init();
