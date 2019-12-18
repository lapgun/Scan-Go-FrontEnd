<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-8 col-lg-10 sidebar" style="margin-top:50px">
        <b-button
          style="display:inline"
          variant="success"
          @click="$router.push('/categories/create')"
        >Create new task</b-button>
        <div style="display:inline" class="form-group">
          <input
            style="width:30%; display:inherit;margin-bottom:50px; float:right"
            type="text"
            @change="handleSearch"
            v-model="search"
            class="form-control"
            placeholder="Search"
          />
        </div>
        <div v-if="this.search">
          <h4>Có {{this.tasks.length}} kết quả với từ khóa '{{this.search}}'</h4>
          <table id="my-table" class="table table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>name</th>
                <th style="width:300px">cat_parent</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task,index) in tasks" :key="index">
                <td>{{index+1}}</td>
                <td>{{task.name}}</td>
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
        <div v-else>
          <table id="my-table" class="table table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>name</th>
                <th style="width:300px">cat_parent</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task,index) in tasks" :key="index">
                <td>{{index+1}}</td>
                <td>{{task.name}}</td>
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
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Thể loại" },
  components: {
    adminNav,
    admin
  },
  mounted() {
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
            let self = this;
            this.$axios.delete("/categories/" + id).then(function(res) {
              self.$swal.fire("Xóa!", res.data.message, "success");
              self.getTasks();
            });
          } else {
            this.$swal.fire("Cancelled", "Your file is safe", "error");
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
