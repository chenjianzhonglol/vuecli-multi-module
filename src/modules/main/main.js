import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  router: new VueRouter({
    routes: [
      {
        path: "/1",
        component: () => import("./pages/One"),
      },
      {
        path: "/2",
        component: () => import("./pages/Two"),
      },
    ],
  }),
  render: (h) => h(App),
}).$mount("#app");
