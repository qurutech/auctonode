<template>
    <nav>
        <section class="brand">
            <h3><router-link to="/" class="brand__link">AuctoNode</router-link></h3>
        </section>
        <section class="search">
            <input type="text"  placeholder="Search Candidates/Voters" class="search__box"/>
        </section>
        <section class="login" style="margin-right: -90px">
            <router-link to="" class="login__btn">Login</router-link>
        </section>
        <section class="login">
            <router-link to="" class="login__btn">Buy Auct Token</router-link>
        </section>
    </nav>
</template>
<script>
export default {
    name: 'AuctoNodeNavbar'
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
        color: darken(#fff, 50%);

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
}
</style>
