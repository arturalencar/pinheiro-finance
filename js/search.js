// ===== Search Module =====
// Owns the full search pipeline: input capture → filter → re-render.

import { renderTable }        from './ui.js';
import { syncFavoriteButtons } from './favorites.js';

// ── Pure helpers ──────────────────────────────────────────────────────────────

/**
 * Returns the subset of coins whose name or symbol matches the query.
 * @param {Array}  coins  - Full coin list.
 * @param {string} query  - Raw search string.
 * @returns {Array}
 */
export function filterCoins(coins, query) {
    const q = query.toLowerCase().trim();
    if (!q) return coins;
    return coins.filter(
        (c) =>
            c.name.toLowerCase().includes(q) ||
            c.symbol.toLowerCase().includes(q),
    );
}

// ── Initialization ────────────────────────────────────────────────────────────

/**
 * Wires up the search input so it filters and re-renders the table on every keystroke.
 * @param {Array} coins - Full coin list fetched from the API.
 */
export function initSearch(coins) {
    const searchInput = document.getElementById('market-search');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const filtered = filterCoins(coins, e.target.value);
        renderTable(filtered);
        syncFavoriteButtons();
    });
}
