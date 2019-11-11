<template>
  <div>
    <input type="text" v-model="search" @keyup.enter="getUsers" />
    <!-- 
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
    <tbody>-->
    <!-- <tr v-for="(user,index) in users"> -->
    <!-- <td>{{index ++}}</td>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.address}}</td>

    <td>-->
    <!-- <button class="btn btn-danger" @click="handelDelete(user.id)">Delete</button>
            <button class="btn btn-secondary" @click="$router.push('/user/detail/'+user.id)">Detail</button>
          </td>
        </tr>
      </tbody>
    </table>-->
    <b-pagination
      v-model="pagination.currentPage"
      :total-rows="pagination.total"
      :per-page="pagination.perPage"
      aria-controls="my-table"
      @change="handelChangePage"
    ></b-pagination>
  </div>
</template>


<script>
export default {
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      users: {},
      search: "",
      pagination: {
        currentPage: 1,
        perPage: 4
      }
    };
  },
  methods: {
    getUsers: function() {
      let self = this;
      this.$axios
        .get(
          "users?search=" +
            this.search +
            "&currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage
        )
        .then(function(res) {
          console.log(res);
          self.users = res.data.data;
          self.pagination = res.data.pagination;
        });
      self.search = "";
    },
    handelDelete(id) {
      let self = this;
      this.$axios.delete("users/" + id).then(function(res) {
        self.getUsers();
      });
    },
    handelChangePage(page) {
      this.pagination.currentPage = page;
      this.getUsers();
    }
  }
};
</script>



