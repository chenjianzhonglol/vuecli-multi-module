import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import One from "./pages/One";
import Two from "./pages/Two";

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  router: new VueRouter({
    routes: [
      {
        path: "/1",
        component: () => {
          One;
        },
      },
      {
        path: "/2",
        component: () => {
          Two;
        },
      },
    ],
  }),
  render: (h) => h(App),
}).$mount("#app");
