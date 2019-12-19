<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-9 col-lg-10 sidebar">
        <div style="display:inline" class="form-group">
          <input
            style="width:30%; display:inherit;margin-bottom:50px; float:right; margin-top:20px"
            type="text"
            @change="handleSearch"
            v-model="search"
            class="form-control"
            placeholder="Search"
          />
        </div>
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
              <td v-if="user.role==0">Custormer</td>
              <td v-if="user.role==1">Admin</td>
              <td v-if="user.role==2">Super Admin</td>
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
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "User" },
  components: {
    adminNav,
    admin
  },
  mounted() {
    this.getUsers();
  },
  data() {
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
    getUsers() {
      let self = this;
      this.$axios.get("/users/" + this.selected).then(function(res) {
        self.user_id = res.data.decoded.user_id;
        self.users = res.data.data;
      });
    },
    handleSearch() {
      let self = this;
      self.tasks = [];
      this.$axios
        .get("/users/search?search=" + this.search)
        .then(function(res) {
          self.users = res.data.data;
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
    handleLogout() {
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