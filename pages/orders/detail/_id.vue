<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Order_status</th>
          <th>Order_price</th>
          <th>Total_price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{orders.id}}</td>
          <td>{{order_products.name}}</td>
          <td>{{order_products.quantity}}</td>
          <td>{{orders.order_status}}</td>
          <td>{{order_products.order_price}}</td>
          <td>{{orders.total_price}}</td>
        </tr>
      </tbody>
    </table>
    <b-button variant="info" @click="$router.push('/orders')">Order</b-button>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.getOrders();
  },
  data: function() {
    return {
      orders: [],
      order_products: []
    };
  },
  methods: {
    getOrders: function() {
      let self = this;
      this.$axios.get("/orders/" + this.$route.params.id).then(function(res) {
        console.log(res);
        self.orders = res.data;
        self.order_products = res.data.order_products[0];
        console.log(self.order_products);
      });
    }
  }
};
</script>
