<template>
  <div>
    <b-button variant="success" href="/products">Home</b-button>
    <br />
    <br />
    <input v-model="search" type="text" class="form-control" placeholder="Enter search key" />
    <button @click="getTasks">Search</button>
    <br />
    <br />
    <b-button variant="success" @click="$router.push('/products/create')">Create new task</b-button>
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
          <th>Created_at</th>
          <th>Updated_at</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task,index) in tasks" :key="index">
          <td >{{index+1}}//{{task.id}}</td>
          <td>{{task.name}}</td>
          <td>{{task.categoriesId}}</td>
          <td>{{task.picture}}</td>
          <td>{{task.price}}</td>
          <td>
            <b-button v-b-toggle="'1'" class="m-1">Show</b-button>
            <b-collapse id="1">{{task.description}}</b-collapse>
          </td>
          <td>
            <b-button v-b-toggle.collapse-3 class="m-1">show</b-button>
            <b-collapse id="collapse-3">
              <b-card>{{task.detail}}</b-card>
            </b-collapse>
          </td>
          <td>{{task.order_time}}</td>
          <td>{{task.createdAt}}</td>
          <td>{{task.updatedAt}}</td>
          <td>
            <b-button @click="$router.push('/products/details/'+task.id)">Details</b-button>
            <b-button class="btn btn-info" @click="$router.push('/products/edit/'+task.id)">Update</b-button>
            <b-button class="btn btn-info" variant="danger" @click="delTasks(task.id)">Delete</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.getTasks();
  },
  data: function() {
    return {
      tasks: [],
      search: ""
    };
  },

  methods: {
    getTasks: function() {
      let self = this;
      this.$axios.get("/products").then(function(res) {
        console.log(res);
        self.tasks = res.data.data;
      });
    },

    delTasks: function(id) {
      let self = this;
      this.$axios.delete("/products/" + id).then(function(res) {
        self.getTasks();
      });
    }
  }
};
</script>
