import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    getApiData: {
      tokenkey: "",
      username: "",
      status: ""
    }
  },
  mutations: {},
  actions: {}
});
