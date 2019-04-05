<template>
    <section class="dashboard">
        <slot name="sidebar"></slot>
        <slot name="content"></slot>
    </section>
</template>
<script>
export default {
    name: 'dashboardLayout'
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
    flex-direction: column;
    align-items:flex-end;
}

</style>
