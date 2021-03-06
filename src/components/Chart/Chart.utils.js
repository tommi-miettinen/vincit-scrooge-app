const drawChart = (data, chartMax, c) => {
  let ctx = c.getContext("2d");

  let width = +getComputedStyle(c).getPropertyValue("width").slice(0, -2);
  let height = +getComputedStyle(c).getPropertyValue("height").slice(0, -2);

  c.setAttribute("height", height);
  c.setAttribute("width", width);

  let x = 0;
  let y = 0;
  let xIncrement = width / data.length;

  let linePath = [];

  data.forEach((pricePoint, index) => {
    x = x + xIncrement;
    if (index === 0) x = 0;
    if (index === data.length - 1) x = width;
    //minus 10 to add 10px "padding-bottom"
    y = height - (pricePoint[1] / chartMax) * height - 10;
    ctx.lineTo(x, y);
    linePath.push({ x, y });
  });

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#c576f6";
  ctx.stroke();

  return linePath;
};

const drawDot = (x, y, c) => {
  let ctx = c.getContext("2d");

  let width = +getComputedStyle(c).getPropertyValue("width").slice(0, -2);
  let height = +getComputedStyle(c).getPropertyValue("height").slice(0, -2);

  c.setAttribute("height", height);
  c.setAttribute("width", width);

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "white";
  ctx.moveTo(x, y);
  ctx.arc(x, y, 5, 0, Math.PI * 2, true);
  ctx.fill();
};

const getClosestPointToMousePos = (arr, mousePos) => {
  let closest = arr[0];
  let i = 1;

  while (i < arr.length) {
    let cur = Math.abs(arr[i].x - mousePos.x);
    let prev = Math.abs(arr[i - 1].x - mousePos.x);
    if (cur < prev) {
      closest = arr[i];
    }
    i = i + 1;
  }
  return closest;
};

export { drawChart, drawDot, getClosestPointToMousePos };
