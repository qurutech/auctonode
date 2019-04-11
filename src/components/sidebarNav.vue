<template>
    <section class="sidebar">
    <nav class="sidebar__nav">
    <ul class="sidebar__nav-items">
        <li class="sidebar__nav-item"><router-link to="/dashboard" :class="{'active': isActive == 1}"><i class="fas fa-home"></i> Overview</router-link></li>
        <li class="sidebar__nav-item"><router-link :to="'vote/' + userAddress" :class="{'active': isActive == 2}"><i class="fas fa-thumbs-up"></i> Vote</router-link></li>
        <li class="sidebar__nav-item"><router-link to="/" ><i class="fas fa-igloo"></i> Go Back Home</router-link></li>
        <li class="sidebar__nav-item"><a href="" @click.prevent="logoutOwner"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
    </ul>
    </nav>
</section>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'sidebarNav',
    props: ['isActive'],
    computed: mapState(['userAddress']),
    methods: {
        ...mapActions(['logout']),
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
$primary-color: #E21250;
$secondary-color: darken($primary-color, 10%);
.sidebar {
position: fixed;
width: 15rem;
min-height: 100vh;
background-color: lighten(#E27B36, 25%);
left: 0;
-webkit-box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.75);
box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.75);
}

.sidebar__nav {
.sidebar__text {
background-color: lighten(#E27B36, 25%);
padding: 1rem;
color: $secondary-color;
}
.sidebar__nav-items {
list-style: none;
margin-top: 5rem;
padding: 0;

.sidebar__nav-item {
    cursor: pointer;
    a {
    padding: 1rem;
    transition: all 500ms cubic-bezier(0.280, 0.840, 0.420, 1);
    text-decoration: none;
    color: $primary-color;
    width: inherit;
    display: block;

    &:hover {
        border-left: 8px solid  $secondary-color;
        background-image: linear-gradient(-135deg,$primary-color,$secondary-color);
        color: lighten(#E27B36, 25%);
    }

    }

}

}
}

.active {
    border-left: 8px solid  $secondary-color;
    background-image: linear-gradient(-135deg,$primary-color,$secondary-color);
    color: lighten(#E27B36, 25%) !important;
}
</style>

