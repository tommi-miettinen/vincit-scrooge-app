<script>
  import Chart from "../Chart/Chart.svelte";
  import { fetchBitcoinChart } from "../../api/bitcoin";
  import {
    getDowntrendDays,
    getLowestValueTuple,
    getHighestValueTuple,
    getDailyData,
    getHighestVolume,
  } from "./PriceData.utils";

  let data;
  let downtrend;
  let timeToBuy;
  let timeToSell;
  let highestVolume;
  let fromDate;
  let toDate;

  const fetchData = async () => {
    if (!fromDate && !toDate) return;
    if (fromDate > toDate) return;

    let formattedFromDate = new Date(fromDate).getTime() / 1000;
    let formattedToDate = new Date(toDate).getTime() / 1000;

    data = await fetchBitcoinChart(formattedFromDate, formattedToDate + 3600);
    data = {
      ...data,
      total_volumes: getDailyData(data.total_volumes),
      prices: getDailyData(data.prices),
    };

    highestVolume = getHighestVolume(data.total_volumes);
    downtrend = getDowntrendDays(data.prices);
    timeToBuy = getLowestValueTuple(data.prices);
    timeToSell = getHighestValueTuple(data.prices);
  };
</script>

<div class="container">
  <Chart {data} />
  <div class="info-container">
    <div>
      From: <input type="date" on:change={(e) => (fromDate = e.target.value)} />
      To: <input type="date" on:change={(e) => (toDate = e.target.value)} />
      <button class="btn" on:click={fetchData}>Get Data</button>
    </div>
    {#if data}
      <div class="info-text-container">
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
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    color: purple;
    border-radius: 3px;
    box-shadow: 0px 0px 3px 0px purple;
    background-color: white;
    overflow-y: hidden;
    width: 40%;
    height: 430px;
    margin: auto;
    margin-top: 48px;
  }

  .btn {
    cursor: pointer;
    background-color: purple;
    border: 1px solid purple;
    color: white;
    border-radius: 3px;
    width: 100px;
  }

  input {
    color: purple;
    border-radius: 3px;
    border: 1px solid purple;
  }

  .info-container {
    display: flex;
    text-align: center;
    flex-direction: column;
    min-height: 50%;
    width: 100%;
    padding: 10px 0px;
  }

  .info-text-container {
    text-align: left;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    padding-left: 20px;
  }

  @media only screen and (max-width: 1200px) {
    .container {
      width: 50%;
    }
  }

  @media only screen and (max-width: 1000px) {
    .container {
      width: 60%;
    }
  }

  @media only screen and (max-width: 800px) {
    .container {
      width: 100%;
      margin-top: 0px;
    }
  }
</style>
