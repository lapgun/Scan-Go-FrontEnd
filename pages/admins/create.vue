<template>
    <div>
        <input type="string"  v-model="form.name" placeholder="Name...">
        <input type="password" v-model="form.password" placeholder="Password...">
        <input type="email" v-model="form.email" placeholder="Email...">
        <input type="checkbox" v-model="form.role" value="1"> Do you must be an admin ?
        <b-button @click="handleCreate" variant="info">Create</b-button>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            form : {
                name :'',
                password : '',
                email:'',
                role:false
            }
        }
    },
    methods : {
        handleCreate: function(){
            let self = this
            this.$axios.post('/admins', this.form)
            .then(function(res){
                console.log(res)
                self.$router.push('/admins')
            })
        }
    }
}
</script>