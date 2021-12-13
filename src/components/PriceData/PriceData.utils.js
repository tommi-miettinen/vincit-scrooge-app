const getDowntrendDays = (data) => {
  if (!data.length) return;
  let longestDowntrend = 0;
  let currentDowntrend = 0;
  let [[, lastElemPrice]] = data;
  let onlyDowntrend = true;

  data.forEach(([, price]) => {
    if (lastElemPrice > price) {
      currentDowntrend = currentDowntrend + 1;
    }
    if (currentDowntrend > longestDowntrend) {
      longestDowntrend = currentDowntrend;
    }
    if (lastElemPrice < price) {
      currentDowntrend = 0;
      onlyDowntrend = false;
    }
    lastElemPrice = price;
  });

  longestDowntrend = onlyDowntrend ? currentDowntrend : longestDowntrend;

  return {
    length: longestDowntrend,
    onlyDowntrend,
  };
};

const getLowestValueTuple = (data) => {
  if (!data.length) return;

  let [[, lowest]] = data;
  let [[time]] = data;

  data.forEach(([timeStamp, value]) => {
    if (value < lowest) {
      lowest = value;
      time = timeStamp;
    }
  });

  return {
    day: new Date(time).toLocaleDateString(),
    value: lowest.toFixed(2),
  };
};

const getHighestValueTuple = (data) => {
  if (!data.length) return;

  let [[, highest]] = data;
  let [[time]] = data;

  data.forEach(([timeStamp, value]) => {
    if (value > highest) {
      highest = value;
      time = timeStamp;
    }
  });

  return {
    day: new Date(time).toLocaleDateString(),
    value: highest.toFixed(2),
  };
};

const getDailyData = (data) => {
  const map = {};

  data.forEach((point) => {
    let date = new Date(point[0]).toISOString().split("T")[0];

    if (!map.hasOwnProperty(date)) {
      map[date] = point;
    }
  });

  return Object.values(map);
};

export {
  getDowntrendDays,
  getLowestValueTuple,
  getHighestValueTuple,
  getDailyData,
};
