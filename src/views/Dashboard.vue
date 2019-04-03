<template>
  <section class="dashboard">
    <section class="loading">
      <h1 v-if="userAddress">Hey Welcome, {{ userAddress }}</h1>
      <p>AuctoNode Developers are working on this section <router-link class="link" to="/">Go back home</router-link></p>
    </section>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Dashboard',
  computed: mapState(['userAddress'])
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
  justify-content: center;
  align-items: center;
}
.loading {
  position: relative;
  background-color: lighten(#E27B36, 25%);
  padding: 1rem 2rem;
  color: $secondary-color;
  border-radius: 4px;
  width: 60%;
  text-align: center;
}

.link {
  color: $secondary-color;
}

</style>


