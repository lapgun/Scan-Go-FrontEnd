<template>
    <div>
        <input type="integer" v-model="form.orderId" placeholder="Order_id ..">
        <input type="integer"  v-model="form.price" placeholder="Price...">
        <b-button @click="handleCreate" variant="info">Update</b-button>
    </div>
</template>
<script>
export default {
    mounted : function(){
        this.getOrder_details()
    },
    data : function(){
        return {
            form : {
                orderId: '',
                price : '',
            }
        }
    },
    methods: {
        getOrder_details : function(){
            let self = this
            this.$axios.get('/order_details/'+this.$route.params.id)
            .then(function(res){
                console.log(res)
                self.form = res.data
            })
        },
        handleCreate: function(){
            let self = this
            this.$axios.put('/order_details/'+this.form.id, this.form)
            .then(function(res){
                console.log(res)
                self.$router.push('/order_details')
            })
        }
    }
}
</script>