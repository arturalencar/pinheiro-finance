
/*
Busca a lista de moedas para a tabela e destaques   
@returns {Promise<Array>}
*/
const API_KEY = "CG-1iccqUQYNVaznRbFCYMTziy1"
const BASE_URL = "https://api.coingecko.com/api/v3";

export const getCoins = async () => {
    try {
        console.log("indo buscar os dados");
        
        const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=10&page=1`,
            {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'x_cg_demo_api_key': API_KEY
                }
            }
        );
    
        if (!response.ok) {
            if (response.status === 429) throw new Error("Limite de requisições excedido.");
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        return response.json();
    }
    catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
} 