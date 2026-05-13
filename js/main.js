import { getCoins } from "./api.js";
import { renderTable, renderHighlights } from "./ui.js";

async function init() {
    console.log("Iniciando aplicação...");

    const coins = await getCoins();

    if (coins.length > 0) {
        renderTable(coins);
        renderHighlights(coins.slice(0,3));
    }
}

init();