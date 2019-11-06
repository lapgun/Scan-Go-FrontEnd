<template>
  <div>
    <b-button variant="success" href="/categories">Home</b-button>
    <br />
    <br />
    <input v-model="search" type="text" class="form-control" placeholder="Enter search key" />
    <button @click="getTasks">Search</button>
    <br />
    <br />
    <b-button variant="success" @click="$router.push('/categories/create')">Create new task</b-button>
    <table id="my-table" class="table table-bordered">
      <thead>
        <tr>
          <th>Number</th>
          <th>name</th>
          <th>cat_parent</th>
          <th>Created_at</th>
          <th>Updated_at</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task,index) in tasks" :key="index">
          <td>{{index+1}}//{{task.id}}</td>
          <td>{{task.name}}</td>
          <td>{{task.cat_parent}}</td>
          <td>{{task.createdAt}}</td>
          <td>{{task.updatedAt}}</td>
          <td>
            <b-button @click="$router.push('/task/details/'+task.id)">Details</b-button>
            <b-button class="btn btn-info" @click="$router.push('/categories/edit/'+task.id)">Update</b-button>
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
      this.$axios.get("/categories").then(function(res) {
        console.log(res);
        self.tasks = res.data.data;
      });
    },

    delTasks: function(id) {
      let self = this;
      this.$axios.delete("/categories/" + id).then(function(res) {
        self.getTasks();
      });
    }
  }
};
</script>
