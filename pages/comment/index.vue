<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-9 col-lg-10 sidebar" style="margin-top:50px">
        <div style="display:inline" class="form-group">
          <input style="width:30%; display:inherit;margin-bottom:50px; float:right; margin-top:20px"
            type="text"
            class="form-control"
            placeholder="Search"
          />
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>ParentId</th>
              <th>ProductId</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(comment , index) in comments" :key="index">
              <td>{{index+1}}</td>
              <td>{{comment.user.name}}</td>
              <td>{{comment.comment}}</td>
              <td>{{comment.rating}}</td>
              <td>{{comment.parentId}}</td>
              <td>{{comment.productId}}</td>
              <td>
                <b-button @click="handleCancel(comment.id)" variant="danger">Delete</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Comment"},
  components :{
    adminNav,
    admin
  },
  mounted() {
    this.getSlides();
  },
  data() {
    return {
      comments: [],
      totalResult: 0,
      pagination: {
        currentPage: 1,
        perPage: 10
      }
    };
  },
  methods: {
    getSlides() {
      let self = this;
      this.$axios.get("/comment").then(function(res) {
        self.comments = res.data.rows;
      });
    },
    handleCancel(id) {
      this.$swal
        .fire({
          title: "Bạn chắc chắn muốm xóa?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it"
        })
        .then(result => {
          if (result.value) {
            this.$swal.fire("Xóa!", "Bạn xóa comment thành công!.", "success");
            let self = this;
            this.$axios.delete("/comment/" + id).then(function(res) {
              self.getSlides();
            });
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
            this.$swal.fire(
              "Cancelled",
              "Your imaginary file is safe :)",
              "error"
            );
          }
        });
    }
  }
};
</script>
