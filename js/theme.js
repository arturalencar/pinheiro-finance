// ===== Theme Module =====
// Handles light/dark theme initialisation and persistence.
// Convention: checked = dark (knob near moon), unchecked = light (knob near sun).

const STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'dark';

function applyTheme(theme, switcher) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.removeAttribute('data-theme');
        if (switcher) switcher.checked = true;
    } else {
        root.setAttribute('data-theme', 'light');
        if (switcher) switcher.checked = false;
    }
}

/**
 * Reads the persisted theme preference, applies it to the document root, and
 * wires up the toggle switch so future changes are saved automatically.
 */
export function initTheme() {
    const switcher = document.getElementById('theme__switcher');
    if (!switcher) return;

    const savedTheme = localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME;
    applyTheme(savedTheme, switcher);

    switcher.addEventListener('change', () => {
        const next = switcher.checked ? 'dark' : 'light';
        applyTheme(next, switcher);
        localStorage.setItem(STORAGE_KEY, next);
    });
}
