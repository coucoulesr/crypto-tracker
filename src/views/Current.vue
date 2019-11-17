<template>
  <div>
  <h2>Cryptocurrency Current Data (24 Hours)</h2>
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
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

const cryptoDict = {
  'bitcoin': ['Bitcoin', 'BTC'],
  'ethereum': ['Ethereum', 'ETH'],
  'bitcoin-cash': ['Bitcoin Cash', 'BCH']
}

export default {
    name: "Current",
    data: function() {
        return {
            crypto: "",
            currency: "",
        }
    },
    methods: {
        graphData: function() {
            const url = [
                'https://api.coingecko.com/api/v3/coins/', 
                this.crypto,
                '/market_chart?vs_currency=',
                this.currency,
                '&days=1'
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
              moment.unix(entry[0] / 1000).format("MMM D, h:mm A")
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
    }
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

@media (max-width: 600px) {
  .date-form {
    flex-direction: column;
  }
}
</style>