// ===== Sidebar Module =====
// Controls the mobile sidebar open/close behaviour and nav item routing.

/**
 * Initialises the sidebar toggle, overlay dismissal, Escape key handler, and
 * nav link click events (view switching + auto-close on mobile).
 *
 * @param {(viewName: string) => void} onNavigate - Callback invoked when the
 *   user clicks a nav link.  Receives the target view name ('market' | 'favorites').
 */
export function initSidebar(onNavigate) {
    const sidebar = document.querySelector('.sidebar');
    const toggle  = document.getElementById('sidebar-toggle');
    const overlay = document.getElementById('sidebar-overlay');

    if (!sidebar || !toggle || !overlay) return;

    // ── Helpers ────────────────────────────────────────────────────────────

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

    // ── Event listeners ────────────────────────────────────────────────────

    toggle.addEventListener('click', () => {
        sidebar.classList.contains('sidebar--open')
            ? closeSidebar()
            : openSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidebar();
    });

    // ── Nav links ──────────────────────────────────────────────────────────

    const navLinks = [
        { id: 'nav__market',    view: 'market'    },
        { id: 'nav__favorites', view: 'favorites' },
    ];

    navLinks.forEach(({ id, view }) => {
        document
            .getElementById(id)
            ?.querySelector('a')
            ?.addEventListener('click', (e) => {
                e.preventDefault();
                onNavigate(view);
                closeSidebar();
            });
    });
}
