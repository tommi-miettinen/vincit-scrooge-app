<script>
  import { drawChart, drawDot } from "./Chart.utils";
  export let data;

  let linePath = [];
  let currentPos = 0;

  $: data &&
    (() => {
      let c1 = document.getElementById("canvas");
      currentPos = 0;
      linePath = drawChart(data.prices, c1);
    })();

  $: linePath.length &&
    (() => {
      let x = linePath[currentPos].x;
      let y = linePath[currentPos].y;
      let c2 = document.getElementById("canvas2");
      drawDot(x, y, c2);
    })();
</script>

<div class="canvas-container">
  {#if data}
    <h1>
      {data.prices[currentPos][1].toFixed(2)}€
    </h1>
    <span>
      {new Date(data.prices[currentPos][0]).toLocaleDateString()}
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
    color: purple;
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
    color: purple;
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
    border: 1px solid #c660ce;
    height: 10px;
    width: 100%;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #04aa6d; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  .slider::-moz-range-thumb {
    border-radius: 50%;
    border: none;
    width: 20px; /* Set a specific slider handle width */
    height: 20px; /* Slider handle height */
    background: black; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  .canvas {
    color: red;
    width: 100%;
    height: 100%;
  }
</style>
