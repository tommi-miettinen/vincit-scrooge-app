<script>
  import moment from "moment";
  import { onMount } from "svelte";
  import { drawChart, drawDot, getClosestPointToMousePos } from "./Chart.utils";
  import { getHighestValueTuple } from "../PriceData/PriceData.utils";
  export let data;

  let linePath = [];
  let currentPos = 0;
  let mousePos;

  let price;
  let date;

  let height = window.innerHeight;
  let width = window.innerWidth;

  let c1;
  let c2;

  let chartMax;

  $: if (data) {
    price = data.prices[currentPos][1].toFixed(2);
    date = moment(data.prices[currentPos][0]).format("LL");
  }

  $: height,
    width,
    (() => {
      if (data) {
        c1 = document.getElementById("canvas");
        chartMax = getHighestValueTuple(data.prices).value * 2;
        linePath = drawChart(data.prices, chartMax, c1);
      }
    })();

  $: data,
    (() => {
      if (data) currentPos = data.prices.length - 1;
    })();

  $: linePath,
    mousePos,
    (() => {
      if (linePath.length && mousePos) {
        let closest = getClosestPointToMousePos(linePath, mousePos);
        let idx = linePath.findIndex((point) => point === closest);

        if (idx !== -1) currentPos = idx;

        let x = closest.x;
        let y = closest.y;
        drawDot(x, y, c2);
      }
    })();

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
  });

  const getMousePos = (c, e) => {
    const rect = c.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const getTouchPos = (c, e) => {
    const rect = c.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  };

  onMount(() => {
    c1 = document.getElementById("canvas");
    c2 = document.getElementById("canvas2");
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
    on:mousemove={(e) => (mousePos = getMousePos(e.target, e))}
    on:touchmove={(e) => (mousePos = getTouchPos(e.target, e))}
    class="canvas"
    id="canvas2"
    style="position: absolute; left: 0; top: 0; z-index: 1;"
  />
</div>

<style>
  h1 {
    position: absolute;
    color: white;
    font-weight: 400;
    margin-left: 20px;
    margin-top: 10px;
  }

  span {
    position: absolute;
    width: 99%;
    margin-top: 20px;
    margin-left: -10px;
    color: white;
    font-weight: 400;
    text-align: right;
  }

  .canvas-container {
    cursor: pointer;
    position: relative;
    display: flex;
    min-height: 200px;
    width: 100%;
  }

  .canvas {
    width: 100%;
    height: 100%;
  }
</style>
