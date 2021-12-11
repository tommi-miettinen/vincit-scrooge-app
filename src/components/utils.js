const getDowntrendDays = (data) => {
  if (!data.length) return;
  let longestDowntrend = 0;
  let lastDowntrend = 0;
  let currentDowntrend = 0;
  let price = data[0][1];
  data.forEach((e) => {
    if (price > e[1]) {
      currentDowntrend = currentDowntrend + 1;
    } else {
      lastDowntrend = currentDowntrend;
      currentDowntrend = 0;
      if (lastDowntrend > longestDowntrend) {
        longestDowntrend = lastDowntrend;
        lastDowntrend = 0;
      }
    }
    price = e[1];
  });
  return longestDowntrend;
};

const getTimeToBuy = (data) => {
  if (!data.length) return;
  let [[, lowestPrice]] = data;
  let [[timeToBuy]] = data;

  data.forEach(([time, price]) => {
    if (price < lowestPrice) {
      lowestPrice = price;
      timeToBuy = time;
    }
  });

  return [timeToBuy, lowestPrice];
};

const getTimeToSell = (data) => {
  if (!data.length) return;
  let [[, highestPrice]] = data;
  let [[timeToSell]] = data;

  data.forEach(([time, price]) => {
    if (price > highestPrice) {
      highestPrice = price;
      timeToSell = time;
    }
  });

  return [timeToSell, highestPrice];
};

export { getDowntrendDays, getTimeToBuy, getTimeToSell };
