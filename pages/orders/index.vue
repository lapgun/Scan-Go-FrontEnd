<template>
    <div>
      <b-button variant="success" href="/admins/home">Home</b-button>
        <b-button @click="$router.push('/orders/create')" variant="info">Create</b-button>
        <input type="search" placeholder="Search start.." v-model="search">
        <b-button @click="handleSearch" variant="info">Search</b-button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Customer_id</th>
                    <th>Order_status</th>
                    <th>Total_price</th>
                    <th>Action</th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order , index) in orders" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{order.customerId}}</td>
                    <td>{{order.order_status}}</td>
                    <td>{{order.total_price}}</td>
                    <td>
                        <b-button @click="$router.push('/orders/detail/'+order.id)">Detail</b-button>
                        <b-button @click="$router.push('/orders/edit/'+order.id)" variant="success">Edit</b-button>
                        <b-button @click="handleDelete(order.id)" variant="danger">Delete</b-button>
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
  mounted: function() {
    this.getOrders();
  },
  data: function() {
    return {
      orders: {
        index: "",
        customerId: "",
        order_status: "",
        total_price: ""
      },
      search: "",
      totalResult: 0,
      pagination: {
        currentPage: 1,
        perPage: 10
      }
    };
  },
  methods: {
    getOrders: function() {
      let self = this;
      this.$axios
        .get(
          "/orders?search=" +
            this.search +
            "&currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage
        )
        .then(function(res) {
          console.log(res);
          self.orders = res.data.data;
          self.pagination = res.data.pagination;
        });
    },
    handleDelete: function(id) {
      let self = this;
      this.$axios.delete("/orders/" + id).then(function(res) {
        console.log(res);
        self.getOrders();
      });
    },
    handleSearch: function() {
      this.getOrders();
    },
    handleChangePage: function(page) {
      this.pagination.currentPage = page;
      this.getOrders();
    }
  }
};
</script>