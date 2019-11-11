<template>
    <div> 
      <b-button variant="success" href="/admins/home">Home</b-button>
        <b-button @click="$router.push('/order_products/create')" variant="info">Create</b-button>
        <input type="search" placeholder="Search start.." v-model="search">
        <b-button @click="handleSearch" variant="info">Search</b-button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Order_id</th>
                    <th>Product_id</th>
                    <th>Quantity</th>
                    <th>Order_price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order_product , index) in order_products" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{order_product.name}}</td>
                    <td>{{order_product.orderId}}</td>
                    <td>{{order_product.productId}}</td>
                    <td>{{order_product.quantity}}</td>
                    <td>{{order_product.order_price}}</td>
                    <td>
                        <b-button @click="$router.push('/order_products/detail/'+order_product.id)">Detail</b-button>
                        <b-button @click="$router.push('/order_products/edit/'+order_product.id)" variant="success">Edit</b-button>
                        <b-button @click="handleDelete(order_product.id)" variant="danger">Delete</b-button>
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
    this.getOrderProducts();
  },
  data: function() {
    return {
      order_products: {
        index: "",
        name: "",
        order_id: "",
        product_id: "",
        quantity: "",
        order_price: ""
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
    getOrderProducts: function() {
      let self = this;
      this.$axios
        .get(
          "/order_products?search=" +
            this.search +
            "&currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage
        )
        .then(function(res) {
          console.log(res);
          self.order_products = res.data.data;
          self.pagination = res.data.pagination;
        });
    },
    handleDelete: function(id) {
      let self = this;
      this.$axios.delete("/order_products/" + id).then(function(res) {
        console.log(res);
        self.getOrderProducts();
      });
    },
    handleSearch: function() {
      this.getOrderProducts();
    },
    handleChangePage: function(page) {
      this.pagination.currentPage = page;
      this.getOrderProducts();
    }
  }
};
</script>