# Pinheiro Finance · Crypto Dashboard

A real-time cryptocurrency dashboard built with vanilla HTML, CSS, and JavaScript. Displays live market data from CoinGecko, lets users favourite coins, and supports dark/light themes — all without any frontend framework.

---

## Features

- **Real-time market data** — top 10 coins by market cap fetched from the [CoinGecko API](https://www.coingecko.com/en/api), prices displayed in BRL
- **Highlights strip** — quick price cards for the top 3 coins
- **Full market table** — sortable view with current price, 24h variation and colour-coded badges
- **Favourites** — click the ⭐ star to add/remove a coin; persisted in `localStorage` and accessible via the Favourites nav item
- **Dark / Light theme toggle** — sidebar switch persisted in `localStorage`; dark mode is the default
- **Mobile-first responsive layout** — collapsible drawer sidebar on mobile, static sidebar on desktop (≥ 1024 px)
- **Keyboard & accessibility** — `Escape` closes the sidebar, focus-visible ring on the theme toggle, `aria-label` on all interactive buttons

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styles | Vanilla CSS · CSS Custom Properties · Mobile-first |
| Logic | Vanilla JavaScript (ES Modules) |
| Icons | [Phosphor Icons](https://phosphoricons.com/) |
| Font | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Google Fonts) |
| Data | [CoinGecko REST API v3](https://docs.coingecko.com/) |

No bundler, no framework, no build step required.

---

## Project Structure

```
pinheiro-crypto/
├── index.html              # Entry point
├── styles.css              # CSS entry point (@import chain)
├── css/
│   ├── variables.css       # Design tokens (colors, typography, spacing)
│   ├── base/
│   │   └── reset.css
│   ├── layout/
│   │   └── main-layout.css # App grid (sidebar + main)
│   └── components/
│       ├── sidebar.css     # Navigation drawer & theme toggle
│       ├── topbar.css      # Header bar & search
│       ├── highlights.css  # Top-3 coin cards grid
│       ├── card.css        # Coin card component
│       ├── table.css       # Market table (mobile cards → desktop table)
│       ├── table-row.css   # Table row styles
│       └── inputs.css      # Search input
├── js/
│   ├── main.js             # App init, theme, sidebar, favorites, view routing
│   ├── api.js              # CoinGecko fetch wrapper
│   └── ui.js               # DOM rendering (table, highlights, favorites)
└── assets/
    └── images/
        └── pinheiro-finance-logo.svg
```

---

## Getting Started

No build step required. Open the project with any static file server, for example:

```bash
# Using the VS Code Live Server extension — just open index.html and click "Go Live"

# Or with Node.js npx
npx serve .

# Or with Python
python3 -m http.server
```

> **Note:** The CoinGecko Demo API key is included in `js/api.js`. Demo keys are rate-limited to ~30 requests/minute. If you see no data, wait a moment and refresh.

---

## API

Data is fetched from the CoinGecko `/coins/markets` endpoint:

```
GET https://api.coingecko.com/api/v3/coins/markets
  ?vs_currency=brl
  &order=market_cap_desc
  &per_page=10
  &page=1
```

To use your own key, replace `API_KEY` in `js/api.js`.

---

## localStorage Keys

| Key | Values | Description |
|---|---|---|
| `theme` | `"dark"` \| `"light"` | User's theme preference |
| `favorites` | JSON array of coin IDs | Persisted favourites list |

---

## Browser Support

Works in all modern browsers that support ES Modules (`type="module"`): Chrome, Firefox, Edge, Safari.
