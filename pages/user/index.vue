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
          <li>
            <a @click="$router.push('/orders')">Orders</a>
          </li>
          <li>
            <a @click="$router.push('/slide')">Slide</a>
          </li>
          <li>
            <a @click="$router.push('/comment')">Comment</a>
          </li>
          <li class="active">
            <a @click="$router.push('/user')">Users</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-9 col-lg-10 sidebar">
        <div style="width:30%; margin-bottom:30px">
          <label></label>
          <b-form-select v-model="selected" :options="options" @change="getUsers"></b-form-select>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td>{{user.id}}</td>
              <td>{{user.name}}</td>
              <td>
                {{user.role}}
                <b-button
                  v-if="user.role == 0"
                  variant="warning"
                  @click="admin(user.id,user.role)"
                >Admin</b-button>
                <b-button
                  v-if="user.role == 1"
                  variant="warning"
                  @click="admin(user.id,user.role)"
                >Is not an admin?</b-button>
              </td>
              <td>{{user.email}}</td>
              <td>{{user.address}}</td>
              <td>
                <button class="btn btn-danger" @click="handelDelete(user.id)">Delete</button>
                <button
                  class="btn btn-secondary"
                  @click="$router.push('/user/detail/'+user.id)"
                >Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  head: { title:'User'},
  mounted: function() {
    this.getUsers();
  },
  data: function() {
    return {
      users: [],
      user_id: "",
      search: "",
      selected: "0",
      options: [
        {
          value: "1",
          text: "Admin"
        },
        {
          value: "0",
          text: "Customer"
        }
      ]
    };
  },
  methods: {
    getUsers: function() {
      let self = this;
      this.$axios.get("/users/" + this.selected).then(function(res) {
        self.user_id = res.data.decoded.user_id;
        self.users = res.data.data;
      });
    },
    handleSearch: function() {
      this.$axios
        .get("/categories/search?search=" + this.search)
        .then(function(res) {
          let self = this;
          self.tasks = res.data.data;
        });
    },
    handelDelete(id) {
      let self = this;
      if (confirm("Are you sure?")) {
        this.$axios.delete("/users/" + id).then(function(res) {
          if (res.data.error) {
            alert(res.data.message);
          } else {
            alert(res.data.message);
            self.getUsers();
          }
        });
      }
    },
    handleLogout: function() {
      Cookie.remove("token");
      this.$store.commit("setToken", null);
      this.$router.push("/login");
    },
    admin(id, role) {
      let self = this;
      this.$axios
        .put("/users/admin/" + id, {
          role: role
        })
        .then(function(res) {
          if (res.data.error) {
            alert(res.data.message);
          }
          self.getUsers();
        });
    }
  }
};
</script>