<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-9 col-lg-10 sidebar">
        <h1>Order</h1>
        <br />
        <h3>Order theo ngày</h3>
        <b-form-input
          style="margin-bottom:10px;margin-top:30px; width:30%"
          v-model="date"
          @change="getByDay"
          type="date"
        ></b-form-input>
        <table v-if="total" class="table table-bordered">
          <thead>
            <tr>
              <th>STT//ID</th>
              <th>Customer</th>
              <th>Order Status</th>
              <th>Total Price</th>
              <th>CreatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order , index) in days" :key="index">
              <td>{{index+1}}//{{order.id}}</td>
              <td>{{order.user ? order.user.name : ""}}</td>
              <td v-if="order.order_status == 0">Đang chờ xử lí</td>
              <td v-if="order.order_status == 1">Đã thanh toán</td>
              <td v-if="order.order_status == 2">Đã hủy đơn hàng</td>
              <td>{{currency(order.total_price)}}</td>
              <td>{{formatDate(order.createdAt)}}</td>
              <td>
                <b-button variant="success" @click="handelConfirm(order.id)">Confirm</b-button>
                <b-button @click="$router.push('/orders/detail/'+ order.id)">Detail</b-button>
                <b-button @click="handleCancel(order.id)" variant="danger">Cancel</b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <h3 style="margin-bottom:30px;" v-if="total">Tổng số tiền : {{currency(total)}}</h3>
        <h4 style="margin-top:-10px" v-else>Không có order nào.</h4>
        <h3>Order theo tháng</h3>
        <b-form-input style="width:30%" v-model="month" @change="getByMonth" type="month"></b-form-input>
        <table v-if="money" class="table table-bordered">
          <thead>
            <tr>
              <th>STT//ID</th>
              <th>Customer</th>
              <th>Order Status</th>
              <th>Total Price</th>
              <th>CreatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order , index) in months" :key="index">
              <td>{{index+1}}//{{order.id}}</td>
              <td>{{order.user ? order.user.name : ""}}</td>
              <td v-if="order.order_status == 0">Đang chờ xử lí</td>
              <td v-if="order.order_status == 1">Đã thanh toán</td>
              <td v-if="order.order_status == 2">Đã hủy đơn hàng</td>
              <td>{{currency(order.total_price)}}</td>
              <td>{{formatDate(order.createdAt)}}</td>
              <td>
                <b-button variant="success" @click="handelConfirm(order.id)">Confirm</b-button>
                <b-button @click="$router.push('/orders/detail/'+ order.id)">Detail</b-button>
                <b-button @click="handleCancel(order.id)" variant="danger">Cancel</b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <h3 style="margin-bottom:30px;" v-if="money">Tổng số tiền : {{currency(money)}}</h3>
        <h4 v-else>Không có order nào.</h4>
        <div style="margin-top:50px; margin-bottom:30px">
          <h4 style="display:inline">Orders</h4>
          <label>
            <b-form-select v-model="order_status" :options="options" @change="getOrders"></b-form-select>
          </label>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>STT//ID</th>
              <th>Customer</th>
              <th>Order Status</th>
              <th>Total Price</th>
              <th>CreatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order , index) in orders" :key="index">
              <td>{{index+1}}//{{order.id}}</td>
              <td>{{order.user ? order.user.name : ""}}</td>
              <td v-if="order.order_status == 0">Đang chờ xử lí</td>
              <td v-if="order.order_status == 1">Đã thanh toán</td>
              <td v-if="order.order_status == 2">Đã hủy đơn hàng</td>
              <td>{{currency(order.total_price)}}</td>
              <td>{{formatDate(order.createdAt)}}</td>
              <td>
                <b-button variant="success" @click="handelConfirm(order.id)">Confirm</b-button>
                <b-button @click="$router.push('/orders/detail/'+ order.id)">Detail</b-button>
                <b-button @click="handleCancel(order.id)" variant="danger">Cancel</b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <b-pagination
          v-model="pagination.currentPage"
          :total-rows="pagination.total"
          :per-page="pagination.perPage"
          aria-controls="my-table"
          @change="handleChangePage"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  components: {
    adminNav,
    admin
  },
  head: { title: "Order" },
  mounted() {
    let self = this;
    socket.on("success-status", function(data) {
      let orderNew = self.orders.find(element => element.id == data.id);
      if (orderNew) orderNew.order_status = data.order;
    });
    socket.on("success-cancel", function(data) {
      let orderNew = self.orders.find(element => element.id == data.id);
      if (orderNew) orderNew.order_status = data.order;
    });
    socket.on("success-cancel-user-order", function(data) {
      let orderNew = self.orders.find(element => element.id == data.id);
      if (orderNew) orderNew.order_status = data.order;
    });
    this.getOrders();
  },
  data() {
    return {
      orders: [],
      month: "",
      total: 0,
      money: 0,
      days: [],
      date: "",
      months: [],
      search: "",
      totalResult: 0,
      pagination: {
        currentPage: 1,
        perPage: 10
      },
      order_status: "",
      options: [
        { value: "", text: "Order's status" },
        { value: 0, text: "Processing" },
        { value: 1, text: "Paid" },
        { value: 2, text: "Canceled" }
      ]
    };
  },
  methods: {
    getOrders() {
      let self = this;
      this.$axios
        .get(
          "/orders?search=" +
            this.search +
            "&currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage +
            "&order_status=" +
            this.order_status
        )
        .then(function(res) {
            self.orders = res.data.data;
          self.pagination = res.data.pagination;
        });
    },
    handleChangePage(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getOrders();
    },
    handelConfirm(id) {
      let self = this;
      this.$axios.put("/orders/confirm/" + id).then(function(res) {
        let order = self.orders.find(element => element.id == id);
        if (order) order.order_status = 1;
        socket.emit("update-status", { order: order.order_status, id: id });
      });
    },
    handleCancel(id) {
      let self = this;
      if (confirm("Are you sure?")) {
        this.$axios.put("/orders/cancel/" + id).then(function(res) {
          let order = self.orders.find(element => element.id == id);
          if (order) order.order_status = 2;
          socket.emit("cancel-order", { order: order.order_status, id: id });
        });
      }
    },
    getByDay() {
      let self = this;
      this.total = 0;
      this.$axios
        .get("/orders/get/by-day?date=" + this.date)
        .then(function(res) {
          self.days = res.data.data.rows;
          self.days.forEach(element => {
            self.total += parseInt(element.total_price);
          });
        });
    },
    getByMonth() {
      let self = this;
      this.money = 0;
      this.$axios
        .get("/orders/get/by-day?date=" + this.month)
        .then(function(res) {
          self.months = res.data.data.rows;
          self.months.forEach(element => {
            self.money += parseInt(element.total_price);
          });
        });
    },
    handleLogout() {
      Cookie.remove("token");
      this.$store.commit("setToken", null);
      this.$router.push("/login");
    },
    currency(x) {
      x = x.toLocaleString("currency", { style: "currency", currency: "VND" });
      return x;
    },
    formatDate(date) {
      let text = date + "";
      let test = text.split("T");
      let day = test[0].split("-");
      date = "Ngày " + day[2] + " tháng " + day[1] + " năm " + day[0];
      return date;
    }
  }
};
</script>
