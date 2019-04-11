<template>
    <dashboard-layout>
        <template slot="sidebar">
            <sidebar-nav :isActive="2" />
        </template>
        <template slot="content">
            <section class="votes-section">
                <section>
                    <details>
                        <summary>Past Votes</summary>
                        <section class="votes">
                            <section class="votes__card">
                                <section>
                                    <p class="address"><a :href="'https://wavesexplorer.com/address/'" target="_blank">Increase charges on Auctionlance to {{ 8 | currency('$')}}</a></p>
                                    <p class="quantity"></p>

                                    <section class="mobile-auctonode__footer">
                                    <p class="duration">Ending 5 minutes</p>
                                    <p class="">Vote with:</p>
                                    <p class="voting-section">
                                        <a :href="paymentPathForWCT" class="mobile-vote">{{ amountToPay  | currency(' ')}} WCT</a>
                                        <a :href="paymentPathForAuct" class="mobile-vote">{{ amountToPay  | currency(' ')}} Auct Token</a>
                                    </p>
                                    </section>
                                </section>
                            </section>
                            <section class="votes__card">
                                <section>
                                    <p class="address"><a :href="'https://wavesexplorer.com/address/'" target="_blank">Increase charges on Auctionlance to {{ 8 | currency('$')}}</a></p>
                                    <p class="quantity"></p>

                                    <section class="mobile-auctonode__footer">
                                    <p class="duration">Ending 5 minutes</p>
                                    <p class="">Vote with:</p>
                                    <p class="voting-section">
                                        <a :href="paymentPathForWCT" class="mobile-vote">{{ amountToPay  | currency(' ')}} WCT</a>
                                        <a :href="paymentPathForAuct" class="mobile-vote">{{ amountToPay  | currency(' ')}} Auct Token</a>
                                    </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </details>
                </section>
                <section>
                    <details open>
                        <summary>Active Votes</summary>
                        <section class="votes">
                            <section class="votes__card">
                                <section>
                                    <p class="address"><a :href="'https://wavesexplorer.com/address/'" target="_blank">Increase charges on Auctionlance to {{ 8 | currency('$')}}</a></p>
                                    <p class="quantity"></p>

                                    <section class="mobile-auctonode__footer">
                                    <p class="duration">Ending 5 minutes</p>
                                    <p class="">Vote with:</p>
                                    <p class="voting-section">
                                        <a :href="paymentPathForWCT" class="mobile-vote">{{ amountToPay  | currency(' ')}} WCT</a>
                                        <a :href="paymentPathForAuct" class="mobile-vote">{{ amountToPay  | currency(' ')}} Auct Token</a>
                                    </p>
                                    </section>
                                </section>
                            </section>
                            <section class="votes__card">
                                <section>
                                    <p class="address"><a :href="'https://wavesexplorer.com/address/'" target="_blank">Increase charges on Auctionlance to {{ 8 | currency('$')}}</a></p>
                                    <p class="quantity"></p>

                                    <section class="mobile-auctonode__footer">
                                    <p class="duration">Ending 5 minutes</p>
                                    <p class="">Vote with:</p>
                                    <p class="voting-section">
                                        <a :href="paymentPathForWCT" class="mobile-vote">{{ amountToPay  | currency(' ')}} WCT</a>
                                        <a :href="paymentPathForAuct" class="mobile-vote">{{ amountToPay  | currency(' ')}} Auct Token</a>
                                    </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </details>
                </section>
            </section>
        </template>
    </dashboard-layout>
</template>
<script>
import { mapState } from 'vuex';
import sidebarNav from '@/components/sidebarNav';
import dashboardLayout from '@/components/Layouts/dashboardLayout';
export default {
    name: 'Vote',
    data() {
    return {
        waves: '',
        wavesBalance: 0,
        paymentPathForAuct: '',
        paymentPathForWCT: '',
        amountToPay: 0.1
    }
    },
    computed: mapState(['userAddress', 'auctAssetId', 'wctAssetId', 'auctAddress']),
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
    buildPaymentPath() {
        this.paymentPathForAuct = `https://client.wavesplatform.com/#send/${this.auctAssetId}?recipient=${this.auctAddress}&amount=${this.amountToPay}&referrer=https://auctonode.herokuapp.com/${this.userAddress}/can-vote&strict`
        this.paymentPathForWCT = `https://client.wavesplatform.com/#send/${this.wctAssetId}?recipient=${this.auctAddress}&amount=${this.amountToPay}&strict`
    }
    },
    created() {
        this.buildPaymentPath();
    }
}
</script>
<style lang="scss" scoped>
    $primary-color: #E21250;
    $secondary-color: darken($primary-color, 10%);

    .votes-section {
        align-self: center;
        margin-top: 5vh;
        transition: all 500ms;
        details {
            margin-bottom: 5rem;

        }

        summary {
            list-style-image: url('../assets/img/down.svg');
            // font-weight: 600;
            font-size: 24px;
            color: lighten(#E27B36, 25%);
            cursor: pointer;

            &:focus {
                outline: none;
            }
        }

        .votes {
            max-height: 200px;
            margin: 2rem auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            flex-wrap: wrap;
            .votes__card {
                transition: all 500ms;
                border-radius: 8px;
                border: none;
                background-image: linear-gradient(-135deg,$primary-color,$secondary-color);
                -webkit-box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
                -moz-box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
                box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
                padding: 1.5rem 1rem;
                margin-bottom: 2rem;
                margin-right: 2rem;
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
                flex-shrink: 2;
                margin-right: 1rem;
                }
            }
        }

        .voting-section {
            display: flex;
            justify-content: space-evenly
        }

    }
</style>


