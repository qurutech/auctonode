import Vue from 'vue';
import Vuex from 'vuex';
import {router} from './router';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    userAddress: JSON.parse(localStorage.getItem("userAddress")) || ""
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
      router.push("/");
    }
  }
});
