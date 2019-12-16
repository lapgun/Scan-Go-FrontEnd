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
          <li class="active">
            <a @click="$router.push('/comment')">Comment</a>
          </li>
          <li>
            <a @click="$router.push('/user')">Users</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-9 col-lg-10 sidebar" style="margin-top:50px">
        <table id="my-table" class="table table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>ProductId</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(comment , index) in comments" :key="index">
              <td>{{index+1}}</td>
              <td>{{comment.name}}</td>
              <td>{{comment.comment}}</td>
              <td>{{comment.rating}}</td>
              <td>{{comment.productId}}</td>
              <td>
                <b-button @click="handleDelete(comment.id)" variant="danger">Delete</b-button>
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
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  head: { title: "Comment" },
  mounted() {
    this.getComment();
  },
  data() {
    return {
      comments: [],
      search: "",
      pagination: {
        currentPage: 1,
        perPage: 10
      }
    };
  },
  methods: {
    getComment() {
      let self = this;
      this.$axios
        .get(
          "/comment?currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage
        )
        .then(function(res) {
          self.comments = res.data.data;
          self.pagination = res.data.pagination;
        });
    },
    handleDelete(id) {
      let self = this;
      this.$axios.delete("/comment/" + id).then(function(res) {
        self.getComment();
      });
    },
    handleLogout() {
      Cookie.remove("token");
      this.$store.commit("setToken", null);
      this.$router.push("/login");
    },
    handleChangePage(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getComment();
    }
  }
};
</script>
