const drawChart = (data, c) => {
  let ctx = c.getContext("2d");
  let dpi = window.devicePixelRatio;

  let width = +getComputedStyle(c).getPropertyValue("width").slice(0, -2);
  let height = +getComputedStyle(c).getPropertyValue("height").slice(0, -2);

  c.setAttribute("height", height * dpi);
  c.setAttribute("width", width * dpi);

  let x = 0;
  let y = 0;
  let chartMax = 100000;
  let xIncrement = width / data.length;

  let linePath = [];

  data.forEach((pricePoint) => {
    x = x + xIncrement;
    y = height - (pricePoint[1] / chartMax) * height;
    ctx.lineTo(x, y);
    linePath.push({ x, y });
  });
  ctx.lineWidth = 1;
  ctx.strokeStyle = "purple";
  ctx.stroke();
  return linePath;
};

const drawDot = (x, y, c) => {
  let ctx = c.getContext("2d");
  let dpi = window.devicePixelRatio;

  let width = +getComputedStyle(c).getPropertyValue("width").slice(0, -2);
  let height = +getComputedStyle(c).getPropertyValue("height").slice(0, -2);
  ctx.lineWidth = 1;

  c.setAttribute("height", height * dpi);
  c.setAttribute("width", width * dpi);

  ctx.clearRect(0, 0, width, height);

  ctx.moveTo(x, y);
  ctx.arc(x - 2.5, y - 2.5, 5, 0, Math.PI * 2, true);
  ctx.fill();
};

export { drawChart, drawDot };
