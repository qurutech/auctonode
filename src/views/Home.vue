<template>
  <section class="home">
    <aucto-node-navbar :randomString="randomString" />
    <main class="aucto-owners">
      <h1 class="section-heading"><i class="fas fa-bolt icon"></i> Network Status: <span class="icon">Active</span></h1>

      <section class="statistics">
        <section class="statistic">
          <h2 class="statistic__title">Total AuctoNodes:</h2>
          <p class="statistic__stat" v-if="filteredAuctArray.length > 0">{{filteredAuctArray.length - 1}}</p>
        </section>
        <section class="statistic">
          <h2 class="statistic__title">Staked Auct Token:</h2>
          <p class="statistic__stat">{{totalStakedAuct | currency(' ')}}</p>
        </section>
        <section class="statistic">
          <h2 class="statistic__title">Shared Revenue:</h2>
          <p class="statistic__stat">104.139 WAVES</p>
        </section>
        <section class="statistic">
          <h2 class="statistic__title">Next Payout:</h2>
          <p class="statistic__stat">SEPTEMBER</p>

        </section>
      </section>


      <h1 class="section-heading" style="margin-bottom: 1rem"><i class="fas fa-users icon"></i> AuctoNode Explorer</h1>
      <section class="auct-node">
        <section class="header">
          <h2 class="header__title">Address</h2>
          <h2 class="header__title">Quantity</h2>
          <h2 class="header__title" id="kyc-status">KYC Status</h2>
        </section>
        <section v-if="filteredAuctArray.length == 0" class="loading">AuctoNode is fetching owners. Please wait..</section>
        <section class="body" else>
          <section v-for="(auct, index) in filteredAuctArray" :key="index" class="items">
            <section class="item">
              <p class="item__content"><a :href="'https://wavesexplorer.com/address/' + auct.address" target="_blank">{{auct.address | truncate(30)}}</a></p>
              <p class="item__content">{{ auct.quantity | currency(' ')}} Auct Token</p>
            </section>

            <p class="kyi-status">
              <span v-if="auct.status == 'Verified'"><i class="fa fa-certificate"></i></span>
              {{ auct.status }}
            </p>

            <router-link :to="'vote/' + auct.address" class="vote">Vote</router-link>

          </section>
        </section>
        <section class="mobile-auctonode" else>
          <section class="mobile-card" v-for="(auct, index) in filteredAuctArray" :key="index">
              <section>
                <p class="address"><a :href="'https://wavesexplorer.com/address/' + auct.address" target="_blank">{{auct.address | truncate(30)}}</a></p>
                <p class="quantity">{{ auct.quantity | currency(' ')}} Auct Token</p>

                <section class="mobile-auctonode__footer">
                  <p class="kyc-status">
                    <span v-if="auct.status == 'Verified'"><i class="fa fa-certificate"></i></span>
                    {{ auct.status }}</p>
                  <p>
                    <a href="" class="mobile-vote">Vote</a>
                  </p>
                </section>
              </section>
          </section>
        </section>
      </section>
      <footer>
        <section>
          <h3 class="footer">AuctoNode &copy; 2019</h3> <br>
          <ul>
            <li><a href="https://t.me/auctionlance"><i class="fas fa-futbol"></i> Need help?</a></li>
            <li><a href="https://www.auctionlance.com"><i class="fas fa-globe"></i> Our Website</a></li>
            <li><a href="https://forum.wavesplatform.com/t/auctionlance-platform-hire-and-pay-freelancers-with-crypto/10850"><i class="fas fa-question-circle"></i> How It Works</a></li>
          </ul>
        </section>
        <section>
          <ul class="social">
            <li><a href="https://t.me/auctionlance"><i class="fab fa-telegram"></i></a></li>
            <li><a href="https://facebook.com/auctionlance"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="https://twitter.com/aucttoken"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://github.com/auctionlance"><i class="fab fa-github"></i></a></li>
            <li><a href="https://youtube.com/auctionlance"><i class="fab fa-youtube"></i></a></li>
          </ul>
        </section>
      </footer>
    </main>
  </section>
</template>

<script>
// @ is an alias to /src
import AuctoNodeNavbar from "@/components/navbar";
import getQueryVariable from "@/helpers/getQueryVariable";
import addressExist from "@/helpers/addressExist";
import {validate} from "@/helpers"
import {mapActions, mapState} from 'vuex';
import random from '@/helpers/random';
export default {
  name: 'home',
  data() {
    return {
      assetID: "53VHGAEfVNJnByeMbu9r4DsxXoBz3TecQfWpYXAsZmzh",
      auctAsset: '',
      auctArray: [],
      filteredAuctArray: [],
      randomString: '',
      totalStakedAuct: 0,
      verifiedAccounts: ["3PFrT13RvswumoM2UyvdLMt8g48xvsYNn7x", "3PN24XrdwviNRMA6XYqByQehzztkNRd9SAR", "3P4QGiLzqgT78FxJETT8Mpeeo6XYpA3NZGi", "3PP6xS1gT8sRaiPjxLT8hFYHRJQdkjBTrax", "3P753twEWYXBVSB9VmfQKS7oTocHDfirEdT", "3P5P3HoTTiYjoJAyRRez6mpXG9iyxtHWyRd", "3P3432nUrDSNKNAP5a4uSPEFAb9zvrb2s42", "3PBwmY7U6YwDjb22jC4fWfCnNyuuTECTQs4", "3PCkhxGNbT1CwSmHLw6g2zYk6QqZ51bVXyo", "3P7H2Zqt4NK3J5Q2wF8gjcLw9187gC1bbAG", "3PPCzX2doZ7agBNuGSKqjrbdXgGEtE7CpQ3"]
    }
  },
  computed: mapState(['isLoggedIn']),
  methods: {
    ...mapActions(['login']),
    getAuctoNodeOwners: function() {
      fetch(`https://nodes.wavesnodes.com/assets/${this.assetID}/distribution`).then(response => response.json())
      .then((response) =>{

        this.auct = response;

        // Iterating on the return object of objects to structure into an array of objects instead
        for (let [key, value] of Object.entries(this.auct)) {
            let arrayEntry = {
              address: key,
              quantity: value / 100000000,
              status: this.verifiedAccounts.includes(key) ? "Verified" : "Unverified"
            }
            this.auctArray.push(arrayEntry)
        }


        // Filtering to only get Auctonode owners
        this.filteredAuctArray = this.auctArray.filter((auct) => {
          return auct.quantity >= 1000000
        }).sort(function(a, b){return b.quantity-a.quantity})

        // Removing Auctionlance Waves Address and Adding all quantity to get the total staked Auct Token
        this.totalStakedAuct = this.filteredAuctArray.filter(auct => auct.address !== '3P7H2Zqt4NK3J5Q2wF8gjcLw9187gC1bbAG').reduce((total, auct) => {
          return total + auct.quantity
        }, 0)

        if (getQueryVariable("a") && getQueryVariable("p")) {
          const isAddress = addressExist(this.filteredAuctArray, getQueryVariable("a"));
          const addressIsValid = validate.addressValidate(getQueryVariable("p"), getQueryVariable("a"))

          const signedData = {
            host: 'https://auctonode.herokuapp.com/',
            data: this.randomString
          }

          let signatureCheck = validate.authValidate(signedData, getQueryVariable("s"), getQueryVariable("p"));

          signatureCheck.then(result => {
            if(result === false) {
              this.$toasted.error(
              "Signature is not valid",{
                icon : {
                  name: "fa-exclamation-circle"
                }
              }
              );
              return;
            }
          })
          if (isAddress && addressIsValid) {
            this.login();
            localStorage.setItem("userAddress", JSON.stringify(getQueryVariable("a")));
          } else if(!addressIsValid) {
            this.$toasted.error(
              "Address does not match public key - address swapping detected",{
                icon : {
                  name: "fa-exclamation-circle"
                }
              }
              );
          }
          else {
            this.$toasted.error(
              "Only AuctoNode Owners can login at this moment",{
                icon : {
                  name: "fa-exclamation-circle"
                }
              }
              );
          }
        }
      })
    },
    generateRandomString() {
      this.randomString = random();
    }
  },
  components: {
    AuctoNodeNavbar,
  },
  created() {
    this.getAuctoNodeOwners();
    this.generateRandomString()

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
      padding-top: 5vh;
      @media screen and (max-width: 767px) {
      }
    }

    .header {
      display: flex;
      justify-content: space-evenly;
      margin-bottom: .5rem !important;
      color: lighten(#E27B36, 25%);

      @media screen and (max-width: 767px) {
        & {
          display: none;
        }
      }
      .header__title {
        font-weight: normal;
        @media screen and (max-width: 767px) {
          font-size: 18px;
        }
      }
    }

    .body {

      @media screen and (max-width: 767px) {
        & {
          display: none;
        }
      }
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

        @media screen and (max-width: 767px) {
          justify-content: flex-end;
          width: 100%;
          overflow: auto;
        }
        a {
          color: rgba(248, 232, 11, 0.993);
          // color: lighten(#E27B36, 25%);
          text-decoration: none;
        }

        p.item__content {
          color: lighten(#E27B36, 25%);

          @media screen and (max-width: 767px) {
            font-size: 12px;
            margin-right: .5rem;

          }
        }
      }
    }

    .statistics {
      display: flex;
      justify-content: center;
      margin-bottom: 3rem;
      overflow: auto;

      @media screen and (max-width: 767px) {
        & {
          overflow: auto;
          width: 100%;
          justify-content: flex-start;

        }
      }
      .statistic {

        &:first-child {
          margin-left: .5rem;
        }

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
        flex-shrink: 0;

        @media screen and (max-width: 767px) {
          width: 149px;
        }
        .statistic__title {
          font-weight: 500;
          color: lighten(#E27B36, 25%);
          margin-bottom: 25px;
          font-family: 'Share Tech', sans-serif;
          @media screen and (max-width: 767px) {
            font-size: 24px;
          }
        }

        .statistic__stat {
          font-size: 30px;
          color: lighten(#E27B36, 25%);
          margin-bottom: 0;

          @media screen and (max-width: 767px) {
            font-size: 18px;
          }
        }
      }
    }

    .kyi-status, .vote, .loading {
      background-color: lighten(#E27B36, 25%);
      padding: 1rem 2rem;
      color: $secondary-color;
      border-radius: 4px;
      margin-left: -133px;
      margin-top: 0;
      align-self: flex-start;
      text-decoration: none;
      box-sizing: border-box;
    }
    @media screen and (max-width: 767px) {
      .kyi-status, .vote {
        display: none;
      }
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

      @media screen and (max-width: 767px) {
        & {
          padding: 0;
          margin-bottom: 3rem;
        }
      }
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

        @media screen and (max-width: 767px) {
          & {
            justify-content: center;
            align-items: center
          }
        }
      }
    }

    .section-heading {
        margin-left: 5rem;
        margin-bottom: 3rem !important;
        font-family: 'Share Tech', sans-serif;
        color: #E27B36;
        @media screen and (max-width: 767px) {
          margin-left: 0;
          font-size: 20px;
        }
        .icon {
          color: rgba(248, 232, 11, 0.993);
        }
      }
      .loading {
        margin: 2rem auto;
        width: 20%;
        text-align: center;
        animation: bounce 900ms;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
        transform-origin: bottom;

        @media screen and (max-width: 767px) {
          & {
            width: 50%;
          }
        }
      }

      @keyframes bounce {
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-100px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-7px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }
    }

  .mobile-auctonode {
    display: none;
  }
  @media screen and (max-width: 767px) {

    .mobile-auctonode {
      display: flex;
      flex-direction: column;
      .mobile-card {
        border-radius: 8px;
        border: none;
        background-image: linear-gradient(-135deg,$primary-color,$secondary-color);
        -webkit-box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
        padding: 1.5rem 1rem;
        margin-bottom: 2rem;
        font-size: 18px;
        color: lighten(#E27B36, 25%);
        p.quantity {
          font-size: 24px;
        }
        .address {
          a {
            color: rgba(248, 232, 11, 0.993);
            text-decoration: none;
          }
        }
        .mobile-vote {
          background-color: lighten(#E27B36, 25%);
          padding: 1rem 2rem;
          color: $secondary-color;
          border-radius: 4px;
          text-decoration: none;
          text-align: center;
        }
      }
    }

    .mobile-auctonode__footer {
      display: flex;
      justify-content: space-between;
      width: 100%;


    }
  }
</style>

