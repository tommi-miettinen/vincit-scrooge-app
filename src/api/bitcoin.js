const baseUrl = "https://api.coingecko.com/api/v3";

const getBitcoinChart = async () => {
  const res = await fetch(
    `${baseUrl}/coins/bitcoin/market_chart/range?vs_currency=eur&from=1583020800&to=1627776000`
  );
  const data = await res.json();
  return data;
};

export { getBitcoinChart };
