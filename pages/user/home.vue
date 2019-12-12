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
          <input type="text" class="form-control" placeholder="Search" />
        </div>
      </form>
      <ul class="nav menu" style="display:block">
        <li class="active">
          <a @click="$router.push('/user/home')">Home</a>
        </li>
        <li>
          <a @click="$router.push('/categories')">Categories</a>
        </li>
        <li>
          <a @click="$router.push('/products')">Products</a>
        </li>
        <li>
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
    <div style class="col-sm-9 col-lg-10 sidebar">
      <h1 style="margin-bottom:50px">Xin chào : {{user_name}}</h1>
      <line-chart :data="arr"></line-chart>
      <b-form-input v-model="date" @change="getByDay" type="date"></b-form-input>
      {{month}}
      <b-form-input v-model="month" @change="getByMonth" type="month"></b-form-input>
      <b-table striped hover :items="days"></b-table>
      <b-table striped hover :items="arr"></b-table>
    </div>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  head: { title: "Home" },
  mounted() {
    this.getDecoded();
  },
  data() {
    return {
      user_id: "",
      role: "",
      user_name: "",
      month: "",
      days: [],
      date: "",
      months: [],
      chatData: [],
      arr: []
    };
  },
  methods: {
    getDecoded() {
      let self = this;
      this.$axios.get("/users/decoded").then(function(res) {
        self.user_id = res.data.decoded.user_id;
        self.user_name = res.data.decoded.user_name;
        self.role = res.data.decoded.user_role;
        if (self.role == 0) {
          self.$router.push("/");
        }
      });
    },
    getByDay() {
      let self = this;
      let total = 0;
      this.$axios
        .get("/orders/get/by-day?date=" + this.date)
        .then(function(res) {
          self.days = res.data.data.rows;
          self.days.forEach(function(obj) {
            total += parseInt(obj["total_price"]);
          });
          console.log("aaa", total);
        });
    },
    getByMonth() {
      let self = this;
      let new_date = 0;
      this.arr = [];
      for (let i = 0; i < 32; i++) {
        let money = 0;
        if (i < 10) {
          new_date = this.month + "-0" + i;
          this.$axios.get("/orders/get/by-day?date=" + new_date).then(res => {
            if (res.data.data.rows.length > 0) {
              res.data.data.rows.forEach(element => {
                money += parseInt(element.total_price);
              });
              let text = res.data.data.rows[0].createdAt + "";
              let day = text.split("T");
              self.arr.push({
                'day': money
              });
            }
          });
        } else {
          new_date = this.month + "-" + i;
          this.$axios.get("/orders/get/by-day?date=" + new_date).then(res => {
            if (res.data.data.rows.length > 0) {
              res.data.data.rows.forEach(element => {
                money += parseInt(element.total_price);
              });
              let text = res.data.data.rows[0].createdAt + "";
              let day = text.split("T");
              self.arr.push({
                'day': revenue
              });
            }
          });
        }
      }
    },
    handleLogout() {
      Cookie.remove("token");
      this.$store.commit("setToken", null);
      this.$router.push("/login");
    }
  }
};
</script>