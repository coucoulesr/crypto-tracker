<template>
  <div class="message">
    <h2>Welcome to the Cryptocurrency Price Index!</h2>
    <p> 
      This web app uses the CoinGecko API to provide current, historical, and to-date price data on Bitcoin (BTC), Ethereum (ETH), and Bitcoin Cash (BCH).
      These data can be reported in US Dollars (USD), Euro (EUR), or Japanese Yen (JPY).
    </p><p>
      This web app was created from scratch with <a href="vuejs.org">Vue.js</a> and utilizes <a href="chartjs.org">Chart.js</a> for data visualization.
      For more information on the data provided by CoinGecko, visit the <a href="https://www.coingecko.com/en/api">CoinGecko API page</a>.
    </p><p>
      Click the links in the navigation bar above to get started with the service!
    </p>
    <a href="https://www.racoucoules.com/"><p>© 2019 Richard Coucoules</p></a>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
    };
  },
  components: {}
};
</script>

<style scoped>
a {
  color: blueviolet;
}

@media (min-width: 960px) {
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 1.5rem;
  }
}
</style>