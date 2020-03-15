import Vue from "vue";
import Vuex from "vuex";
import { router } from "./router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    auctAssetId: "53VHGAEfVNJnByeMbu9r4DsxXoBz3TecQfWpYXAsZmzh",
    auctAddress: "3P7H2Zqt4NK3J5Q2wF8gjcLw9187gC1bbAG",
    wctAssetId: "DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J",
    currentLoggedInUser:
      JSON.parse(localStorage.getItem("wavesKeeperData")) || {},
    verifiedAccounts: [
      "3PFrT13RvswumoM2UyvdLMt8g48xvsYNn7x",
      "3PN24XrdwviNRMA6XYqByQehzztkNRd9SAR",
      "3P4QGiLzqgT78FxJETT8Mpeeo6XYpA3NZGi",
      "3PP6xS1gT8sRaiPjxLT8hFYHRJQdkjBTrax",
      "3P753twEWYXBVSB9VmfQKS7oTocHDfirEdT",
      "3P5P3HoTTiYjoJAyRRez6mpXG9iyxtHWyRd",
      "3P3432nUrDSNKNAP5a4uSPEFAb9zvrb2s42",
      "3PBwmY7U6YwDjb22jC4fWfCnNyuuTECTQs4",
      "3PCkhxGNbT1CwSmHLw6g2zYk6QqZ51bVXyo",
      "3P7H2Zqt4NK3J5Q2wF8gjcLw9187gC1bbAG",
      "3PPCzX2doZ7agBNuGSKqjrbdXgGEtE7CpQ3"
    ],
    totalStakedAuctTokens: 0,
    auctoNodeOwners: [],
    auctTokenHolders: []
  },
  getters: {
    auctoNodeOwnersCount(state) {
      return state.auctoNodeOwners.length
        ? state.auctoNodeOwners.length - 1
        : 0;
    },
    verifiedAuctoNodeOwners(state) {
      return state.auctoNodeOwners.length
        ? state.auctoNodeOwners.filter(function verifiedOwner(owner) {
            return (
              state.verifiedAccounts.includes(owner.address) &&
              owner.address !== state.auctAddress
            );
          })
        : [];
    }
  },
  mutations: {
    LOGIN(state, payload) {
      state.isLoggedIn = true;
      state.currentLoggedInUser = payload;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
    },
    SET_TOTAL_STAKED_AUCT(state, payload) {
      state.totalStakedAuctTokens = payload;
    },
    SET_AUCTONODE_OWNERS(state, payload) {
      state.auctoNodeOwners = payload;
    },
    SET_AUCT_TOKEN_HOLDERS(state, payload) {
      state.auctTokenHolders = payload;
    }
  },
  actions: {
    performWavesKeeperLogin(context) {
      context.commit("RESET_LOGIN_STATE");
      context.commit("UPDATE_LOGIN_STATE", "LOGGING_IN");
      const authData = {
        data: "Auctonode Auth",
        name: "Auctonode",
        icon: "https://wavesmania.net/images/aucttoken.png",
        referrer: "/",
        successPath: "/"
      };
      try {
        // eslint-disable-next-line no-undef
        WavesKeeper.auth(authData)
          .then(data => {
            context.commit("LOGIN", data);
            // Storing data to local Storage for better UX and persistence
            const publicState = JSON.stringify(data);
            localStorage.setItem("wavesKeeperData", publicState);
            localStorage.setItem("isLoggedIn", true);
          })
          .catch(error => {
            this.$toasted.error(error.message);
          });
      } catch (_) {
        context.commit("UPDATE_LOGIN_STATE", "LOG_IN_FAIL");
      }
    },
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
    },
    getAuctoNodeOwners(context) {
      fetch(
        `https://nodes.wavesnodes.com/assets/${context.state.auctAssetId}/distribution`
      )
        .then(response => response.json())
        .then(response => {
          const auct = response;
          const auctTokenHolders = [];
          // Iterating on the return object of objects to structure into an array of objects instead
          for (let [key, value] of Object.entries(auct)) {
            let arrayEntry = {
              address: key,
              quantity: value / 100000000,
              status: context.state.verifiedAccounts.includes(key)
                ? "Verified"
                : "Unverified"
            };
            auctTokenHolders.push(arrayEntry);
          }

          context.commit("SET_AUCT_TOKEN_HOLDERS", auctTokenHolders);

          // Filtering to only get Auctonode owners
          const auctoNodeOwners = auctTokenHolders
            .filter(auct => {
              return auct.quantity >= 1000000;
            })
            .sort(function(a, b) {
              return b.quantity - a.quantity;
            });

          context.commit("SET_AUCTONODE_OWNERS", auctoNodeOwners);
          // Removing Auctionlance Waves Address and Adding all quantity to get the total staked Auct Token
          const totalStakedAuct = auctoNodeOwners
            .filter(
              auct => auct.address !== "3P7H2Zqt4NK3J5Q2wF8gjcLw9187gC1bbAG"
            )
            .reduce((total, auct) => {
              return total + auct.quantity;
            }, 0);

          context.commit("SET_TOTAL_STAKED_AUCT", totalStakedAuct);
        });
    }
  }
});
