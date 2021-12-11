<script>
  import { drawChart, drawDot } from "./Chart.utils";
  export let data;

  let linePath = [];

  let currentPos = 0;

  $: {
    if (data) {
      let c = document.getElementById("canvas");
      linePath = drawChart(data.prices, c);
    }
  }

  $: {
    if (linePath && currentPos !== 0) {
      let c = document.getElementById("canvas2");
      drawDot(linePath[currentPos].x, linePath[currentPos].y, c);
    }
  }
</script>

<div class="canvas-container">
  <span>{data && data.prices && data.prices[currentPos][1].toFixed(2)}€</span>
  <span
    >{data &&
      data.prices &&
      new Date(data.prices[currentPos][0]).toUTCString()}</span
  >
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
  .canvas-container {
    position: relative;
    height: 50%;
    width: 100%;
    border-bottom: 1px solid black;
  }

  .slider {
    width: 100%;
  }

  .canvas {
    color: red;
    width: 100%;
    height: 100%;
  }
</style>
