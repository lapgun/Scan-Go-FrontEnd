<template>
    <div>
        <input type="string" v-model="form.name" placeholder="Name ..">
        <input type="password"  v-model="form.email" placeholder="Password...">
        <input type="email" v-model="form.email" placeholder="Email ..">
        <input type="checkbox" v-model="form.role" value="1">
        <b-button @click="handleCreate" variant="info">Update</b-button>
    </div>
</template>
<script>
export default {
    mounted : function(){
        this.getAdmins()
    },
    data : function(){
        return {
            form : {
                name: '',
                password : '',
                role:'',
                email:''
            }
        }
    },
    methods: {
        getAdmins : function(){
            let self = this
            this.$axios.get('/admins/'+this.$route.params.id)
            .then(function(res){
                console.log(res)
                self.form = res.data
            })
        },
        handleCreate: function(){
            let self = this
            this.$axios.put('/admins/'+this.form.id, this.form)
            .then(function(res){
                console.log(res)
                self.$router.push('/admins')
            })
        }
    }
}
</script>