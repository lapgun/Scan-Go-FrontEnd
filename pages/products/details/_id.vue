<template>
  <div>
    <b-button variant="success" @click="$router.push('/products/create')">Create new task</b-button>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Number</th>
        <th>Name</th>
        <th>categories</th>
        <th>picture</th>
        <th>price</th>
        <th>description</th>
        <th>detail</th>
        <th>order_time</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{tasks.id}}</td>
        <td>{{tasks.name}}</td>
        <td>{{tasks.categoriesId}}</td>
                  <td>{{tasks.picture}}</td>
        <td>{{tasks.price}}</td>
        <td>{{tasks.description}}</td>
        <td>{{tasks.detail}}</td>
        <td>{{tasks.order_time}}</td>
        <td>
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
        mounted: function () {
            this.getTasks();
        },

        data: function () {
            return {
                tasks: []
            };
        },
        methods: {
            getTasks: function () {
                let self = this;
                this.$axios.get("/products/" + this.$route.params.id).then(function (res) {
                    console.log(res);
                    self.tasks = res.data.data;
                });
            },
            delTasks: function (id) {
                let self = this;
                this.$axios.delete("/products/" + id).then(function (res) {
                    self.getTasks();
                });
            }
        }
    };
</script>
