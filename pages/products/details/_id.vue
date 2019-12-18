<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-8 col-lg-10 sidebar" style="margin-top:40px">
        <h3>{{tasks.name}}</h3>
        <table class="table table-bordered">
          <tr>
            <th>Number</th>
            <th>categories</th>
            <th>picture</th>
            <th>price</th>
            <th>description</th>
            <th>detail</th>
            <th>order_time</th>
            <th>action</th>
          </tr>
          <tr>
            <td>{{tasks.id}}</td>
            <td>{{tasks.categories ? tasks.categories.name : '' }}</td>
            <td>
              <img :src="`/${tasks.images? tasks.images.default_image: ''}`" />
            </td>
            <td>{{tasks.price}}</td>
            <td v-html="tasks.description"></td>
            <td style="width:400px" v-html="tasks.detail"></td>
            <td>{{tasks.order_time}}</td>
            <td>
              <b-button class="btn btn-dark" @click="$router.push('/products')">Back</b-button>
              <b-button variant="info" @click="$router.push('/products/edit/'+tasks.id)">Update</b-button>
              <b-button variant="danger" @click="delTasks(tasks.id)">Delete</b-button>
            </td>
          </tr>
        </table>
        <div>
          <h3>Comment List</h3>
          <div v-if="this.comments.length == 0">
            <p style="font-size:16px">Không có comment nào.</p>
          </div>
          <div v-else>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Comment</th>
                  <th>Rating</th>
                  <th>ProductId</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(comment , index) in comments" :key="index">
                  <td>{{index+1}}</td>
                  <td>{{comment.name}}</td>
                  <td>{{comment.comment}}</td>
                  <td>{{comment.rating}}</td>
                  <td>{{comment.productId}}</td>
                  <td>
                    <b-button @click="deleteComment(comment.id)" variant="danger">Delete</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Chi tiết sản phẩm" },
  created() {
    this.getTasks();
    this.getComment();
  },
  components: {
    admin,
    adminNav
  },
  data() {
    return {
      tasks: [],
      comments: [],
      count: ""
    };
  },
  methods: {
    getTasks: async function() {
      const res = await this.$axios.get("/products/" + this.$route.params.id);
      this.tasks = res.data.data;
    },
    delTasks(id) {
      let self = this;
      this.$axios.delete("/products/" + id).then(function(res) {
        self.getTasks();
      });
    },
    getComment() {
      let self = this;
      this.$axios
        .get("/comment/get/by_product_id/" + this.$route.params.id)
        .then(function(res) {
          console.log(res);
          self.comments = res.data.rows;
        });
    },
    deleteComment(id) {
      let self = this;
      this.$axios.delete("/comment/" + id).then(function(res) {
        self.getComment();
      });
    }
  }
};
</script>
<style>
img {
  width: 50px;
  height: 50px;
}
</style>
