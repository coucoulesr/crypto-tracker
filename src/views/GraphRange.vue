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
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "GraphRange",
  data: function() {
    return {
      crypto: "",
      currency: "",
      start: null,
      end: null
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
      if (this.endUnix > moment().unix()) {
        alert("End date must be in the past.");
        return null;
      } else if (this.endUnix - this.startUnix < 0) {
        alert("Start date cannot be before end date.");
        return null;
      } else if (this.endUnix == this.startUnix) {
        alert("Please enter different dates.");
        return null;
      }
      const urlArray = [
        "https://api.coingecko.com/api/v3/coins/",
        this.crypto,
        "/market_chart/range?vs_currency=",
        this.currency.toString(),
        "&from=",
        this.startUnix.toString(),
        "&to=",
        this.endUnix.toString()
      ];
      const dateFormat = "MMM DD, 'YY h:mm A";
      this.$emit("generateGraph", {
        url: urlArray.join(""),
        dateFormat: dateFormat,
        crypto: this.crypto,
        currency: this.currency
      });
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
