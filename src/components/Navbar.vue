<template>
  <div class="navbar">
    <div class="nav-left">
      <div class="nl-item" @click="$emit('destroy')"><router-link to="/"><h1>Cryptocurrency Price Index</h1></router-link></div>
    </div>
    <div class="nav-middle"></div>
    <div class="nav-right">
      <div class="nr-item" ref="nr-1" @click.prevent="highlight(1); $emit('destroy')"><router-link to="/current"><h2>Current</h2></router-link></div>
      <div class="nr-item" ref="nr-2" @click.prevent="highlight(2); $emit('destroy')"><router-link to="/historic"><h2>Historic</h2></router-link></div>
      <div class="nr-item" ref="nr-3" @click.prevent="highlight(3); $emit('destroy')"><router-link to="/to-date"><h2>To-Date</h2></router-link></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: function() {
    return {}
  },
  methods: {
    highlight : function(index) {
        for (let i=1; i < 4; i++) {
          this.$refs['nr-' + i].classList.remove("highlight");
        }
        this.$refs['nr-' + index].classList.toggle('highlight');
    }
  }
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  background: #333A56;
  color: #C6C6C6;
  margin: 0;
}

.nav-left{
  margin-left: 20px;
}

.nav-right{
  margin: 0;
  display: flex;
  align-items: center;
}

.nav-right:last-child {
  margin-right: 20px;
}

.nr-item {
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0;
}

.nr-item:hover, a:active, a:focus {
  background-color: rgba(82, 101, 143, 0.5);
  outline: none;
}

.nav-right h2 {
  padding: 0 10px;
}

a {
  text-decoration: none;
  color: #C6C6C6;
}

.highlight {
  background-color: rgba(82, 101, 143, 1);
}
.highlight a {
  color: #F7F5E6;
}

@media (max-width: 800px) {
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1rem;
  }
}
</style>