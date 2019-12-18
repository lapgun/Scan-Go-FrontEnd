<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-8 col-lg-10 sidebar" style="margin-top:40px">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Cat's parent</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{task.id}}</td>
              <td>{{task.name}}</td>
              <td>{{task.cat_parent_name}}</td>
              <td>
                <b-button
                  class="btn btn-info"
                  @click="$router.push('/categories/edit/'+task.id)"
                >Update</b-button>
                <b-button variant="danger" @click="delTasks(task.id)">Delete</b-button>
                <b-button @click="$router.push('/categories')">Back</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Chi tiết danh mục" },
  mounted() {
    this.getTasks();
  },
  data() {
    return {
      task: []
    };
  },
  components: {
    adminNav,
    admin
  },
  methods: {
    getTasks() {
      let self = this;
      this.$axios
        .get("/categories/" + this.$route.params.id)
        .then(function(res) {
          self.task = res.data.data;
        });
    },
    delTasks(id) {
      let self = this;
      this.$axios.delete("/categories/" + id).then(function(res) {
        self.getTasks();
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
