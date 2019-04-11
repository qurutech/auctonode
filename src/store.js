import Vue from 'vue';
import Vuex from 'vuex';
import {router} from './router';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    userAddress: JSON.parse(localStorage.getItem("userAddress")) || "",
    auctAssetId: "53VHGAEfVNJnByeMbu9r4DsxXoBz3TecQfWpYXAsZmzh",
    auctAddress: "3P7H2Zqt4NK3J5Q2wF8gjcLw9187gC1bbAG",
    wctAssetId: 'DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J'
  },
  mutations: {
    LOGIN(state) {
      state.isLoggedIn = true;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    login(context) {
      context.commit("LOGIN");
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      router.push("/dashboard");
    },
    logout(context) {
      context.commit("LOGOUT");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userAddress");
      localStorage.removeItem("authorize");
      router.push("/authorize");
    }
  }
});
