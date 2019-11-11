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
                <a @click="$router.push('/admins/home')">Home</a>
              </li>
              <li>
                <a @click="$router.push('/admins/detail/'+admin_id)">Admin</a>
              </li>
              <li>
                <a @click="$router.push('/admins/edit/'+admin_id)">Profile</a>
              </li>
              <li>
                <a @click="$router.push('/admins/create')">Register</a>
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
            <input type="text" class="form-control" placeholder="Search" />
          </div>
        </form>
        <ul class="nav menu" style="display:block">
          <li class="active">
            <a @click="$router.push('/admins/home')">Home</a>
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
            <a @click="$router.push('/order_details')">Order_details</a>
          </li>
          <li>
            <a @click="$router.push('/order_products')">Order_products</a>
          </li>
          <li>
            <a @click="$router.push('/order_statuses')">Order_statuses</a>
          </li>
          <li>
            <a @click="$router.push('/user')">Users</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-8 col-lg-10 sidebar">
        <input v-model="search" type="text" class="form-control" placeholder="Enter search key" />
        <button @click="getTasks">Search</button>
        <br />
        <br />
        <b-button variant="success" @click="$router.push('/categories/create')">Create new task</b-button>
        <table id="my-table" class="table table-bordered">
          <thead>
            <tr>
              <th>Number</th>
              <th>name</th>
              <th>cat_parent</th>
              <th>Created_at</th>
              <th>Updated_at</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task,index) in tasks" :key="index">
              <td>{{index+1}}//{{task.id}}</td>
              <td>{{task.name}}</td>
              <td>{{task.cat_parent}}</td>
              <td>{{task.createdAt}}</td>
              <td>{{task.updatedAt}}</td>
              <td>
                <b-button @click="$router.push('/categories/details/'+task.id)">Details</b-button>
                <b-button
                  class="btn btn-info"
                  @click="$router.push('/categories/edit/'+task.id)"
                >Update</b-button>
                <b-button class="btn btn-info" variant="danger" @click="delTasks(task.id)">Delete</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.getTasks();
  },
  data: function() {
    return {
      tasks: [],
      search: ""
    };
  },

  methods: {
    getTasks: function() {
      let self = this;
      this.$axios.get("/categories").then(function(res) {
        console.log(res);
        self.tasks = res.data.data;
      });
    },

    delTasks: function(id) {
      let self = this;
      this.$axios.delete("/categories/" + id).then(function(res) {
        self.getTasks();
      });
    }
  }
};
</script>
