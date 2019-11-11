<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>STT</th>
          <th>Order_id</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{order_details.id}}</td>
          <td>{{order_details.orderId}}</td>
          <td>{{order_details.price}}</td>
        </tr>
      </tbody>
    </table >
    <b-button variant="info" @click="$router.push('/order_details')">Oder_details</b-button>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.getOrder_details();
  },
  data: function() {
    return {
      order_details: {
        id: "",
        orderId: "",
        price: ""
      }
    };
  },
  methods: {
    getOrder_details: function() {
      let self = this;
      this.$axios
        .get("/order_details/" + this.$route.params.id)
        .then(function(res) {
          console.log(res);
          self.order_details = res.data;
        });
    }
  }
};
</script>
