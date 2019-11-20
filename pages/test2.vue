<template>
  <div>
    <table id="my-table" class="table table-bordered">
      <thead>
        <tr>
          <th>Number</th>
          <th>name</th>
          <th>categoriesId</th>
          <th>price</th>
          <th>order_time</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task,index) in list" :key="index">
          <td>{{index+1}}//{{task.id}}</td>
          <td>{{task.name}}</td>
          <td>{{task.categoriesId}}</td>
          <td>{{task.price}}</td>
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
</template>
<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
  data() {
    return {
      list: [],
      pagination: {
        currentPage: 1,
        perPage: 5,
        totalPage: ""
      },
      search: ""
    };
  },
  mounted() {
    this.getTasks();
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
          
          let results = res.data.data;
          results.forEach(function(element) {
            self.list.push(element);
          });
          self.pagination.totalPage = res.data.pagination.totalPage;
        });
    },
    infiniteHandler($state) {
      if (this.pagination.currentPage == this.pagination.totalPage) {
        $state.complete();
      } else {
        setTimeout(() => {
          let self = this;
          this.pagination.currentPage++;
          this.getTasks();
          $state.loaded();
        }, 1000);
      }
    }
  },
  components: {
    InfiniteLoading
  }
};
</script>