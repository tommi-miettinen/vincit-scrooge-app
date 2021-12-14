<script>
  import moment from "moment";
  import Chart from "../Chart/Chart.svelte";
  import { onMount } from "svelte";
  import { fetchBitcoinChart } from "../../api/bitcoin";
  import {
    getDowntrendDays,
    getLowestValueTuple,
    getHighestValueTuple,
    getDailyData,
  } from "./PriceData.utils";

  let data;
  let downtrend;
  let timeToBuy;
  let timeToSell;
  let highestVolume;
  let fromDate = moment().subtract(1, "years").format().split("T")[0];
  let toDate = new Date().toISOString().split("T")[0];

  const fetchData = async () => {
    if (!fromDate || !toDate) return;
    if (fromDate > toDate) return;

    let formattedFromDate = new Date(fromDate).getTime() / 1000;
    let formattedToDate = new Date(toDate).getTime() / 1000;

    data = await fetchBitcoinChart(formattedFromDate, formattedToDate + 7200);

    parseData();
  };

  const parseData = () => {
    if (!data || !data.prices.length) return;

    data = {
      ...data,
      total_volumes: getDailyData(data.total_volumes),
      prices: getDailyData(data.prices),
    };

    highestVolume = getHighestValueTuple(data.total_volumes);
    downtrend = getDowntrendDays(data.prices);
    timeToBuy = getLowestValueTuple(data.prices);
    timeToSell = getHighestValueTuple(data.prices);
  };
  onMount(() => {
    fetchData();
  });
</script>

<div class="container">
  <div class="inner-container">
    <Chart data={data && data.prices.length && data} />
    <div class="info-container">
      <div />
      {#if data && downtrend && timeToBuy && timeToSell}
        {#if !downtrend.onlyDowntrend}
          <div style="margin:2px;">
            <b>Lowest price </b>
            {timeToBuy.value}€ / {timeToBuy.day}
          </div>
          <div style="margin:2px;">
            <b>Highest price </b>{timeToSell.value}€ / {timeToSell.day}
          </div>
          <div style="margin:2px;">
            <b>Highest volume </b>{(highestVolume.value / 1000000000).toFixed(
              2
            )}B€ / {highestVolume.day}
          </div>
        {:else}
          <div style="margin:2px;">You shouldnt buy or sell</div>
        {/if}
        <div style="margin:2px;">
          <b>Longest downtrend </b>
          {downtrend.length} days
        </div>
      {/if}
    </div>
  </div>
  <div class="input-container">
    <input
      type="date"
      bind:value={fromDate}
      on:change={(e) => (fromDate = e.target.value)}
    />
    <input
      type="date"
      bind:value={toDate}
      on:change={(e) => (toDate = e.target.value)}
    />
    <button on:click={fetchData}>Get Data</button>
  </div>
</div>

<style>
  .container {
    padding-bottom: 20px;
    max-width: 600px;
    min-height: 425px;
    margin: auto;
  }

  .inner-container {
    box-sizing: border-box;
    overflow: hidden;
    color: white;
    border-radius: 3px;
    background-color: #202121;
    overflow-y: hidden;
    max-width: 600px;
    margin: auto;
    margin-top: 0px;
  }

  input {
    width: 33%;
    color: black;
    background: none;
    border-radius: 3px;
    margin-right: 5px;
    border: 1px solid black;
    height: 40px;
  }

  button {
    color: black;
    background-color: white;
    border: 1px solid black;
    border-radius: 3px;
    height: 40px;
    width: 33%;
    cursor: pointer;
  }

  .info-container {
    margin: auto;
    width: 100%;
    padding: 20px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .input-container {
    display: flex;
    padding: 10px 0px;
  }
</style>
