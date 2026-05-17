// ===== Views Module =====
// Manages switching between the Market and Favorites views.

import { renderFavorites } from './ui.js';
import { getFavorites }    from './favorites.js';

// Shared reference to the full coin list — set once after the API call.
let _allCoins = [];

/**
 * Stores the full coin list so views can access up-to-date data.
 * @param {Array} coins
 */
export function setAllCoins(coins) {
    _allCoins = coins;
}

/**
 * Shows the requested view and updates nav link active states.
 * @param {'market' | 'favorites'} viewName
 */
export function showView(viewName) {
    const marketView = document.getElementById('market-view');
    const favView    = document.getElementById('favorites-view');
    const navMarket  = document.getElementById('nav__market');
    const navFav     = document.getElementById('nav__favorites');

    const isMarket = viewName === 'market';

    marketView?.classList.toggle('hidden', !isMarket);
    favView?.classList.toggle('hidden',  isMarket);
    navMarket?.classList.toggle('active', isMarket);
    navFav?.classList.toggle('active',   !isMarket);

    if (!isMarket) {
        const favorites = getFavorites();
        renderFavorites(_allCoins.filter((c) => favorites.has(c.id)));
    }
}
