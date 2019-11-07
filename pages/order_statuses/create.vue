<template>
  <div>
    <input type="integer" v-model="form.name" placeholder="Name..." />
    <input type="integer" v-model="form.orderId" placeholder="Order_id..." />
    <input type="integer" v-model="form.note" placeholder="Note..." />
    <b-button @click="handleCreate" variant="info">Create</b-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      form: {
        orderId: "",
        name: "",
        note: ""
      }
    };
  },
  methods: {
    handleCreate: function() {
      let self = this;
      this.$axios.post("/order_statuses", this.form).then(function(res) {
        console.log(res);
        self.$router.push("/order_statuses");
      });
    }
  }
};
</script>