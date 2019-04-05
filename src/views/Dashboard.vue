<template>
    <dashboard-layout>

        <template slot="sidebar">
          <sidebar-nav :isActive="1" />
        </template>


        <template slot="content">
            <section class="statistics">
              <section class="statistic">
                <h2 class="statistic__title">Auct Token <br /> Current  Price</h2>
                <p class="statistic__stat">10</p>
              </section>
              <section class="statistic">
                <h2 class="statistic__title">Waves <br /> Current  Price</h2>
                <p class="statistic__stat" v-if="waves">{{waves.USD}} USD</p>
              </section>
              <section class="statistic">
                <h2 class="statistic__title">Waves Balance</h2>
                <p class="statistic__stat">{{wavesBalance}} WAVES</p>
              </section>
              <section class="statistic">
                <h2 class="statistic__title">Auct Token <br /> Balance</h2>
                <p class="statistic__stat">{{auctBalance}} Auct Token</p>
              </section>
          </section>
          <section class="welcome">
            <p>Welcome, {{userAddress}}</p>
          </section>
          <section class="voting-history">
            <h3>Voting History</h3>
            <p>No votes have been carried out recently by Auctonode</p>
          </section>
        </template>
    </dashboard-layout>
</template>
<script>
import { mapState } from 'vuex'
import sidebarNav from '@/components/sidebarNav'
import dashboardLayout from '@/components/Layouts/dashboardLayout'
export default {
  name: 'Dashboard',
  data() {
    return {
      waves: '',
      wavesBalance: 0,
      auctBalance: 0
    }
  },
  computed: mapState(['userAddress', 'auctAddressId']),
  components: {
    sidebarNav,
    dashboardLayout
  },
  methods: {
    fetchWavesPrice() {
      fetch('https://min-api.cryptocompare.com/data/price?fsym=WAVES&tsyms=USD', {
        headers: {
          'Authorization': 'Apikey ee05c52992071556a818f4f0b2c08d21f9cc815afb499e65bbfd34a220ae0cd7'
        }
      }).then(response => response.json())
      .then(response => {
        this.waves = response;
      })
    },
    fetchCurrentWavesBalance() {
      fetch(`https://nodes.wavesplatform.com/addresses/balance/${this.userAddress}`)
      .then(response => response.json())
      .then(response => this.wavesBalance = response.balance / 100000000)
    },
    fetchCurrentAuctBalance() {
      fetch(`https://nodes.wavesplatform.com/assets/balance/${this.userAddress}/${this.auctAddressId}`)
      .then(response => response.json())
      .then(response => this.auctBalance = response.balance / 100000000)
    }
  },
  created() {
    this.fetchWavesPrice();
    this.fetchCurrentWavesBalance();
    this.fetchCurrentAuctBalance();
  }
}
</script>
<style lang="scss" scoped>
$primary-color: #E21250;
$secondary-color: darken($primary-color, 10%);

.link {
  color: $secondary-color;
}
    .statistics {
      display: flex;
      justify-content: center;
      margin-top: 4rem;
      margin-bottom: 3rem;
      width: 80%;
      .statistic {        
        width: 220px;
        height: 80px;
        margin-bottom: 30px;
        border-radius: 8px;
        border: none;
        text-align: center;
        background-image: linear-gradient(-135deg,$primary-color,$secondary-color);
        margin-right: 2rem;
        -webkit-box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        padding: 1.25rem;


        .statistic__title {
          font-weight: 500;
          color: lighten(#E27B36, 25%);
          margin-bottom: 15px;
          font-family: 'Share Tech', sans-serif;
          font-size: 16px !important;
        }

        .statistic__stat {
          font-size: 16px;
          color: lighten(#E27B36, 25%);
          margin-bottom: 0;
        }
      }
    }

  .welcome {
    color: lighten(#E27B36, 25%);
    position: fixed;
    left: 270px;
    right: 20px;
  }

  .voting-history {
    margin-top: 10vh;
    align-self: center;
    color: lighten(#E27B36, 25%);

    h3 {
      text-align: center;
    }
  }
</style>


