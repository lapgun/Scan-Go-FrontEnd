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
              <td>{{task.cat_parent}}</td>
              <td>
                <b-button @click="$router.push('/categories/details/'+task.id)">Details</b-button>
                <b-button variant="info" @click="$router.push('/categories/edit/'+task.id)">Update</b-button>
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
    this.getTasks();
  },
  data() {
    return {
      tasks: [],
      search: "",
      cancel: false
    };
  },
  methods: {
    getTasks() {
      let self = this;
      this.$axios.get("/categories").then(function(res) {
        self.tasks = res.data.data;
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
    }
  }
};
</script>
