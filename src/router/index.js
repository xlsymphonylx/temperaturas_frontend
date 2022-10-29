import Vue from "vue";
import Router from "vue-router";

const routerOptions = [
  { path: "/", component: "Home" },
  { path: "/temperaturas", component: "Temperaturas" },
];

const routes = routerOptions.map((route) => {
  return {
    ...route,
    component: () => import(`../pages/${route.component}.vue`),
  };
});

Vue.use(Router);

export default new Router({
  mode: "history",
  routes,
});
