<template>
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Customer_id</th>
                    <th>Order_status</th>
                    <th>Total_price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{orders.id}}</td>
                     <td>{{orders.customerId}}</td>
                    <td>{{orders.order_status}}</td>
                    <td>{{orders.total_price}}</td>
                </tr>
            </tbody>
        </table>
        <b-button variant="info" @click="$router.push('/orders')">Oder_products</b-button>
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
        id: "",
        customer: "",
        order_status: "",
        total_price: ""
      }
    };
  },
  methods: {
    getOrders: function() {
      let self = this;
      this.$axios.get("/orders/" + this.$route.params.id).then(function(res) {
        console.log(res);
        self.orders = res.data;
      });
    }
  }
};
</script>