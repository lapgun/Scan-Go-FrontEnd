<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-8 col-lg-10 sidebar" style="margin-top:50px">
        <b-button variant="success" @click="$router.push('/products/create')">Create new task</b-button>
        <label>
          <b-form-select v-model="order_by" :options="order" @change="getProductsByOrder()"></b-form-select>
        </label>
        <div style="display:inline" class="form-group">
          <input
            style="width:30%; display:inherit;margin-bottom:50px; float:right;"
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
              <th>Category</th>
              <th>Price</th>
              <th>Order Times</th>
              <th>Image</th>
              <th>Detail</th>
              <th>Description</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task,index) in tasks" :key="index">
              <td>{{index+1}}</td>
              <td>{{task.name}}</td>
              <td>{{task.categories ? task.categories.name : '' }}</td>
              <td>{{currency(task.price)}}</td>
              <td>{{task.order_time}}</td>
              <td>
                <img
                  style="width:50px; height:50px"
                  :src="`/${task.images ? task.images.default_image: ''}`"
                />
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
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Sản phẩm" },
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
      order_by: ["id", "DESC"],
      order: [
        { value: ["name", "ASC"], text: "Tên từ A-Z" },
        { value: ["name", "DESC"], text: "Tên từ Z-A" },
        { value: ["price", "ASC"], text: "Giá tiền tăng dần" },
        { value: ["price", "DESC"], text: "Giá tiền giảm dần" },
        { value: ["id", "DESC"], text: "Mới nhất" },
        { value: ["id", "ASC"], text: "Cũ nhất" },
        { value: ["order_time", "DESC"], text: "Đặt hàng nhiều nhất" }
      ],
      pagination: {
        currentPage: 1,
        perPage: 10,
        totalPage: ""
      },
      cancel: false
    };
  },
  methods: {
    getTasks() {
      let self = this;
      this.$axios
        .post(
          "/products/sort?currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage,
          this.order_by
        )
        .then(function(res) {
          self.tasks = res.data.data;
          self.pagination = res.data.pagination;
        });
    },
    getProductsByOrder() {
      let self = this;
      self.tasks = [];
      self.pagination.currentPage = 1;
      this.getTasks();
    },
    handleSearch() {
      let self = this;
      self.tasks = [];
      this.$axios
        .get("/products/search?search=" + this.search)
        .then(function(res) {
          self.tasks = res.data.data;
        });
    },
    delTasks(id) {
      let self = this;
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
            this.$axios.delete("/products/" + id).then(function(res) {
              self.$swal.fire("Success", res.data.message, "success");
              self.getTasks();
            });
          } else {
            this.$swal.fire("Cancelled", "Your file is safe", "error");
          }
        });
    },
    handleChangePage(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getTasks();
    },
    currency(x) {
      x = x.toLocaleString("currency", { style: "currency", currency: "VND" });
      return x;
    }
  }
};
</script>
<style>
img {
  width: 50px;
  height: 50px;
}

table {
  margin-top: 10px;
}

.search {
  width: 50%;
  display: flex;
  margin: 10px 0px;
}
</style>
