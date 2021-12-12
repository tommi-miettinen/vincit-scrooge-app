const baseUrl = "https://api.coingecko.com/api/v3";

const fetchBitcoinChart = async (from, to) => {
  try {
    const res = await fetch(
      `${baseUrl}/coins/bitcoin/market_chart/range?vs_currency=eur&from=${from}&to=${to}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { fetchBitcoinChart };
