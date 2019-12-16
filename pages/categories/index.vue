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
          <input
            type="text"
            @change="handleSearch"
            v-model="search"
            class="form-control"
            placeholder="Search"
          />
        </div>

        <ul class="nav menu" style="display:block">
          <li>
            <a @click="$router.push('/user/home')">Home</a>
          </li>
          <li class="active">
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
      <div class="col-sm-8 col-lg-10 sidebar" style="margin-top:50px">
        <b-button variant="success" @click="$router.push('/categories/create')">Create new task</b-button>
        <label>
          <h5>Hiện thị theo:</h5>
          <b-form-select v-model="cat_parent" :options="options" @change="getTasks"></b-form-select>
        </label>
        <table id="my-table" class="table table-bordered">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Product</th>
              <th>Cat_parent</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task,index) in tasks" :key="index">
              <td>{{index+1}}</td>
              <td>{{task.name}}</td>
              <td>
                <b-button
                  variant="info"
                  @click="$router.push('/categories/product/'+task.id)"
                >Product</b-button>
              </td>
              <td v-if="task.cat_parent!=0">{{task.cat_parent_name}}</td>
              <td v-else>
                <b-button
                  variant="success"
                  v-b-toggle="'a-'+task.id"
                  @click="getCatChild(task.id)"
                >Show cat's child</b-button>
              </td>

              <b-collapse :id="'a-'+task.id">
                <table class="table table-bordered">
                  <thead>
                    <th>Name</th>
                    <th>Edit</th>
                  </thead>
                  <tbody>
                    <tr v-for="(child,key) in childs" :key="key">
                      <td>{{child.name}}</td>
                      <td>
                        <b-button
                          variant="info"
                          @click="$router.push('/categories/details/'+child.id)"
                        >Details</b-button>
                        <b-button
                          variant="warning"
                          @click="$router.push('/categories/edit/'+child.id)"
                        >Update</b-button>
                        <b-button variant="danger" @click="delTasks(childs.id)">Delete</b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-collapse>
              <td>
                <b-button
                  variant="info"
                  @click="$router.push('/categories/details/'+task.id)"
                >Details</b-button>
                <b-button
                  variant="warning"
                  @click="$router.push('/categories/edit/'+task.id)"
                >Update</b-button>
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
  head: { title: "Danh mục" },
  mounted() {
    this.getAdmins();
    this.getTasks();
  },
  data() {
    return {
      loaded: false,
      user_id: "",
      tasks: [],
      childs: [],
      search: "",
      cancel: false,
      cat_parent: "all",
      options: [
        { value: "all", text: "Tất cả" },
        { value: "0", text: "Danh mục cha" },
        { value: "1", text: "Danh mục con" }
      ]
    };
  },
  methods: {
    getTasks() {
      let self = this;
      if (this.cat_parent == 0) {
        this.$axios.get("/categories/cat_parent/" + 0).then(function(res) {
          self.tasks = res.data.data.rows;
        });
      }
      if (this.cat_parent == "all") {
        this.$axios.get("/categories").then(function(res) {
          self.tasks = res.data.data;
        });
      }
      if (this.cat_parent == 1) {
        this.$axios.get("/categories/cat_product").then(function(res) {
          self.tasks = res.data.data.rows;
        });
      }
    },
    getCatChild(id) {
      let self = this;
      this.$axios.get("/categories/cat_parent/" + id).then(function(res) {
        self.childs = res.data.data.rows;
      });
    },
    handleSearch() {
      let self = this;
      self.tasks = [];
      this.$axios
        .get("/categories/search?search=" + this.search)
        .then(function(res) {
          self.tasks = res.data.data;
        });
    },
    delTasks(id) {
      this.$swal
        .fire({
          title: "Bạn chắc chắn muốm xóa?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it"
        })
        .then(result => {
          if (result.value) {
            this.$swal.fire("Xóa!", "Bạn xóa thể loại thành công!.", "success");
            let self = this;
            this.$axios.delete("/categories/" + id).then(function(res) {
              self.getTasks();
            });
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
            this.$swal.fire(
              "Cancelled",
              "Your imaginary file is safe :)",
              "error"
            );
          }
        });
    },
    getAdmins() {
      let self = this;
      this.$axios.get("/users/decoded").then(function(res) {
        self.user_id = res.data.decoded.user_id;
        if (res.data.decoded.user_role == 0) {
          self.$router.push("/");
        }
      });
    },
    handleLogout() {
      Cookie.remove("token");
      this.$store.commit("setToken", null);
      this.$router.push("/login");
    }
  }
};
</script>
