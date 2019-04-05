<template>
    <dashboard-layout>
        <template slot="sidebar">
            <sidebar-nav :isActive="2" />
        </template>
        <template slot="content">
        <section class="loading">
            The Voting DApp is currently being worked upon. Thanks for your trust. <i class="fas fa-smile-beam"></i>
        </section>
        </template>
    </dashboard-layout>
</template>
<script>
import { mapState } from 'vuex'
import sidebarNav from '@/components/sidebarNav'
import dashboardLayout from '@/components/Layouts/dashboardLayout'
export default {
name: 'Vote',
data() {
return {
    waves: '',
    wavesBalance: 0,
}
},
computed: mapState(['userAddress']),
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
},
created() {
this.$toasted.error(
    "Auctionlance is currently working on this.",{
        icon : {
            name: "fa-smile-beam"
        }
    }).goAway(100000)
}
}
</script>
<style lang="scss" scoped>
$primary-color: #E21250;
$secondary-color: darken($primary-color, 10%);
.loading {
    position: relative;
    top: 1vh;
    background-color: lighten(#E27B36, 25%);
    padding: 1rem 2rem;
    color: $secondary-color;
    border-radius: 4px;
    margin-left: -133px;
    align-self: center;
    text-decoration: none;
    margin: 40vh auto;
    width: 20%;
    text-align: center;
    animation: bounce 900ms;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
    transform-origin: bottom;
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
</style>


