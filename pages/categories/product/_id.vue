<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-8 col-lg-10 sidebar" style="margin-top:50px">
        <div style="display:inline" class="form-group"></div>
        <table id="my-table" class="table table-bordered" v-if="loaded">
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Price</th>
              <th>Order Times</th>
              <th>Image</th>
              <th>Description</th>
              <th>Detail</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task,index) in tasks" :key="index">
              <td>{{index+1}}</td>
              <td>{{task.name}}</td>
              <td>{{currency(task.price)}}</td>
              <td>{{task.order_time}}</td>
              <td>
                <img style="width:50px; height:50px" :src="`/${task.picture ? task.picture: ''}`" />
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
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Thể loại" },
  components: {
    adminNav,
    admin
  },
  mounted() {
    this.getByMenu();
    this.getByCat();
  },
  data() {
    return {
      tasks: [],
      cancel: false,
      loaded: false
    };
  },
  methods: {
    getByMenu() {
      let self = this;
      this.$axios
        .get("/products/menu/" + this.$route.params.id)
        .then(function(res) {
          let temp = res.data.data;
          self.tasks = self.tasks.concat(temp);
        });
    },
    getByCat() {
      let self = this;
      this.$axios
        .get("/categories/cat_parent/" + this.$route.params.id)
        .then(function(res) {
          let temp = res.data.data.rows;
          temp.forEach(element => {
            self.tasks = self.tasks.concat(element.products);
          });
          self.getPicture();
        });
    },
    getPicture() {
      let self = this;
      this.tasks.forEach(element => {
        this.$axios.get("/gallery/" + element.picture).then(function(res) {
          let default_image = res.data.data.default_image;
          element.picture = default_image;
        });
      });
      this.loaded = true;
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
    },
    currency(x) {
      x = x.toLocaleString("currency", { style: "currency", currency: "VND" });
      return x;
    }
  }
};
</script>
