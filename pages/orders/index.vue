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
                <a @click="$router.push('/user/detail/'+user_id)">Admin</a>
              </li>
              <li>
                <a @click="$router.push('/user/edit/'+user_id)">Profile</a>
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
        <form role="search">
          <div class="form-group">
            <input
              type="text"
              @change="handleSearch"
              v-model="search"
              class="form-control"
              placeholder="Search"
            />
          </div>
        </form>
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
            <a @click="$router.push('/user')">Users</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-9 col-lg-10 sidebar">
        <b-button @click="$router.push('/orders/create')" variant="info">Create</b-button>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Customer_id</th>
              <th>Order_status</th>
              <th>Total_price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order , index) in orders" :key="index">
              <td>{{index+1}}</td>
              <td>{{order.customerId}}</td>
              <td>{{order.order_status}}</td>
              <td>{{order.total_price}}</td>
              <td>
                <b-button @click="$router.push('/orders/detail/'+order.id)">Detail</b-button>
                <b-button @click="handleDelete(order.id)" variant="danger">Delete</b-button>
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
  mounted: function() {
    this.getOrders();
    this.getAdmins();
  },
  data: function() {
    return {
      orders: {
        index: "",
        customerId: "",
        order_status: "",
        total_price: ""
      },
      search: "",
      totalResult: 0,
      pagination: {
        currentPage: 1,
        perPage: 10
      },
      user_id: "",
      users: []
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
            this.pagination.perPage
        )
        .then(function(res) {
          console.log(res);
          self.orders = res.data.data;
          self.pagination = res.data.pagination;
        });
    },
    handleDelete: function(id) {
      let self = this;
      this.$axios.delete("/orders/" + id).then(function(res) {
        console.log(res);
        self.getOrders();
      });
    },
    handleSearch: function() {
      this.getOrders();
    },
    handleChangePage: function(page) {
      this.pagination.currentPage = page;
      this.getOrders();
    },
    getAdmins: function() {
      let self = this;
      this.$axios.get("/users").then(function(res) {
        console.log(res);
        self.user_id = res.data.decoded.user_id;
        self.users = res.data.data;
      });
    },
    handleLogout: function() {
      Cookie.remove("token");
      this.$store.commit("setToken", null);
      this.$router.push("/login");
    }
  }
};
</script>
