<template>
  <div>
    <input type="text" v-model="form.customerId" placeholder="Customer_id.." />
    <input type="integer" v-model="form.order_status" placeholder="Order_status.." />
    <input type="integer" v-model="form.total_price" placeholder="Total_price..." />
    <b-button @click="handleCreate" variant="info">Update</b-button>
  </div>
</template>
<script>
export default {
  head: { title: "Sửa slide"},
  mounted() {
    this.getOrders();
  },
  data() {
    return {
      form: {
        customerId: "",
        order_status: "",
        total_price: ""
      }
    };
  },
  methods: {
    getOrders() {
      let self = this;
      this.$axios.get("/orders/" + this.$route.params.id).then(function(res) {
        console.log(res);
        self.form = res.data;
      });
    },
    handleCreate() {
      this.$swal.fire('Yes...', 'Cập nhật thành công!', 'success')
      let self = this;
      this.$axios.put("/orders/" + this.form.id, this.form).then(function(res) {
        console.log(res);
        self.$router.push("/orders");
      });
    }
  }
};
</script>