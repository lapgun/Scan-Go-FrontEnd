<template>
  <div>
    <input type="text" v-model="form.name" placeholder="Name..." />
    <input type="integer" v-model="form.orderId" placeholder="Order_id..." />
    <input type="integer" v-model="form.productId" placeholder="Product_id..." />
    <input type="integer" v-model="form.quantity" placeholder="Quantity..." />
    <input type="integer" v-model="form.order_price" placeholder="Order_price..." />
    <b-button @click="handleCreate" variant="info">Create</b-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      form: {
        name: "",
        orderId: "",
        productId: "",
        quantity: "",
        order_price: ""
      }
    };
  },
  methods: {
    handleCreate: function() {
      let self = this;
      this.$axios.post("/order_products", this.form).then(function(res) {
        console.log(res);
        self.$router.push("/order_products");
      });
    }
  }
};
</script>