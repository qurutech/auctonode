<template>
  <section class="dashboard">

    <sidebar-nav />

    <section class="statistics">
      <section class="statistic">
        <h2 class="statistic__title">Current AuctToken Price</h2>
        <p class="statistic__stat">10</p>
      </section>
      <section class="statistic">
        <h2 class="statistic__title">Current Waves Price</h2>
        <p class="statistic__stat" v-if="waves">{{waves.USD}} USD</p>
      </section>
      <section class="statistic">
        <h2 class="statistic__title">Shared Revenue:</h2>
        <p class="statistic__stat">28.32 WAVES</p>
      </section>
      <section class="statistic">
        <h2 class="statistic__title">Next Payout:</h2>
        <p class="statistic__stat">APRIL</p>
      </section>
    </section>

  </section>

</template>
<script>
import { mapState } from 'vuex'
import sidebarNav from '@/components/sidebarNav'
export default {
  name: 'Dashboard',
  data() {
    return {
      waves: ''
    }
  },
  computed: mapState(['userAddress']),
  components: {
    sidebarNav,
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
        console.log(response)
      })
    }
  },
  mounted() {
    this.fetchWavesPrice()
  }
}
</script>
<style lang="scss" scoped>
$primary-color: #E21250;
$secondary-color: darken($primary-color, 10%);
.dashboard {
  font-family: 'Share Tech', sans-serif;
  height: 100vh;
  background-color: $secondary-color;
  margin: 0;
  display: flex;
  justify-content: flex-end;
}

.link {
  color: $secondary-color;
}
    .statistics {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 3rem;
      width: 70%;
      .statistic {        
        width: 220px;
        height: 129px;
        margin-bottom: 30px;
        border-radius: 8px;
        border: none;
        background-image: linear-gradient(-135deg,$primary-color,$secondary-color);
        margin-right: 2rem;
        -webkit-box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        padding: 1.25rem;


        .statistic__title {
          font-weight: 500;
          color: lighten(#E27B36, 25%);
          margin-bottom: 25px;
          font-family: 'Share Tech', sans-serif;
        }

        .statistic__stat {
          font-size: 30px;
          color: lighten(#E27B36, 25%);
          margin-bottom: 0;
        }
      }
    }


    
</style>


