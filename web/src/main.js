import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./css/global.css";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/th";
import VueFusionCharts from "vue-fusioncharts";
import FusionCharts from "fusioncharts/core";
import FusionTheme from "fusioncharts/themes/es/fusioncharts.theme.fusion";
import Column2D from "fusioncharts/viz/column2d";
import Doughnut2D from "fusioncharts/viz/doughnut2d";
import Bar2D from "fusioncharts/viz/bar2d";
import "moment/locale/th";
import { VueMaskDirective } from 'v-mask'

Vue.directive('mask', VueMaskDirective);
Vue.use(
  VueFusionCharts,
  FusionCharts,
  FusionTheme,
  Column2D,
  Doughnut2D,
  Bar2D
);
Vue.use(require("vue-moment"));
Vue.use(ElementUI, { locale });
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
