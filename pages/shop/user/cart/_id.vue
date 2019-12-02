<template>
  <div>
    <shopHeader/>
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <shopUser/>
        </div>
        <div class="col-sm-9" style="margin-bottom:100px">
          <div class="card">
            <div class="card-header text-md-center" style="font-size: 20px;font-weight: bold">Thông tin đơn hàng</div>
            <div class="card-body" style="font-style: italic">
              <div class="row">
                <div class="col-sm-12">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th style="text-align: center">STT</th>
                      <th style="text-align: center">Trạng thái đơn hàng</th>
                      <th style="text-align: center">Tổng tiền</th>
                      <th style="text-align: center">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(order,index) in orders" :key="index">
                      <td>{{index++}}</td>
                      <td v-if="order.order_status == 0">Đang chờ xử lí</td>
                      <td v-if="order.order_status == 1">Đã xử lí</td>
                      <td v-if="order.order_status == 2">Đã hủy đơn hàng</td>
                      <td>{{order.total_price}}</td>
                      <td><b-button variant="danger" @click="handelCancel(order.id)">Hủy đơn hàng</b-button></td>
                    </tr>
                    </tbody>
                  </table>
                  <b-button variant="dark" @click="$router.push('/')">back</b-button>
                </div>
              </div>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <shopFooter/>
  </div>
</template>
<script>
    import shopHeader from "~/components/shopHeader.vue";
    import shopFooter from "~/components/shopFooter.vue";
    import shopUser from "~/components/shopUser.vue";

    export default {
        components: {
            shopHeader,
            shopFooter,
            shopUser
        },
        mounted: function () {
            let self = this;
            socket.on("success-status", function (data) {
                let orderNew = self.orders.find(element => element.id == data.id);
                if (orderNew)
                    orderNew.order_status = data.order
            });
            socket.on("success-cancel", function (data) {
                let orderNew = self.orders.find(element => element.id == data.id);
                if (orderNew)
                    orderNew.order_status = data.order
            });
            socket.on("success-cancel-user-order", function (data) {
                let orderNew = self.orders.find(element => element.id == data.id);
                if (orderNew)
                    orderNew.order_status = data.order
            });

            this.getOrders();
        },
        data: function () {
            return {
                orders: []
            };
        },
        methods: {
            getOrders: function () {
                let self = this;
                this.$axios.get("/orders/customerId/" + this.$route.params.id).then(function (res) {
                    self.orders = res.data.rows
                });
            },
            handelCancel(id){
                let self = this;
                this.$axios.put("/orders/cancel/" + id).then(function (res) {
                    let order = self.orders.find(element => element.id == id);
                    if (order)
                        order.order_status = 2;
                    socket.emit("cancel-user-order", {order: order.order_status, id: id});
                })
            }
        }
    };
</script>
<style scoped>
  tbody {
    text-align: center;
  }
</style>
