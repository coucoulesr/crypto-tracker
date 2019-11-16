import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import GraphRange from '../views/GraphRange';
import GraphToDate from '../views/GraphToDate';
import Current from '../views/Current';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/current",
    name: "current",
    component: Current
  },
  {
    path: "/to-date",
    name: "GraphToDate",
    component: GraphToDate
  },
  {
    path: "/historic",
    name: "GraphRange",
    component: GraphRange
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
