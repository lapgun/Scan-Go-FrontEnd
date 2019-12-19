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
        >Create category</b-button>
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
        <div style="display:inline">
          <h5 style="display:inline;margin-top:10px; margin-left:10px">Hiện thị theo:</h5>
          <b-form-select
            style="width:20%"
            v-model="cat_parent"
            :options="options"
            @change="getTasks"
          ></b-form-select>
        </div>
        <div v-if="this.search">
          <div v-if="this.tasks.length > 0">
            <h3>Có {{this.tasks.length}} kết quả với từ khóa '{{this.search}}'</h3>
            <table id="my-table" class="table table-bordered">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Product</th>
                  <th>Cat_parent</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(task,index) in tasks" :key="index">
                  <td>{{index+1}}</td>
                  <td>{{task.name}}</td>
                  <td>
                    <b-button
                      variant="info"
                      @click="$router.push('/categories/product/'+task.id)"
                    >Product</b-button>
                  </td>
                  <td v-if="task.cat_parent!=0">{{task.cat_parent_name}}</td>
                  <td v-else>
                    <b-button
                      :id="'a-'+task.id"
                      @click="getCatChild(task.id)"
                      variant="success"
                    >Show cat's child</b-button>
                    <b-popover :target="'a-'+task.id" triggers="click">
                      <table class="table table-bordered" style="width:500px">
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
                              <b-button variant="danger" @click="delTasks(child.id)">Delete</b-button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </b-popover>
                  </td>
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
            <div v-if="this.tasks.length == 0">
              <h3>Có {{this.tasks.length}} kết quả với từ khóa '{{this.search}}'</h3>
              <p
                style="margin-top:20px; font-size:15px"
              >Xin lỗi, không có kết quả nào tương ứng với tìm kiếm của bạn.</p>
              <p style="font-size:15px">Vui lòng thử lại.</p>
            </div>
          </div>
        </div>
        <div v-else>
          <table id="my-table" class="table table-bordered">
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Product</th>
                <th>Cat_parent</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task,index) in tasks" :key="index">
                <td>{{index+1}}</td>
                <td>{{task.name}}</td>
                <td>
                  <b-button
                    variant="info"
                    @click="$router.push('/categories/product/'+task.id)"
                  >Product</b-button>
                </td>
                <td v-if="task.cat_parent!=0">{{task.cat_parent_name}}</td>
                <td v-else>
                  <b-button
                    :id="'a-'+task.id"
                    @click="getCatChild(task.id)"
                    variant="success"
                  >Show cat's child</b-button>
                  <b-popover :target="'a-'+task.id" triggers="click">
                    <table class="table table-bordered" style="width:500px">
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
                            <b-button variant="danger" @click="delTasks(child.id)">Delete</b-button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </b-popover>
                </td>
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
    this.checkAdmin();
  },
  data() {
    return {
      loaded: false,
      user_id: "",
      tasks: [],
      childs: [],
      length: "",
      search: "",
      cancel: false,
      cat_parent: "all",
      options: [
        { value: "all", text: "All" },
        { value: "0", text: "Parent Categories" },
        { value: "1", text: "Child Categories" }
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
          title: "Are you sure?",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it"
        })
        .then(result => {
          if (result.value) {
            let self = this;
            this.$axios.delete("/categories/" + id).then(function(res) {
              self.$swal.fire("Success", res.data.message, "success");
              self.getTasks();
            });
          } else {
            this.$swal.fire("Cancelled", "Your file is safe", "error");
          }
        });
    },
    checkAdmin() {
      let self = this;
      this.$axios.get("/users/decoded").then(function(res) {
        self.user_id = res.data.decoded.user_id;
        if (res.data.decoded.user_role == 0) {
          self.$router.push("/");
        }
      });
    }
  }
};
</script>
