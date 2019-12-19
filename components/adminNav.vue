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
              <li>
                <a style="margin-top:-10px" @click="$router.push('/user/detail/'+user_id)">Profile</a>
              </li>
              <li>
                <a style="margin-top:-10px" @click="handleLogout">Logout</a>
              </li>
            </ul>
          </li>
        </div>
      </div>
      <!-- /.container-fluid -->
    </nav>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  mounted() {
    this.getAdmins();
  },
  data() {
    return {
      user_id: "",
      users: []
    };
  },
  methods: {
    getAdmins() {
      let self = this;
      this.$axios.get("/users/decoded").then(function(res) {
        self.user_id = res.data.decoded.user_id;
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