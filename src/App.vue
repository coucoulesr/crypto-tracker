<template>
  <div id="app">
    <navbar @destroy="destroy"/>
    <div class="container">
      <div class="graph-box">
        <router-view @generateGraph="generateGraph" />
        <canvas id="my-chart" :class="!chart ? 'hidden' : ''" ref="myChart" width="400" height="300"></canvas>
        <div class="performance" :class="!chart ? 'hidden' : ''"><h2>Performance:</h2>
          <div class="stats">
            <div><h3>Opening Value: {{ currencySymbol }}{{ openingValue }} </h3>
            <h3>Latest Value: {{ currencySymbol }}{{ latestValue }} </h3></div>
            <div><h3>Percent Change: </h3> <h3 :class="percentChange >= 0 ? 'green' : 'red'"> {{ percentRounded }} % </h3></div>
            <div><h3>Overall Change: </h3> <h3 :class="overallChange >= 0 ? 'green' : 'red'"> {{ currencySymbol }} {{ overallRounded }} </h3></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Chart from 'chart.js';

const currencyDict = {
  'usd' : ['$', "US Dollar"],
  'eur' : ['€', "Euro"],
  'jpy' : ['¥', "Japanese Yen"]
}

export default {
  name: "app",
  data: function() {
    return {
      chart: null,
      openingValue: null,
      latestValue: null,
      overallChange: null,
      percentChange: null,
      currencySymbol: null
    }
  },
  components: {
    Navbar
  },
  computed: {
      percentRounded: function() {
        return (Math.round(this.percentChange * 100) / 100).toFixed(2); 
        },
      overallRounded: function() {
        return (Math.round(this.overallChange * 100) / 100).toFixed(2);
      }
  },
  methods: { 
    generateGraph: function(payload) {
      if (this.chart) this.destroy();
      this.chart = new Chart(this.$refs.myChart, {
          type: "line",
          data: {
            labels: payload.dates,
            datasets: [
              {
                label: payload.crypto + " historical price, " + payload.currency.toUpperCase(),
                pointRadius: 1.75,
                pointHitRadius: 2,
                backgroundColor: "rgba(82, 101, 143, 0.2)",
                borderColor: "#333A56",
                color: "#333A56",
                data: payload.values
              }
            ]
          },
          options: {
            events: ['mousemove', 'touchstart', 'touchmove'],
            // legend: { display: false }
          }
        });
      this.calculatePerformance(payload.values, payload.currency)
    },
    destroy: function() {
      this.chart.destroy();
      this.chart = null;
      this.overallChange = null;
      this.percentChange = null;
    },
    calculatePerformance: function(valueArray, currency) {
      const final = valueArray[valueArray.length - 1];
      const initial = valueArray[0]
      this.openingValue = initial;
      this.latestValue = final;
      this.overallChange = final - initial;
      this.percentChange = (final - initial) * 100 / initial;
      this.currencySymbol = currencyDict[currency][0]
    }
  }
};
</script>

<style>
.graph-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  background-color: #F7F5E6;
  border: 1px solid black;
  border-radius: 5px;
  margin: 20px auto;
  padding: 20px;
}

.container{
  display: flex;
  align-content: center;
  justify-content: center;
}

.performance{
    align-self: stretch;
}

.stats{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

#my-chart {
  width: 100%;
  max-width: 800px;
  height: auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333A56;
  margin: 0;
}

.hidden {
  display: none;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>
