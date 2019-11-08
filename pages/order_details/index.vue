<template>
    <div>
        <b-button @click="$router.push('/order_details/create')" variant="info">Create</b-button>
        <input type="search" placeholder="Search start.." v-model="search">
        <b-button @click="handleSearch" variant="info">Search</b-button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Order_id</th>
                    <th>Price</th>
                    <th>Action</th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order_detail , index) in order_details" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{order_detail.orderId}}</td>
                    <td>{{order_detail.price}}</td>
                    <td>
                        <b-button @click="$router.push('/order_details/detail/'+order_detail.id)">Detail</b-button>
                        <b-button @click="$router.push('/order_details/edit/'+order_detail.id)" variant="success">Edit</b-button>
                        <b-button @click="handleDelete(order_detail.id)" variant="danger">Delete</b-button>
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
        this.getOrder_details()
    },
    data : function(){
        return {
            order_details : {
                 index : '',
                 orderId :'',
                 price: '',
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
        getOrder_details : function(){
            let self = this
            this.$axios.get('/order_details?search='+this.search+'&currentPage='+this.pagination.currentPage+'&perPage='+this.pagination.perPage)
            .then(function(res){
                console.log(res)
                self.order_details = res.data.data
                self.pagination = res.data.pagination
            })
        },
         handleDelete: function(id){
            let self = this
            this.$axios.delete('/order_details/'+id)
            .then(function(res){
                console.log(res)
                self.getOrder_details()
            })
        },
        handleSearch : function(){
            this.getOrder_details()
        },
         handleChangePage: function(page){
            this.pagination.currentPage = page
            this.getOrder_details()
        }
    }
}
</script>