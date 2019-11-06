<template>
  <div>
    <div>{{test.name}}</div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                test: {
                    name: '',
                    email: '',
                    address: ''
                }
            }
        },
        computed :{
            user() {
                this.test =  store.state.use;
                return this.test;
            }
        }

    }
</script>

<style>

</style>
