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
                <a @click="$router.push('/user/register')">Register</a>
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
            <a @click="$router.push('/user')">Users</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-8 col-lg-10 sidebar">
        <div class="create-form">
          <label>Name</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Enter your cat name "
          />
          <label>Select category's parent in the select form below :</label>
          <b-form-select
            v-model="form.cat_parent"
            @change="getCatName(form.cat_parent)"
            :options="options"
          ></b-form-select>
          <br />
          <label>
            <button class="btn btn-info" @click="handleSubmit">Submit</button>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head: { title: "Sửa thể loại" },
  mounted() {
    this.getDetail();
    this.getCategories();
  },
  data() {
    return {
      form: {
        name: "",
        cat_parent: "",
        cat_parent_name: ""
      },
      options: [{ value: 0, text: "This is parent category " }]
    };
  },
  methods: {
    getCategories() {
      let self = this;
      this.$axios.get("/categories/cat_parent/0").then(function(res) {
        let data = res.data.data.rows;
        data.forEach(value => {
          self.options.push({
            value: value.id,
            text: value.name
          });
        });
      });
    },
    getCatName(id) {
      this.$axios.get("/categories/" + id).then(res => {
        this.form.cat_parent_name = res.data.data.name;
      });
    },
    getDetail() {
      let self = this;
      this.$axios
        .get("/categories/" + this.$route.params.id)
        .then(function(res) {
          self.form = res.data.data;
        });
    },
    handleSubmit() {
      this.$swal.fire("Yes", "Cập nhật thể loại thành công!", "success");
      let self = this;
      this.$axios
        .put("/categories/" + this.form.id, this.form)
        .then(function(res) {
          self.$router.push("/categories");
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
