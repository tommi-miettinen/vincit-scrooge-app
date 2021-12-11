<script>
  import Chart from "./Chart/Chart.svelte";
  import { getBitcoinChart } from "../api/bitcoin";
  import { getDowntrendDays, getTimeToBuy, getTimeToSell } from "./utils";

  let data;
  let downtrend = 0;
  let timeToBuy = [1, 1];
  let timeToSell = [1, 1];

  const fetchData = async () => {
    data = await getBitcoinChart();
    downtrend = getDowntrendDays(data.prices);
    timeToBuy = getTimeToBuy(data.prices);
    timeToSell = getTimeToSell(data.prices);
  };
</script>

<div class="container">
  <Chart {data} />
  <div class="info-container">
    <div>
      from:<input type="date" style="color:#c660ce;" />
      to:<input type="date" style="color:#c660ce;" />
      <button class="btn" on:click={fetchData}>Get</button>
    </div>
    <div>
      Current downtrend for range: {downtrend} days
    </div>
    <div>
      Best time to buy BTC: {new Date(timeToBuy[0]).toUTCString()} at {timeToBuy[1].toFixed(
        2
      )}€
    </div>
    <div>
      Best time to sell BTC: {new Date(timeToSell[0]).toUTCString()} at {timeToSell[1].toFixed(
        2
      )}€
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    border-radius: 3px;
    box-shadow: 0px 0px 3px 0px lightblue;
    flex-direction: column;
    justify-content: center;

    width: 40%;
    height: 400px;
    margin: auto;
  }

  .btn {
    background-color: white;
    color: #c660ce;
    border-radius: 3px;
    border: 1px solid #c660ce;
    width: 100px;
  }

  .btn:hover {
    cursor: pointer;
    background-color: #c660ce;
    color: white;
    border-radius: 3px;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50%;
    width: 100%;
  }
</style>
