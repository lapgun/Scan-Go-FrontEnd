<template>
<<<<<<< HEAD
    <div>
        <b-button @click="$router.push('/order_statuses/create')" variant="info">Create</b-button>
        <input type="search" placeholder="Search start.." v-model="search">
        <b-button @click="handleSearch" variant="info">Search</b-button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Order_id</th>
                    <th>Note</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order_status , index) in order_statuses" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{order_status.name}}</td>
                    <td>{{order_status.orderId}}</td>
                    <td>{{order_status.note}}</td>
                    <td>
                        <b-button @click="$router.push('/order_statuses/detail/'+order_status.id)">Detail</b-button>
                        <b-button @click="$router.push('/order_statuses/edit/'+order_status.id)" variant="success">Edit</b-button>
                        <b-button @click="handleDelete(order_status.id)" variant="danger">Delete</b-button>
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
=======
  <div>
    <b-button @click="$router.push('/order_statuses/create')" variant="info">Create</b-button>
    <input type="search" placeholder="Search start.." v-model="search" />
    <b-button @click="handleSearch" variant="info">Search</b-button>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Order_id</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order_status , index) in order_statuses" :key="index">
          <td>{{index+1}}</td>
          <td>{{order_status.name}}</td>
          <td>{{order_status.orderId}}</td>
          <td>{{order_status.note}}</td>
          <td>
            <b-button @click="$router.push('/order_statuses/detail/'+order_status.id)">Detail</b-button>
            <b-button
              @click="$router.push('/order_statuses/edit/'+order_status.id)"
              variant="success"
            >Edit</b-button>
            <b-button @click="handleDelete(order_status.id)" variant="danger">Delete</b-button>
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
>>>>>>> 4f2e0f0d636819b7aa1a052db06d025c81f5f6c7
</template>
<script>
export default {
  mounted: function() {
    this.getOrderStatuses();
  },
  data: function() {
    return {
      order_statuses: {
        index: "",
        order_id: "",
        name: "",
        note: ""
      },
      search: "",
      totalResult: 0,
      pagination: {
        currentPage: 1,
        perPage: 10
      }
    };
  },
  methods: {
    getOrderStatuses: function() {
      let self = this;
      this.$axios
        .get(
          "/order_statuses?search=" +
            this.search +
            "&currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage
        )
        .then(function(res) {
          console.log(res);
          self.order_statuses = res.data.data;
          self.pagination = res.data.pagination;
        });
    },
    handleDelete: function(id) {
      let self = this;
      this.$axios.delete("/order_statuses/" + id).then(function(res) {
        console.log(res);
        self.getOrderStatuses();
      });
    },
    handleSearch: function() {
      this.getOrderStatuses();
    },
    handleChangePage: function(page) {
      this.pagination.currentPage = page;
      this.getOrderStatuses();
    }
  }
};
</script>