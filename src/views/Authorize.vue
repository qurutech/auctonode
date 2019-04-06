<template>
    <section class="authorize-body">
        <form action="POST" @submit.prevent="authorize">
            <input type="password" placeholder="Enter authorization code" v-model="userInput"/>
            <button type="submit">Continue</button>
        </form>
    </section>
</template>
<script>
export default {
    name: 'Authorize',
    data() {
        return {
            userInput: '',
            code: 'zlatan'
        }
    },
    methods: {
        authorize() {
            if (this.userInput === this.code) {
                localStorage.setItem('authorize', JSON.stringify(true))
                this.$router.push('/');
                this.$toasted.error(
                "Access granted",{
                icon : {
                    name: "fa-exclamation-circle"
                }
                }
                );
            } else {
                this.$toasted.error(
                "Only AuctoNode Owners with access code can login at this moment",{
                icon : {
                    name: "fa-exclamation-circle"
                }
                }
                );
            }
        }
    },
    created() {
        this.$toasted.error(
                "Only AuctoNode Owners with access code can access this DApp",{
                icon : {
                    name: "fa-exclamation-circle"
                }
                }
                );
    }
}
</script>
<style lang="scss" scoped>
    section.authorize-body {
        display: flex;
        height: 50vh;
        align-items: center;
        justify-content: center;
    }
</style>

