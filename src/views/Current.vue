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
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Current",
  data: function() {
    return {
      crypto: "",
      currency: ""
    };
  },
  methods: {
    graphData: function() {
      const urlArray = [
        "https://api.coingecko.com/api/v3/coins/",
        this.crypto,
        "/market_chart?vs_currency=",
        this.currency,
        "&days=1"
      ];
      const dateFormat = "MMM D, h:mm A";
      this.$emit("generateGraph", {
        url: urlArray.join(""),
        dateFormat: dateFormat,
        crypto: this.crypto,
        currency: this.currency
      });
    }
  }
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

@media (max-width: 600px) {
  .date-form {
    flex-direction: column;
  }
}
</style>
