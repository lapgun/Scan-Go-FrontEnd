<template>
    <div>
        <b-button @click="$router.push('/admins/create')" variant="info">Create</b-button>
        <input type="search" placeholder="Search start.." v-model="search">
        <b-button @click="handleSearch" variant="info">Search</b-button>
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(admin , index) in admins" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{admin.name}}</td>
                    <td>{{admin.email}}</td>
                    <td>{{admin.password}}</td>
                    <td>{{admin.role == '1' ? 'admin' : 'user'}}</td>
                    <td>
                        <b-button @click="$router.push('/admins/detail/'+admin.id)">Detail</b-button>
                        <b-button @click="$router.push('/admins/edit/'+admin.id)" variant="success">Edit</b-button>
                        <b-button @click="handleDelete(admin.id)" variant="danger">Delete</b-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <b-pagination
            v-model="pagination.currentPage"
            :total-rows="pagination.total"
            :per-page="pagination.perPage"
            aria-controls="my-table"
            @change="handleChangePage"
        ></b-pagination>
    </div>
</template>
<script>
export default {
    mounted : function(){
        this.getAdmins()
    },
    data : function(){
        return {
            admins : {
                 index : '',
                 name :'',
                 email: '',
                 password:'',
                 role:false
            },
            search :'',
            totalResult : 0,
            pagination: {
                currentPage : 1,
                perPage: 10,
            }
        }
    },
    methods : {
        getAdmins : function(){
            let self = this
            this.$axios.get('/admins?search='+this.search+'&currentPage='+this.pagination.currentPage+'&perPage='+this.pagination.perPage)
            .then(function(res){
                console.log(res)
                self.admins = res.data.data
                self.pagination = res.data.pagination
            })
        },
         handleDelete: function(id){
            let self = this
            this.$axios.delete('/admins/'+id)
            .then(function(res){
                console.log(res)
                self.getAdmins()
            })
        },
        handleSearch : function(){
            this.getAdmins()
        },
         handleChangePage: function(page){
            this.pagination.currentPage = page
            this.getAdmins()
        }
    }
}
</script>