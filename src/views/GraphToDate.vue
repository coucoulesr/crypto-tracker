<template>
  <div>
  <h2>Cryptocurrency To-Date Price</h2>
    <form @submit.prevent="graphData" class="date-form">
      <select v-model="crypto" name="crypto" required>
        <option disabled value>Select a cryptocurrency</option>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="bitcoin-cash">Bitcoin Cash</option>
      </select>
      <select v-model="currency" name="currency" required>
        <option disabled value>Select a currency</option>
        <option value="usd">US Dollar ($)</option>
        <option value="eur">Euro (€)</option>
        <option value="jpy">Japanese Yen (¥)</option>
      </select>
      <select v-model="timeFrame" name="time-frame" required>
        <option disabled value>Select a timeframe</option>
        <option value="year">Year-to-date</option>
        <option value="month">Month-to-date</option>
        <option value="week">Week-to-date</option>
        <option value="custom">Custom</option>
      </select>
      <label for="start-date" v-if="timeFrame == 'custom'">Start Date:</label>
      <input type="date" id="start-date" v-model="customDays" v-if="timeFrame == 'custom'" />
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import axios from "axios"; //eslint-disable-line
import moment from "moment"; //eslint-disable-line
import Chart from "chart.js"; //eslint-disable-line

const cryptoDict = {
  'bitcoin': ['Bitcoin', 'BTC'],
  'ethereum': ['Ethereum', 'ETH'],
  'bitcoin-cash': ['Bitcoin Cash', 'BCH']
}

export default {
  name: "GraphToDate",
  data: function() {
    return {
      timeFrame: "",
      customDays: null,
      crypto: "",
      currency: "",
    };
  },
  computed: {
    startDaysAgo: function() {
      // moment() returns a moment object with current timee
      switch(this.timeFrame) {/* eslint-disable no-case-declarations */
        case 'year':
          const yearStart = moment(moment().year().toString() + "-01-01");
          return moment().diff(yearStart, 'days') + 1;
        case 'month':
          const monthStart = moment(moment().year().toString() + '-' + (moment().month() + 1).toString() + '-01');
          return moment().diff(monthStart, 'days');
        case 'week':
          return moment().weekday();
      } /* eslint-enable no-case-declarations */
      if (this.customDays && moment(this.customDays).unix() <= moment().unix()) {
        return moment().diff(moment(this.customDays), 'days');
      } else { return undefined; }
    },
  },
  methods: {
    graphData: function() {
      if(this.startDaysAgo < 0 || typeof this.startDaysAgo == "undefined") {
        alert("Please enter a start date in the past.");
        return null;
      }
      const url = ['https://api.coingecko.com/api/v3/coins/', 
      this.crypto,
      '/market_chart?vs_currency=',
      this.currency,
      '&days=',
      this.startDaysAgo]

      axios.get(url.join("")).then(
        res => {
          let dates = [];
          let values = [];

          const prices = res.data.prices;          
          let thinRatio = 1000;            // value corresponds to simple data decimation function; every nth data point is thrown away
          if (prices.length >= 50) {
            thinRatio = Math.ceil( 1 + 250 / prices.length );
          }

          // Populate histDates (x) and histValues (y) with price data
          prices.forEach((entry, index) => {
            if (index % thinRatio == 0) {
              return null;
            }
            dates.push(
              moment.unix(entry[0] / 1000).format("MMM Do, 'YY h:mm A")
            );
            values.push(Math.round(entry[1] * 100) / 100);
          });

          this.$emit('generateGraph', {dates: dates, values: values, crypto: cryptoDict[this.crypto][0], currency: this.currency});
        },
        err => {
          if (err) alert(err);
        }
      );
    },
  },
  components: {},
}
</script>

<style scoped>
.date-form {
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

input,
label,
select,
button {
  margin: 2px 5px;
}

@media (max-width: 875px) {
  .date-form {
    flex-direction: column;
  }
}
</style>