// ===== Favorites Module =====
// Manages favorites state, persistence, and button interactions.

const favorites = new Set(
    JSON.parse(localStorage.getItem('favorites') ?? '[]'),
);

// ── Persistence ──────────────────────────────────────────────────────────────

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns true if the given coin id is marked as favorite.
 * @param {string} id
 */
export function isFavorite(id) {
    return favorites.has(id);
}

/**
 * Syncs all rendered `.btn-favorite` buttons with the current favorites state.
 * Should be called after the table is (re)rendered.
 */
export function syncFavoriteButtons() {
    document.querySelectorAll('.btn-favorite').forEach((btn) => {
        const active = favorites.has(btn.dataset.id);
        const icon = btn.querySelector('i');

        btn.classList.toggle('active', active);

        if (icon) {
            icon.classList.toggle('ph', !active);
            icon.classList.toggle('ph-fill', active);
        }

        btn.setAttribute(
            'aria-label',
            active ? 'Remover dos favoritos' : 'Adicionar aos favoritos',
        );
    });
}

/**
 * Attaches a delegated click listener on the market table body to handle
 * favorite toggling. Call once after the table exists in the DOM.
 */
export function initFavorites() {
    const tableBody = document.getElementById('coin-table-body');
    if (!tableBody) return;

    tableBody.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-favorite');
        if (!btn) return;

        const btnIcon = btn.querySelector('i');
        const id = btn.dataset.id;

        if (favorites.has(id)) {
            favorites.delete(id);
            btn.classList.remove('active');
            btnIcon.classList.remove('ph-fill');
            btnIcon.classList.add('ph');
            btn.setAttribute('aria-label', 'Adicionar aos favoritos');
        } else {
            favorites.add(id);
            btn.classList.add('active');
            btnIcon.classList.remove('ph');
            btnIcon.classList.add('ph-fill');
            btn.setAttribute('aria-label', 'Remover dos favoritos');
        }

        saveFavorites();
    });
}

/**
 * Returns the raw Set of favorite IDs (read-only intent).
 * Prefer `isFavorite()` for single-coin checks.
 */
export function getFavorites() {
    return favorites;
}
