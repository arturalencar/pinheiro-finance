export function renderTable(coins) {
	const tableBody = document.querySelector("#coin-table-body");

	if (!tableBody) return;

	// Limpa a tabela (caso tenha algum dado antigo) 
	tableBody.innerHTML = '';

	coins.forEach(coin => {
		const isPositive = coin.price_change_percentage_24h > 0;
		const row = `
			<tr>
				<td>
					<div class="coin-info">
						<img
							src="${coin.image}"
							alt="${coin.name}"
							class="coin-logo"
						/>
						<div>
							<p class="coin-name">${coin.name}</p>
							<span class="coin-symbol">${coin.symbol.toUpperCase()}</span>
						</div>
					</div>
				</td>
				<td class="price-cell">
					${coin.current_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'	})}
				</td>
				<td class="${isPositive ? 'text-positive' : 'text-negative'}">
					${isPositive ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%
				</td>
				<td>
					<span class="sparkline-placeholder">--</span>
				</td>
				<td>
					<button
						class="btn-favorite"
						data-id="${coin.id}"
					>
						<i class="ph ph-star"></i>
					</button>
				</td>
			</tr>
		`

		tableBody.innerHTML += row;
	});
}

export function renderHighlights(coins) {
	const coinsList = document.querySelector("#coins-list");

	if (!coinsList) return;

	// Limpa a lista (caso tenha algum dado antigo) 
	coinsList.innerHTML = '';

	coins.forEach(coin => {
		const isPositive = coin.price_change_percentage_24h > 0;
		const coinCard = `
			<li class="coin">
				<div class="coin__label">
					<img
						class="coin__icon"
						src="${coin.image}"
						alt="${coin.name}"
					/>

					<div class="coin-brand-group">
						<span class="coin__name">${coin.name}</span>
						<span class="coin__abbr">${coin.symbol}</span>
					</div>
				</div>
				<div class="coin__values">
					<span class="coin__current-price"
						>${coin.current_price.toLocaleString('pt-BR', {	style: 'currency', currency: 'BRL'})}
					</span>
					<div class="coin__variation ${isPositive ? 'positive' : 'negative'}">
					${isPositive ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%
					</div>
				</div>
			</li>
		`

		coinsList.innerHTML += coinCard;
	});
}
