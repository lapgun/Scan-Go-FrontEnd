<template>

    <!-- <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Order_id</th>
                    <th>Product_id</th>
                    <th>Quantity</th>
                    <th>Product_price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{order_products.id}}</td>
                     <td>{{order_products.name}}</td>
                    <td>{{order_products.orderId}}</td>
                    <td>{{order_products.productId}}</td>
                    <td>{{order_products.quantity }}</td>
                    <td>{{order_products.order_price}}</td>
                </tr>
            </tbody>
        </table>
        <b-button variant="info" @click="$router.push('/order_products')">Oder_products</b-button>
    </div> -->
  <div>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Order_id</th>
          <th>Product_id</th>
          <th>Quantity</th>
          <th>Product_price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{order_products.id}}</td>
          <td>{{order_products.name}}</td>
          <td>{{order_products.orderId}}</td>
          <td>{{order_products.productId}}</td>
          <td>{{order_products.quantity }}</td>
          <td>{{order_products.order_price}}</td>
        </tr>
      </tbody>
    </table>
    <b-button variant="info" @click="$router.push('/order_products')">Oder_products</b-button>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.getOrder_products();
  },
  data: function() {
    return {
      order_products: {
        id: "",
        name: "",
        orderId: "",
        productId: "",
        quantity: "",
        order_price: ""
      }
    };
  },
  methods: {
    getOrder_products: function() {
      let self = this;
      this.$axios
        .get("/order_products/" + this.$route.params.id)
        .then(function(res) {
          console.log(res);
          self.order_products = res.data;
        });
    }
  }
};
</script>