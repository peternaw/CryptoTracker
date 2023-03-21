const searchInput = document.getElementById('search');
const cryptoContainer = document.getElementById('crypto-container');
let cryptoData = [];

const apiUrl =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2000&page=1&sparkline=false';

async function getCryptoData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function displayCrypto(data) {
  cryptoContainer.innerHTML = '';

  data.forEach((crypto) => {
    const cryptoDiv = document.createElement('div');
    cryptoDiv.classList.add('crypto');

    const name = document.createElement('h2');
    name.textContent = crypto.name;

    const price = document.createElement('p');
    price.textContent = `Price: $${crypto.current_price}`;

    const marketCap = document.createElement('p');

    marketCap.textContent =
      marketCap.textContent = `Market Cap: $${crypto.market_cap.toLocaleString()}`;

    cryptoDiv.appendChild(name);
    cryptoDiv.appendChild(price);
    cryptoDiv.appendChild(marketCap);

    cryptoContainer.appendChild(cryptoDiv);
  });
}

async function init() {
  cryptoData = await getCryptoData();
  displayCrypto(cryptoData);
}

init();

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredCrypto = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchValue)
  );
  displayCrypto(filteredCrypto);
});
