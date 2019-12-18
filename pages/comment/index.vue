<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-9 col-lg-10 sidebar" style="margin-top:50px">
        <div style="display:inline" class="form-group">
          <input
            style="width:30%; display:inherit;margin-bottom:50px; float:right; margin-top:20px"
            type="text"
            class="form-control"
            placeholder="Search"
            @change="handleSearch"
            v-model="search"
          />
        </div>
        <div v-if="this.search">
          <h4 style="margin-top:60px">
            Có {{this.comments.length}} kết quả với từ
            <span style="font-size:15px">'{{this.search}}'</span>
          </h4>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>ProductId</th>
                <th>Action</th>
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
                  <b-button @click="handleCancel(comment.id)" variant="danger">Delete</b-button>
                </td>
              </tr>
            </tbody>
          </table>
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
                <th>Action</th>
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
                  <b-button @click="handleCancel(comment.id)" variant="danger">Delete</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <b-pagination
          v-model="pagination.currentPage"
          :total-rows="pagination.total"
          :per-page="pagination.perPage"
          aria-controls="my-table"
          @change="handleChangePage"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Comment" },
  components: {
    adminNav,
    admin
  },
  mounted() {
    this.getComment();
  },
  data() {
    return {
      comments: [],
      totalResult: 0,
      search: "",
      pagination: {
        currentPage: 1,
        perPage: 5
      }
    };
  },
  methods: {
    getComment() {
      let self = this;
      this.$axios
        .get(
          "/comment?currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage
        )
        .then(function(res) {
          self.comments = res.data.data;
          self.pagination = res.data.pagination;
        });
    },
    handleSearch() {
      let self = this;
      self.comments = [];
      this.$axios
        .get("/comment/search?search=" + this.search)
        .then(function(res) {
          console.log(res);
          self.comments = res.data.data;
        });
    },
    handleChangePage(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getComment();
    },
    handleDelete(id) {
      let self = this;
      this.$axios.delete("/comment/" + id).then(function(res) {
        self.getComment();
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
