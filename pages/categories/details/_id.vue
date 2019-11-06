<template>
  <div>
    <b-button variant="success" @click="$router.push('/task')">User</b-button>
    <b-button variant="success" @click="$router.push('/blog')">Blog</b-button>
    <b-button variant="success" @click="$router.push('/task/login')">Login</b-button>
     <b-button variant="success" @click="$router.push('/task/create')">Create new task</b-button>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Number</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{tasks.id}}</td>
          <td>{{tasks.firstName}}</td>
          <td>{{tasks.lastName}}</td>
          <td>{{tasks.email}}</td>
          <td>{{tasks.createdAt}}</td>
          <td>{{tasks.updatedAt}}</td>
          <td>
            <b-button class="btn btn-info" @click="$router.push('/task/edit/'+task.id)">Update</b-button>
            <b-button class="btn btn-info" variant="danger" @click="delTasks(task.id)">Delete</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
   middleware:'authenticated',
  mounted: function() {
    this.getTasks();
  },
  data: function() {
    return {
      tasks: [],
      
    };
  },
  methods: {
      getTasks :function(){
                let self = this
                this.$axios.get('/users/'+this.$route.params.id)
                    .then(function (res) {
                      console.log(res);
                        self.tasks = res.data.data
                    })
            },
      delTasks: function(id) {
      let self = this;
      this.$axios.delete("/users/" + id).then(function(res) {
        self.getTasks();
      });
    }
   
  }
};
</script>
