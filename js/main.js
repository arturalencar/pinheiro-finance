import { getCoins } from './api.js';
import { renderTable, renderHighlights, renderFavorites } from './ui.js';

// ===== Favorites state =====
const favorites = new Set(
    JSON.parse(localStorage.getItem('favorites') ?? '[]'),
);

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
}

export function isFavorite(id) {
    return favorites.has(id);
}

// ===== Theme toggle logic =====
function initTheme() {
    const switcher = document.getElementById('theme__switcher');
    const root = document.documentElement;

    if (!switcher) return;

    // Restore saved preference (default: dark)
    // checked = dark (knob near moon), unchecked = light (knob near sun)
    const savedTheme = localStorage.getItem('theme') ?? 'dark';
    if (savedTheme === 'dark') {
        root.removeAttribute('data-theme');
        switcher.checked = true;
    } else {
        root.setAttribute('data-theme', 'light');
        switcher.checked = false;
    }

    switcher.addEventListener('change', () => {
        if (switcher.checked) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===== View switching =====
let allCoins = [];

function showView(viewName) {
    const marketView = document.getElementById('market-view');
    const favView = document.getElementById('favorites-view');
    const navMarket = document.getElementById('nav__market');
    const navFav = document.getElementById('nav__favorites');
    const pageTitle = document.querySelector('.top-bar__title');

    if (viewName === 'favorites') {
        marketView?.classList.add('hidden');
        favView?.classList.remove('hidden');
        navMarket?.classList.remove('active');
        navFav?.classList.add('active');
        if (pageTitle) pageTitle.textContent = 'Favoritos';
        renderFavorites(allCoins.filter((c) => favorites.has(c.id)));
    } else {
        favView?.classList.add('hidden');
        marketView?.classList.remove('hidden');
        navFav?.classList.remove('active');
        navMarket?.classList.add('active');
        if (pageTitle) pageTitle.textContent = 'Mercado em Tempo Real';
    }
}

// ===== Sidebar toggle logic =====
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const overlay = document.getElementById('sidebar-overlay');

    if (!sidebar || !toggle || !overlay) return;

    function openSidebar() {
        sidebar.classList.add('sidebar--open');
        overlay.classList.add('sidebar__overlay--visible');
        toggle.setAttribute('aria-label', 'Fechar menu');
    }

    function closeSidebar() {
        sidebar.classList.remove('sidebar--open');
        overlay.classList.remove('sidebar__overlay--visible');
        toggle.setAttribute('aria-label', 'Abrir menu');
    }

    toggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.contains('sidebar--open');
        isOpen ? closeSidebar() : openSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidebar();
    });

    // Nav item clicks: handle view switching + close on mobile
    document
        .getElementById('nav__market')
        ?.querySelector('a')
        .addEventListener('click', (e) => {
            e.preventDefault();
            showView('market');
            closeSidebar();
        });

    document
        .getElementById('nav__favorites')
        ?.querySelector('a')
        .addEventListener('click', (e) => {
            e.preventDefault();
            showView('favorites');
            closeSidebar();
        });
}

// ===== Favorites toggle =====
function initFavorites() {
    // Event delegation on the market table body
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

// Apply persisted favorite state to rendered table rows
function syncFavoriteButtons() {
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

// ===== App init =====
async function init() {
    console.log('Iniciando aplicação...');

    initTheme();
    initSidebar();

    // Start on market view
    showView('market');

    allCoins = await getCoins();

    if (allCoins.length > 0) {
        renderTable(allCoins);
        renderHighlights(allCoins.slice(0, 3));
        syncFavoriteButtons();
        initFavorites();
    }
}

init();
