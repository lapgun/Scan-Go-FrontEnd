 <template>
  <div id="container">
    <div id="status"></div>
    <div id="wrap">
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
          <tr v-for="(task,index) in tasks" :key="index">
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tasks: [],
      pagination: {
        currentPage: 1,
        perPage: 20,
        totalPage: ""
      },
      search: ""
    };
  },
  mounted() {
    this.getTasks();
    this.scroll();
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
    scroll() {
      window.onscroll = () => {
        var container = document.getElementById("container");
        var contentHeight = container.offsetHeight;
        console.log(contentHeight);
        var yOffset = window.pageYOffset;
        var y = yOffset + window.innerHeight;
        if (y >= contentHeight) {
          if (this.pagination.currentPage <= this.pagination.totalPage) {
            setTimeout(() => {
              this.pagination.currentPage += 1;
              this.getTasks();
            }, 1000);
            console.log(contentHeight);
          } else {
            console.log("no more data");
          }
        }
        var status = document.getElementById("status");
        status.innerHTML = contentHeight + " | " + y;
      };
    }
  }
};
</script>
<style scoped>
#status {
  position: fixed;
  color: rgb(233, 60, 60);
}
</style>