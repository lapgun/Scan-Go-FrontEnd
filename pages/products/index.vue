<template>
  <div class="container">
    <b-button variant="success" @click="$router.push('/admins/home')">Home</b-button>
    <div class="search">
      <input v-model="search" type="text" class="form-control" placeholder="Enter search key" />
      <button class="btn btn-success" @click="handleSearch">Search</button>
    </div>
    <b-button variant="success" @click="$router.push('/products/create')">Create new task</b-button>
    <div>
      <table id="my-table" class="table table-bordered">
        <thead>
          <tr>
            <th>Number</th>
            <th>name</th>
            <th>categoriesId</th>
            <th>picture</th>
            <th>price</th>
            <th>description</th>
            <th>detail</th>
            <th>order_time</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task,index) in tasks" :key="index">
            <td>{{index+1}}//{{task.id}}</td>
            <td>{{task.name}}</td>
            <td>{{task.categoriesId}}</td>
            <td>
              <img :src="task.images.default_image" />
            </td>
            <td>{{task.price}}</td>
            <td>
              <b-button v-b-toggle.collapse-2 class="m-1">Show</b-button>
              <b-collapse id="collapse-2">{{task.description}}</b-collapse>
            </td>
            <td>
              <b-button v-b-toggle.collapse-3 class="m-1">show</b-button>
              <b-collapse id="collapse-3">
                <b-card>{{task.detail}}</b-card>
              </b-collapse>
            </td>
            <td>{{task.order_time}}</td>
            <td>
              <b-button @click="$router.push('/products/details/'+task.id)">Details</b-button>
              <b-button class="btn btn-info" @click="$router.push('/products/edit/'+task.id)">Edit</b-button>
              <b-button class="btn btn-info" variant="danger" @click="delTasks(task.id)">Delete</b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</template>
<script>
import InfiniteLoading from "vue-infinite-loading";
export default {
  mounted: function() {
    this.getTasks();
  },
  data: function() {
    return {
      tasks: [],
      pagination: {
        currentPage: 1,
        perPage: 10,
        totalPage: ""
      },
      search: ""
    };
  },
  components: {
    InfiniteLoading
  },
  methods: {
    getTasks() {
      let self = this;
      this.$axios
        .get(
          "/products?search=" +
            this.search +
            "&currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage
        )
        .then(function(res) {
          console.log(res);
          let results = res.data.data;
          results.forEach(function(element) {
            self.tasks.push(element);
          });
          self.pagination.totalPage = res.data.pagination.totalPage;
        });
    },
    handleSearch(){
      let self=this
      this.$axios.get("/products/search?search="+this.search).then(function(res){
          self.tasks = res.data.data;
      });
    },
    delTasks: function(id) {
      let self = this;
      this.$axios.delete("/products/" + id).then(function(res) {
        self.getTasks();
      });
    },
    infiniteHandler($state) {
      if (this.pagination.currentPage == this.pagination.totalPage) {
        $state.complete();
      } else {
        setTimeout(() => {
          this.pagination.currentPage++;
          this.getTasks();
          $state.loaded();
        }, 1000);
      }
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
