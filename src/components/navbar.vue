<template>
    <nav>
        <section class="brand">
            <h3><router-link to="/" class="brand__link">AuctoNode</router-link></h3>
        </section>
        <section class="search">
            <input type="text"  placeholder="Search AuctoNode Owners" class="search__box"/>
        </section>
        <section class="login" style="margin-right: -60px">
            <a :href="authUrlString" class="login__btn" v-if="!isLoggedIn">Login</a>
            <a href="" @click.prevent="logoutOwner" class="login__btn" v-if="isLoggedIn">Log Out</a>
        </section>
        <section class="login" style="margin-right: -60px">
            <router-link to="/dashboard" class="login__btn" v-if="isLoggedIn">Dashboard</router-link>
        </section>
        <section class="login">
            <a href="https://client.wavesplatform.com/dex?assetId1=WAVES&assetId2=53VHGAEfVNJnByeMbu9r4DsxXoBz3TecQfWpYXAsZmzh" target="_blank" class="login__btn"><i class="fas fa-coins"></i> Buy Auct Token</a>
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
                    <a href="https://client.wavesplatform.com/dex?assetId1=WAVES&assetId2=53VHGAEfVNJnByeMbu9r4DsxXoBz3TecQfWpYXAsZmzh" target="_blank" class="mobile__btn"><i class="fas fa-coins"></i> Buy Auct Token</a>
                </li>
                <li class="mobile-nav-item">
                    <a :href="authUrlString" class="mobile__btn" v-if="!isLoggedIn"><i class="fas fa-sign-in-alt"></i> Login</a>
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
    props: ['randomString'],
    data() {
        return {
            authUrlString: '',
            auth: {
                basicPath: 'https://client.wavesplatform.com#gateway/auth',
                referrer: '?r=https://auctonode.herokuapp.com',
                name: '&n=AuctoNode',
                iconPath: '&i=https://wavesmania.net/images/aucttoken.png',
                debug: '&debug=true'

            }
        }
    },
    computed: mapState(['isLoggedIn']),
    methods: {
        ...mapActions(['logout']),
        generateRandom() {
            this.auth.data = '&d=' + this.randomString;
            this.authUrlString = `${this.auth.basicPath}${this.auth.referrer}${this.auth.name}${this.auth.data}${this.auth.iconPath}${this.auth.debug}`
        },
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
    },
    created() {
        this.generateRandom();
        // console.log(this.randomString);
    }
}
</script>
<style lang="scss" scoped>
::placeholder {
    color: lighten(#E27B36, 25%);
}
nav {
    font-family: 'Share Tech', sans-serif;
    $primary-color: #E21250;
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
        color: lighten(#E27B36, 25%);
        text-decoration: none;
    }

    .search__box {
        padding: 1rem 2rem;
        border: 1px solid $secondary-color;
        background: $secondary-color;
        border-radius: 5rem;
        width: 400px;
        color: lighten(#E27B36, 25%);

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
            background-color: lighten(#E27B36, 25%);
            left: 0;
            right: 0;
            width: 100%;
            z-index: 100;
        }
    }

</style>
