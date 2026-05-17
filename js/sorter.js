// ==== Sorter Module =====
// Owns the full sorting pipeline: sort -> re-render.
// 

import { syncFavoriteButtons } from './favorites.js';
import { renderTable } from './ui.js';


/**
 * Sorts an array of coins based on the given sort value.
 * @param {Array} coins - The array of coins to sort.
 * @param {string} sortValue - The value to sort by.
 * @returns {Array} The sorted array of coins.
 */
function sortCoins(coins, sortValue) {
    switch (sortValue) {
        case 'highest-price':
            coins.sort((a, b) => b.current_price - a.current_price);
            break;
        case 'lowest-price':
            coins.sort((a, b) => a.current_price - b.current_price);
            break;
        case 'highest-volatility':
            coins.sort((a, b) => Math.abs(b.price_change_percentage_24h) - Math.abs(a.price_change_percentage_24h));
            break;
        case 'lowest-volatility':
            coins.sort((a, b) => Math.abs(a.price_change_percentage_24h) - Math.abs(b.price_change_percentage_24h));
            break;
        case 'highest-market-cap':
            coins.sort((a, b) => b.market_cap - a.market_cap);
            break;
        case 'lowest-market-cap':
            coins.sort((a, b) => a.market_cap - b.market_cap);
            break;
        default:
            break;
    }
    
    return coins;
}


export function initSorter(coins) {
    const sortSelect = document.getElementById('market-category-filter');

    if (!sortSelect) return;

    sortSelect.addEventListener('change', (e) => {
        const sorted = sortCoins(coins, e.target.value);
        renderTable(sorted);
        syncFavoriteButtons();
    })
    
}
    