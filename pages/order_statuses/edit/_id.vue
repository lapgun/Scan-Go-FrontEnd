<template>
    <div>
        <input type="integer" v-model="form.name" placeholder="Name ..">
        <input type="integer"  v-model="form.orderId" placeholder="Order_id...">
        <input type="integer" v-model="form.note" placeholder="Note...">
        <b-button @click="handleCreate" variant="info">Update</b-button>
    </div>
</template>
<script>
export default {
    mounted : function(){
        this.getOrder_products()
    },
    data : function(){
        return {
            form : {
                name:'',
                orderId: '',
                note : '',
            }
        }
    },
    methods: {
        getOrder_products : function(){
            let self = this
            this.$axios.get('/order_statuses/'+this.$route.params.id)
            .then(function(res){
                console.log(res)
                self.form = res.data
            })
        },
        handleCreate: function(){
            let self = this
            this.$axios.put('/order_statuses/'+this.form.id, this.form)
            .then(function(res){
                console.log(res)
                self.$router.push('/order_statuses')
            })
        }
    }
}
</script>