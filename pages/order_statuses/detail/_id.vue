<template>
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Order_id</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{order_statuses.id}}</td>
                    <td>{{order_statuses.name}}</td>
                    <td>{{order_statuses.orderId}}</td>
                    <td>{{order_statuses.note }}</td>
                </tr>
            </tbody>
        </table>
        <b-button variant="info" @click="$router.push('/order_statuses')">Oder_products</b-button>
    </div>
</template>
<script>
export default {
  mounted: function() {
    this.getOrder_statuses();
  },
  data: function() {
    return {
      order_statuses: {
        id: "",
        orderId: "",
        name: "",
        note: ""
      }
    };
  },
  methods: {
    getOrder_statuses: function() {
      let self = this;
      this.$axios
        .get("/order_statuses/" + this.$route.params.id)
        .then(function(res) {
          console.log(res);
          self.order_statuses = res.data;
        });
    }
  }
};
</script>