<template>
  <div>
    <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#sidebar-collapse"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">
            <span>Scan & Go</span>Admin
          </a>
          <li>
            <ul class="nav menu" style="color:#30a5ff">
              <li class="active">
                <a @click="$router.push('/user/home')">Home</a>
              </li>
              <li>
                <a @click="$router.push('/user/detail/'+user_id)">Profile</a>
              </li>
              <li>
                <a @click="$router.push('/register')">Register</a>
              </li>
              <li>
                <a @click="handleLogout">Logout</a>
              </li>
            </ul>
          </li>
        </div>
      </div>
      <!-- /.container-fluid -->
    </nav>
    <div>
      <div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar" style="margin-top:-30px">
        <div class="profile-sidebar">
          <div class="profile-userpic">
            <img src="http://placehold.it/50/30a5ff/fff" class="img-responsive" alt />
          </div>
          <div class="profile-usertitle">
            <div class="profile-usertitle-name">Admin</div>
            <div class="profile-usertitle-status">
              <span class="indicator label-success"></span>Online
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="divider"></div>

        <div class="form-group">
          <input type="text" v-model="search" class="form-control" placeholder="Search" />
        </div>

        <ul class="nav menu" style="display:block">
          <li>
            <a @click="$router.push('/user/home')">Home</a>
          </li>
          <li>
            <a @click="$router.push('/categories')">Categories</a>
          </li>
          <li>
            <a @click="$router.push('/products')">Products</a>
          </li>
          <li class="active">
            <a @click="$router.push('/orders')">Orders</a>
          </li>
          <li>
            <a @click="$router.push('/slide')">Slide</a>
          </li>
          <li>
            <a @click="$router.push('/comment')">Comment</a>
          </li>
          <li>
            <a @click="$router.push('/user')">Users</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-9 col-lg-10 sidebar">
        <h1>Order</h1>
        <br />
        <div>
          <h4>Order theo ngày</h4>
          <b-form-input style="width:200px" v-model="date" @change="getByDay" type="date"></b-form-input>
          <h4 v-if="total">Đơn hàng theo ngày</h4>
          <table v-if="total" class="table table-bordered">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Order Status</th>
                <th>Total Price</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order , index) in days" :key="index">
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
          <h3 style="margin-bottom:50px" v-if="total">Tổng số tiền : {{currency(total)}}</h3>
        </div>
        <div>
          <h4>Order theo tháng</h4>
          <b-form-input style="width:250px" v-model="month" @change="getByMonth" type="month"></b-form-input>
          <h4 v-if="money">Đơn hàng trong tháng</h4>
          <table v-if="money" class="table table-bordered">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Order Status</th>
                <th>Total Price</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order , index) in months" :key="index">
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
          <h3 style="margin-bottom:50px" v-if="money">Tổng số tiền : {{currency(money)}}</h3>
        </div>
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
export default {
  head: { title: "Order" },
  mounted: function() {
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
    this.getAdmins();
  },
  data: function() {
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
      user_id: "",
      users: [],
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
    getOrders: function() {
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
    handleSearch: function() {
      this.getOrders();
    },
    handleChangePage: function(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getOrders();
    },
    getAdmins: function() {
      let self = this;
      this.$axios.get("/users/decoded").then(function(res) {
          self.user_id = res.data.decoded.user_id;
      });
    },
    handelConfirm(id) {
      let self = this;
      this.$axios.put("/orders/confirm/" + id).then(function(res) {
        let order = self.orders.find(element => element.id == id);
        if (order) order.order_status = 1;
        socket.emit("update-status", { order: order.order_status, id: id });
      });
    },
    handleCancel: function(id) {
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
    handleLogout: function() {
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
