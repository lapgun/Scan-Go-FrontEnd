<template>
  <div>
    <input type="text" v-model="form.customerId" placeholder="Customer_id..." />
    <input type="integer" v-model="form.order_status" placeholder="Order_status..." />
    <input type="integer" v-model="form.total_price" placeholder="Total_price..." />
    <b-button @click="handleCreate" variant="info">Create</b-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      form: {
        customerId: "",
        order_status: "",
        total_price: ""
      }
    };
  },
  methods: {
    handleCreate: function() {
      let self = this;
      this.$axios.post("/orders", this.form).then(function(res) {
        console.log(res);
        self.$router.push("/orders");
      });
    }
  }
};
</script>