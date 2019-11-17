<template>
    <div>
    <h2>Cryptocurrency Historical Price</h2>
    <form class="date-form" @submit.prevent="graphData">
      <div>
        <label for="start-date">Start Date:</label>
        <input v-model="start" type="date" id="start-date" required /> -
      </div>
      <div>
        <label for="end-date">End Date:</label>
        <input v-model="end" type="date" id="end-date" required />
      </div>
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
      <input type="submit" @click.prevent="graphData" value="Submit" />
    </form>
    </div>
</template>

<script>
import axios from "axios"; //eslint-disable-line
import moment from "moment"; //eslint-disable-line

const cryptoDict = {
  'bitcoin': ['Bitcoin', 'BTC'],
  'ethereum': ['Ethereum', 'ETH'],
  'bitcoin-cash': ['Bitcoin Cash', 'BCH']
}

export default {
  name: "GraphRange",
  data: function() {
    return {
      crypto: "",
      currency: "",
      start: null,
      end: null,
    };
  },
  computed: {
    startUnix: function() {
      return moment(this.start).unix();
    },
    endUnix: function() {
      return moment(this.end).unix();
    }
  },
  methods: {
    graphData: function() {
      if (this.endUnix - this.startUnix < 0) {
        alert('Start date cannot be before end date.');
        return null;
      }
      const url = [
        "https://api.coingecko.com/api/v3/coins/",
        this.crypto,
        "/market_chart/range?vs_currency=",
        this.currency.toString(),
        "&from=",
        this.startUnix.toString(),
        "&to=",
        this.endUnix.toString()
      ];
      axios.get(url.join("")).then(
        res => {
          let dates = [];
          let values = [];
          
          const prices = res.data.prices;
          let thinRatio = 1000;
          if (prices.length >= 50) {
            thinRatio = Math.ceil( 1 + 250 / prices.length );
          }

          prices.forEach((entry, index) => {

            if (index % thinRatio == 0) {
              return null;
            }
            dates.push(
              moment.unix(entry[0] / 1000).format("MMM Do, 'YY h:mm A")
            );
            values.push(Math.round(entry[1] * 100) / 100);
          });

          this.$emit('generateGraph', {dates: dates, values: values, crypto: cryptoDict[this.crypto][0], currency: this.currency})
        },
        err => {
          if (err) alert(err);
        }
      );
    }
  },
  components: {}
};
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

@media (max-width: 1180px) {
  .date-form {
    flex-direction: column;
  }
}
</style>