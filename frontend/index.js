import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addStockForm = document.getElementById('addStockForm');
    const removeStockForm = document.getElementById('removeStockForm');
    const portfolioTable = document.getElementById('portfolioTable').getElementsByTagName('tbody')[0];
    const totalValueSpan = document.getElementById('totalValue');

    addStockForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const symbol = document.getElementById('symbol').value.toUpperCase();
        const quantity = parseInt(document.getElementById('quantity').value);
        const price = parseFloat(document.getElementById('price').value);

        await backend.addStock(symbol, quantity);
        await backend.updateStockPrice(symbol, price);
        await updatePortfolio();
    });

    removeStockForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const symbol = document.getElementById('removeSymbol').value.toUpperCase();

        await backend.removeStock(symbol);
        await updatePortfolio();
    });

    async function updatePortfolio() {
        const portfolio = await backend.getPortfolio();
        const totalValue = await backend.getPortfolioValue();

        portfolioTable.innerHTML = '';
        for (const [symbol, quantity] of portfolio) {
            const row = portfolioTable.insertRow();
            row.insertCell(0).textContent = symbol;
            row.insertCell(1).textContent = quantity;
            
            const price = await backend.getStockPrice(symbol);
            row.insertCell(2).textContent = price ? `$${price.toFixed(2)}` : 'N/A';
            
            const value = price ? (quantity * price).toFixed(2) : 'N/A';
            row.insertCell(3).textContent = value !== 'N/A' ? `$${value}` : 'N/A';
        }

        totalValueSpan.textContent = `$${totalValue.toFixed(2)}`;
    }

    // Initial portfolio update
    await updatePortfolio();
});