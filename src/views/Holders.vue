<template>
  <div>
    <h1>{{ auctTokenHolders.length | number('0,0') }} Holders of Auct Token</h1>
    <ul>
      <li v-for="holder in auctTokenHolders" :key="holder.address">
        {{ holder.address }} -
        <strong>{{ holder.quantity | currency(' ') }} Auct Token</strong>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["auctTokenHolders"])
  },
  methods: {
    ...mapActions(["getAuctoNodeOwners"])
  },
  mounted() {
    this.getAuctoNodeOwners();
  }
};
</script>

<style scoped>
div {
  padding: 3em 2em;
  background-color: #e21250;
  color: #fff;
}
h1 {
  text-align: center;
  margin-bottom: 2em;
}
ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 0.5em;
  font-size: 1.5em;
}
</style>