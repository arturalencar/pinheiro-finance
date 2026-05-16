import { getCoins } from "./api.js";
import { renderTable, renderHighlights } from "./ui.js";

// ===== Theme toggle logic =====
function initTheme() {
    const switcher = document.getElementById("theme__switcher");
    const root = document.documentElement;

    if (!switcher) return;

    // Restore saved preference (default: dark)
    // checked = dark (knob near moon), unchecked = light (knob near sun)
    const savedTheme = localStorage.getItem("theme") ?? "dark";
    if (savedTheme === "dark") {
        root.removeAttribute("data-theme");
        switcher.checked = true;
    } else {
        root.setAttribute("data-theme", "light");
        switcher.checked = false;
    }

    switcher.addEventListener("change", () => {
        if (switcher.checked) {
            root.removeAttribute("data-theme");
            localStorage.setItem("theme", "dark");
        } else {
            root.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    });
}

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

    initTheme();
    initSidebar();

    const coins = await getCoins();

    if (coins.length > 0) {
        renderTable(coins);
        renderHighlights(coins.slice(0,3));
    }
}

init();