<template>
    <nav>
        <section class="brand">
            <h3><router-link to="/" class="brand__link">Dyznode</router-link></h3>
        </section>
        <section class="login" style="margin-right: -60px">
            <a href="https://waves.exchange/trading/spot/dACACFaoLaRMNGocg5aas4Md9aFP8jdAbLJvF5rqqrV_USDT" target="_blank" class="login__btn"><i class="fas fa-coins"></i> Trade Dyzrupt Token</a>
        </section>
        <section class="login" style="margin-right: -60px">
            <router-link to="/auctoboard" class="login__btn" v-if="isLoggedIn">Auctoboard</router-link>
        </section>
        <section class="login" v-if="!isLoggedIn">
            <a href="#" @click.prevent="performWavesKeeperLogin" class="login__btn">Download App</a>
        </section>
        <section class="mobile-nav">
            <ul class="mobile-nav-list">
                <li class="mobile-nav-item">
                    <router-link to="/" class="mobile__btn"><i class="fas fa-igloo"></i> Home </router-link>
                </li>
                <li  class="mobile-nav-item">
                    <router-link to="/dashboard" class="mobile__btn" v-if="isLoggedIn"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link>
                </li>
                <li  class="mobile-nav-item">
                    <a href="https://waves.exchange/trading/spot/dACACFaoLaRMNGocg5aas4Md9aFP8jdAbLJvF5rqqrV_USDT" target="_blank" class="mobile__btn"><i class="fas fa-coins"></i> Trade Dyzrupt Token</a>
                </li>
                <li class="mobile-nav-item">
                    <a href="#" @click.prevent="performWavesKeeperLogin" class="mobile__btn" v-if="!isLoggedIn"><i class="fas fa-sign-in-alt"></i> Download App</a>
                </li>

                <li class="mobile-nav-item">
                    <a href="" @click.prevent="logoutOwner" class="mobile__btn" v-if="isLoggedIn"><i class="fas fa-sign-out-alt"></i>  Log Out</a>
                </li>

            </ul>
        </section>
    </nav>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'AuctoNodeNavbar',
    computed: mapState(['isLoggedIn', 'auctAssetId']),
    methods: {
        ...mapActions(['logout', 'performWavesKeeperLogin']),
        logoutOwner() {
            this.logout()
            this.$toasted.show(
            "You've logged out from Auctonode",{
            icon : {
                name: "fa-smile-wink"
            }
                }
            )
        }
    }
}
</script>
<style lang="scss" scoped>
::placeholder {
    color: lighten(#EBC035, 0%);
}
nav {
    font-family: 'Share Tech', sans-serif;
    $primary-color: #372145;
    $secondary-color: darken($primary-color, 10%);
    display: flex;
    justify-content: space-evenly;
    align-items: baseline;
    padding: 1rem 3rem;
    background-color: $primary-color;
    margin-bottom: 0;
    -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
    @media screen and (max-width: 767px) {
        & {
            justify-content: space-between;
            align-items: center;
            padding: .5rem 1.5rem;
        }
    }
    a {
        color: lighten(#EBC035, 0%);
        text-decoration: none;
    }

    .search__box {
        padding: 1rem 2rem;
        border: 1px solid $secondary-color;
        background: $secondary-color;
        border-radius: 5rem;
        width: 400px;
        color: lighten(#EBC035, 0%);

        @media screen and (max-width: 767px) {
        & {
            width: 100%;
            padding: .5rem 1rem;
            box-sizing: border-box;
            margin-left: 1rem;
        }
    }
        &:focus {
            outline: none;
        }
    }

    .login__btn {
        padding: .5rem 2rem;
        border: 1px solid $secondary-color;
        background: $secondary-color;
        border-radius: 5rem;
        width: 500px;
        font-weight: 500;
        font-family: "Segoe UI" sans-serif;
    }

    .login {
    @media screen and (max-width: 767px) {
        & {
            display: none;
        }
    }
    }
}

    .mobile-nav {
        display: none;

        .mobile-nav-list {
            padding-right: 0;
            padding-left: 0;
            display: flex;
            list-style-type: none;
            justify-content: space-evenly;
            width: 100%;

            .mobile-nav-item {

                a {
                    color: black;
                }
            }
        }
    }

    @media screen and (max-width: 767px) {
        .mobile-nav {
            overflow: auto;
            display: flex;
            position: fixed;
            bottom: 0;
            background-color: lighten(#EBC035, 0%);
            left: 0;
            right: 0;
            width: 100%;
            z-index: 100;
        }
    }

</style>
