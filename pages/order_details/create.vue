<template>
    <div>
        <input type="integer"  v-model="form.orderId" placeholder="Order_id...">
        <input type="integer" v-model="form.price" placeholder="Price...">
        <b-button @click="handleCreate" variant="info">Create</b-button>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            form : {
                orderId :'',
                price : '',
            }
        }
    },
    methods : {
        handleCreate: function(){
            let self = this
            this.$axios.post('/order_details', this.form)
            .then(function(res){
                console.log(res)
                self.$router.push('/order_details')
            })
        }
    }
}
</script>