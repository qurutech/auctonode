<template>
  <section class="home">
    <aucto-node-navbar />
    <main class="aucto-owners">
      <h1 class="section-heading"><i class="fas fa-bolt icon"></i> Network Status: <span class="icon">Active</span></h1>

      <section class="statistics">
        <section class="statistic">
          <h2 class="statistic__title">Total AuctoNodes:</h2>
          <p class="statistic__stat">{{filteredAuctArray.length}}</p>
        </section>
        <section class="statistic">
          <h2 class="statistic__title">Staked Auct Token:</h2>
          <p class="statistic__stat">36613408.26220146</p>
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


      <h1 class="section-heading" style="margin-bottom: 1rem"><i class="fas fa-users icon"></i> AuctoNode Explorer</h1>
      <section class="auct-node">
        <section class="header">
          <h2 class="header__title">Address</h2>
          <h2 class="header__title">Quantity</h2>
          <h2 class="header__title">KYI Status</h2>
        </section>
        <section class="body">
          <section v-for="(auct, index) in filteredAuctArray" :key="index" class="items">
            <section class="item">
              <p class="item__content"><a href="">{{auct.address}}</a></p>
              <p class="item__content">{{ auct.quantity }} Auct Token</p>
            </section>
            <p class="kyi-status">Verified</p>
            <a href="" class="vote">Vote</a>
          </section>
        </section>
      </section>
      <footer>
        <section>
          <h3 class="footer">AuctoNode &copy; 2019</h3> <br>
          <ul>
            <li><a href=""><i class="fas fa-futbol"></i> Need help?</a></li>
            <li><a href=""><i class="fas fa-lock"></i> Privacy Policy?</a></li>
            <li><a href="">Terms of Servie</a></li>
            <li><a href="">API Documentation</a></li>
          </ul>
        </section>
        <section>
          <ul class="social">
            <li><a href=""><i class="fab fa-telegram"></i></a></li>
            <li><a href=""><i class="fab fa-facebook-f"></i></a></li>
            <li><a href=""><i class="fab fa-twitter"></i></a></li>
            <li><a href=""><i class="fab fa-github"></i></a></li>
          </ul>
        </section>
      </footer>
    </main>
  </section>
</template>

<script>
// @ is an alias to /src
import AuctoNodeNavbar from "@/components/navbar";
export default {
  name: 'home',
  data() {
    return {
      assetID: "53VHGAEfVNJnByeMbu9r4DsxXoBz3TecQfWpYXAsZmzh",
      auctAsset: '',
      auctArray: [],
      filteredAuctArray: []
    }
  },
  methods: {
    getAuctoNodeOwners: function() {
      fetch(`https://nodes.wavesnodes.com/assets/${this.assetID}/distribution`).then(response => response.json())
      .then((response) =>{
        this.auct = response;
        for (let [key, value] of Object.entries(this.auct)) {
            let arrayEntry = {
              address: key,
              quantity: value / 100000000,
            }
            this.auctArray.push(arrayEntry)
        }

        this.filteredAuctArray = this.auctArray.filter((auct) => {
          return auct.quantity >= 1000000
        })
      })
    }
  },
  components: {
    AuctoNodeNavbar,
  },
  created() {
    this.getAuctoNodeOwners();
  }
}
</script>

<style lang="scss" scoped>
    $primary-color: #E21250;
    $secondary-color: darken($primary-color, 10%);
    main {
      font-family: 'Share Tech', sans-serif;
      padding: 1.25rem;
      background-color: $secondary-color; 
      margin-top: 0;
      padding-top: 5vh;np

      .section-heading {
        margin-left: 5rem;
        margin-bottom: 3rem;
        font-family: 'Share Tech', sans-serif;
        // color: rgba(248, 232, 11, 0.993);
        color: #E27B36;

        .icon {
          color: rgba(248, 232, 11, 0.993);
        }
      }
    }

    .header {
      display: flex;
      justify-content: space-evenly;
      margin-bottom: .5rem !important;
      color: lighten(#E27B36, 25%); 

      .header__title {
        font-weight: normal;
      }
    }

    .body {

      .items {
        display: flex;
        justify-content: space-around;
        margin: 0 auto;
      }

      .item {
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;
        margin-bottom: 2rem !important;
        width: 60%;
        background-color: $primary-color;
        border-radius: 5rem;
        -webkit-box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        a {
          color: rgba(248, 232, 11, 0.993);
          // color: lighten(#E27B36, 25%);
          text-decoration: none;
        }

        p.item__content {
          color: lighten(#E27B36, 25%); ;
        }
      }
    }

    .statistics {
      display: flex;
      justify-content: center;
      margin-bottom: 3rem;
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

    .kyi-status, .vote {
      background-color: lighten(#E27B36, 25%);
      padding: 1rem 2rem;
      color: $secondary-color;
      border-radius: 4px;
      margin-left: -133px;
      margin-top: 0;
      align-self: flex-start;
      text-decoration: none;
    }

    .vote {
      transition: all 500ms;
      background-color: $primary-color;
      color: lighten(#E27B36, 25%);
      &:hover {
        color: $secondary-color;
        background-color: lighten(#E27B36, 25%);
      }
    }

    footer {
      padding: 3rem 3rem;
      .footer {
        margin-bottom: 0 !important;
        // color: rgb(56, 53, 53);
        font-weight: normal;
      }
      ul {
        display: flex;
        list-style-type: none;
        padding: 0;
        li {
          margin-right: 1rem !important;
          a {
            text-decoration: none;
      color: lighten(#E27B36, 25%); 

          }
          margin: 0;

        }
      }

      .social {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
    }

    .section-heading {
        margin-left: 5rem;
        margin-bottom: 3rem;
        font-family: 'Share Tech', sans-serif;
        // color: rgba(248, 232, 11, 0.993);
        color: #E27B36;

        .icon {
          color: rgba(248, 232, 11, 0.993);
        }
      }
</style>

