import { getCoins } from "./api.js";
import { renderTable, renderHighlights } from "./ui.js";

// ===== Sidebar toggle logic =====
function initSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const toggle = document.getElementById("sidebar-toggle");
    const overlay = document.getElementById("sidebar-overlay");

    if (!sidebar || !toggle || !overlay) return;

    function openSidebar() {
        sidebar.classList.add("sidebar--open");
        overlay.classList.add("sidebar__overlay--visible");
        toggle.setAttribute("aria-label", "Fechar menu");
    }

    function closeSidebar() {
        sidebar.classList.remove("sidebar--open");
        overlay.classList.remove("sidebar__overlay--visible");
        toggle.setAttribute("aria-label", "Abrir menu");
    }

    toggle.addEventListener("click", () => {
        const isOpen = sidebar.classList.contains("sidebar--open");
        isOpen ? closeSidebar() : openSidebar();
    });

    overlay.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSidebar();
    });

    // Close sidebar when a nav item is clicked (mobile UX)
    sidebar.querySelectorAll(".nav__list-item a").forEach(link => {
        link.addEventListener("click", closeSidebar);
    });
}

// ===== App init =====
async function init() {
    console.log("Iniciando aplicação...");

    initSidebar();

    const coins = await getCoins();

    if (coins.length > 0) {
        renderTable(coins);
        renderHighlights(coins.slice(0,3));
    }
}

init();