const baseUrl = "https://api.coingecko.com/api/v3";

const fetchBitcoinChart = async (from, to) => {
  try {
    const query = `${baseUrl}/coins/bitcoin/market_chart/range?vs_currency=eur&from=${from}&to=${to}`;
    const res = await fetch(query);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export { fetchBitcoinChart };
