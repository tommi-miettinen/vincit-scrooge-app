<script>
  import moment from "moment";
  import { drawChart, drawDot } from "./Chart.utils";
  export let data;

  let linePath = [];
  let currentPos = 0;
  let price;
  let date;

  let height = window.innerHeight;
  let width = window.innerWidth;

  $: if (data) {
    price = data.prices[currentPos][1].toFixed(2);
    date = moment(data.prices[currentPos][0]).format("LL");
  }

  $: height,
    width,
    (() => {
      if (data) {
        let c1 = document.getElementById("canvas");
        linePath = drawChart(data.prices, c1);
      }
    })();

  $: data,
    (() => {
      if (data) currentPos = data.prices.length - 1;
    })();

  $: if (linePath.length) {
    let x = linePath[currentPos].x;
    let y = linePath[currentPos].y;
    let c2 = document.getElementById("canvas2");
    drawDot(x, y, c2);
  }

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
  });
</script>

<div class="canvas-container">
  {#if data}
    <h1>
      {price}€
    </h1>
    <span>
      {date}
    </span>
  {/if}
  <canvas
    class="canvas"
    id="canvas"
    style="position: absolute; left: 0; top: 0; z-index: 0;"
  />
  <canvas
    class="canvas"
    id="canvas2"
    style="position: absolute; left: 0; top: 0; z-index: 1;"
  />
</div>
<input
  type="range"
  min={0}
  max={linePath.length - 1}
  value={currentPos}
  on:input={(e) => (currentPos = e.target.value)}
  class="slider"
/>

<style>
  h1 {
    position: absolute;
    color: white;
    font-weight: 400;
    margin-left: 20px;
    margin-top: 10px;
    margin-right: auto;
  }

  span {
    position: absolute;
    width: 99%;
    margin-left: 5px;
    margin-bottom: 5px;
    color: white;
    font-weight: 400;
    text-align: left;
    bottom: 0;
  }

  .canvas-container {
    position: relative;
    display: flex;
    height: 55%;
    width: 100%;
  }

  .slider {
    appearance: none;
    background: #c576f6;
    border: none;
    height: 5px;
    width: 100%;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 50%;
    border: none;
    width: 15px;
    height: 15px;
    background: white;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    border-radius: 50%;
    border: none;
    width: 15px;
    height: 15px;
    background: white;
    cursor: pointer;
  }

  .canvas {
    width: 100%;
    height: 100%;
  }
</style>
