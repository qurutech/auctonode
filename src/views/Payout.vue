<template>
  <dashboard-layout>
    <template slot="sidebar">
        <sidebar-nav :isActive="3" />
    </template>
    <template slot="content">
      <form class="payout-form" @submit.enter.prevent="generateRewardSplits">
        <input type="text" name="rewards" id="rewards" placeholder="Enter rewards" autofocus v-model="reward" autocomplete="false" />
        <textarea name="splits" id="split" cols="30" rows="10" v-model="rewardString" readonly v-clipboard:copy="rewardString"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"></textarea>
      </form>
    </template>
  </dashboard-layout>
</template>

<script>
import dashboardLayout from '@/components/Layouts/dashboardLayout';
import sidebarNav from '@/components/sidebarNav.vue';
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      reward: '',
      rewardString: ''
    }
  },
  computed: {
    ...mapGetters([
      'verifiedAuctoNodeOwners'
    ])
  },
  components: {
    dashboardLayout,
    sidebarNav
  },
  methods: {
    ...mapActions(['getAuctoNodeOwners']),
    generateRewardSplits() {
      const reward = Number(this.reward)
      if (isNaN(reward)) {
          this.$toasted.error("Seems you've entered an invalid reward")
          return
      }
      if (this.auctoNodeOwnersCount !== 0) {
        const totalAuctonodeHoldings = this.verifiedAuctoNodeOwners.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.quantity
        }, 0);
        console.log(totalAuctonodeHoldings)
        const rewardSplitRatio = reward / totalAuctonodeHoldings
        const payouts = []
        this.verifiedAuctoNodeOwners.map(function preparePayout(owner){
          const payment = owner.quantity * rewardSplitRatio
          const paymentString = `${owner.address},${payment}`
          payouts.push(paymentString)
        })

        this.rewardString = payouts.join('\n');

      }
    },
    onCopy() {
      this.$toasted.success(
      "Copied successfully",{
      icon : {
          name: "fa-smile-wink"
      }
          }
      )
    },
    onError() {
      this.$toasted.show(
        "Could not copy",{
        icon : {
            name: "fa-smile-wink"
        }
            }
        )
    }
  },
  created () {
    !this.auctoNodeOwners && this.getAuctoNodeOwners();
  },
}
</script>

<style scoped>
  .payout-form {
    display: grid;
    justify-self: center;
    align-self: center;
    width: 60%;
    margin-top: 5rem;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-row-gap: 1em;
  }

  .payout-form input[type=text] {
    background-color: transparent;
    border: transparent;
    border-bottom: 1px solid rgb(148, 146, 145);
    color: #f2c4a5;
    padding: .4em 0;
    font-size: 0.9em;
    font-weight: normal;
  }
  .payout-form input[type=text]:focus {
    outline: transparent;
  }
  .payout-form input[type=text]::placeholder {
    color: #f2c4a5;
  }

  .payout-form textarea {
    background-color: #f2c4a5;
    border: 1px solid #f2c4a5;
    border-radius: 4px;
    padding: 0.5rem 0.6rem;
    font-size: 1.2rem;
    color: #b4353f;
    cursor: pointer;
  }
</style>