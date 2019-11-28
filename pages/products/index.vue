<template>
  <div>
    <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
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
          <li class="active">
            <a @click="$router.push('/products')">Products</a>
          </li>
          <li>
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
      <div class="col-sm-8 col-lg-10 sidebar">
        <b-button variant="success" @click="$router.push('/products/create')">Create new task</b-button>
        <div>
          <label>
            Sắp xếp theo
            <b-form-select v-model="order_by" :options="order" @change="getTasks"></b-form-select>
          </label>
        </div>
        <table id="my-table" class="table table-bordered">
          <thead>
            <tr>
              <th>Number</th>
              <th>name</th>
              <th>Categories Id</th>
              <th>Price</th>
              <th>Image</th>
              <th>Detail</th>
              <th>Description</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task,index) in tasks" :key="index">
              <td>{{index+1}}//{{task.id}}</td>
              <td>{{task.name}}</td>
              <td>{{task.categoriesId}}</td>
              <td>{{currency(task.price)}}</td>
              <td>
                <img
                  style="width:50px; height:50px"
                  :src="`/${task.images ? task.images.default_image: ''}`"
                />
              </td>
              <td>
                <b-button v-b-toggle="'a-'+task.id" class="m-1">Show</b-button>
                <b-collapse :id="'a-'+task.id">
                  <div v-html="task.description"></div>
                </b-collapse>
              </td>
              <td>
                <b-button v-b-toggle="'b-'+task.id" class="m-1">show</b-button>
                <b-collapse :id="'b-'+task.id">
                  <b-card>
                    <div v-html="task.detail"></div>
                  </b-card>
                </b-collapse>
              </td>
              <td>
                <b-button @click="$router.push('/products/details/'+task.id)">Details</b-button>
                <b-button variant="info" @click="$router.push('/products/edit/'+task.id)">Update</b-button>
                <b-button variant="danger" @click="delTasks(task.id)">Delete</b-button>
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
  mounted: function() {
    this.getTasks();
  },
  data: function() {
    return {
      tasks: [],
      search: "",
      user_id: "",
      users: [],
      order_by: ["id", "ASC"],
      order: [
        { value: ["name", "ASC"], text: "Tên từ A-Z" },
        { value: ["name", "DESC"], text: "Tên từ Z-A" },
        { value: ["price", "ASC"], text: "Giá tiền tăng dần" },
        { value: ["price", "DESC"], text: "Giá tiền giảm dần" },
        { value: ["id", "DESC"], text: "Mới nhất" },
        { value: ["id", "ASC"], text: "Cũ nhất" }
      ]
    };
  },
  methods: {
    currency(x) {
      x = x.toLocaleString("currency", { style: "currency", currency: "VND" });
      return x;
    },
    getTasks: function() {
      let self = this;
      this.$axios.get("/products").then(function(res) {
        console;
        self.tasks = res.data.data;
        console.log(res.data.data);
      });
    },
    delTasks: function(id) {
      let self = this;
      this.$axios.delete("/products/" + id).then(function(res) {
        self.getTasks();
      });
    },
    handleSearch() {
      let self = this;
      this.$axios
        .get("/products/search?search=" + this.search)
        .then(function(res) {
          self.tasks = res.data.data;
        });
    },
    handleLogout: function() {
      Cookie.remove("token");
      localStorage.removeItem("cart");
      this.$store.commit("setToken", null);
      this.$router.push("/login");
    },
    delTasks: function(id) {
      let self = this;
      this.$axios.delete("/products/" + id).then(function(res) {
        self.getTasks();
      });
    }
  }
};
</script>
<style>
img {
  width: 50px;
  height: 50px;
}

table {
  margin-top: 10px;
}
.search {
  width: 50%;
  display: flex;
  margin: 10px 0px;
}
</style>
