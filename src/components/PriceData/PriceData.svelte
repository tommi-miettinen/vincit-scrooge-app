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
  let fromDate = moment().subtract(1, "months").format().split("T")[0];
  let toDate = new Date().toISOString().split("T")[0];

  const fetchData = async () => {
    if (!fromDate || !toDate) return;
    if (fromDate > toDate) return;

    let formattedFromDate = new Date(fromDate).getTime() / 1000;
    let formattedToDate = new Date(toDate).getTime() / 1000;

    data = await fetchBitcoinChart(formattedFromDate, formattedToDate + 3600);

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
  <Chart data={data && data.prices.length && data} />
  <div class="info-container">
    <div>
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
      <button class="btn" on:click={fetchData}>Get Data</button>
    </div>
    {#if data && downtrend && timeToBuy && timeToSell}
      {#if !downtrend.onlyDowntrend}
        <div>
          <b>Lowest price </b>
          {timeToBuy.day} / {timeToBuy.value}€
        </div>
        <div>
          <b>Highest price </b>{timeToSell.day} / {timeToSell.value}€
        </div>
        <div>
          <b>Highest volume </b>{highestVolume.day} / {highestVolume.value}€
        </div>
      {:else}
        <div>You shouldnt buy or sell</div>
      {/if}
      <div>
        <b>Longest downtrend </b>
        {downtrend.length} days
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    box-sizing: border-box;
    overflow: hidden;
    color: white;
    border-radius: 3px;
    box-shadow: 0px 0px 10px 0px purple;
    background-color: #202121;
    overflow-y: hidden;
    max-width: 600px;
    height: 400px;
    margin: auto;
    margin-top: 0px;
  }

  .btn {
    cursor: pointer;
    background: none;
    border: 1px solid white;
    color: white;
    border-radius: 3px;
    width: 80px;
  }

  input {
    color: white;
    background: none;
    border-radius: 3px;
    border: 1px solid white;
  }

  .info-container {
    padding: 10px;
    display: flex;
    text-align: left;
    flex-direction: column;
  }
</style>
