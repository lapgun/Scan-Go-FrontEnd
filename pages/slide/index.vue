<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-9 col-lg-10 sidebar" style="margin-top:50px">
        <b-button
          style="margin-bottom:20px"
          @click="$router.push('/slide/create')"
          variant="info"
        >Create</b-button>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(slide , index) in slides" :key="index">
              <td>{{index+1}}</td>
              <td>{{slide.name}}</td>
              <td>
                <img
                  style="width:100px; height:60px"
                  :src="`/${slide.slide_images? slide.slide_images.default_image: ''}`"
                />
              </td>
              <td>
                <b-button @click="handleDelete(slide.id)" variant="danger">Delete</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Slide" },
  components: {
    adminNav,
    admin
  },
  mounted() {
    this.getSlides();
  },
  data() {
    return {
      slides: [],
      totalResult: 0,
      pagination: {
        currentPage: 1,
        perPage: 10
      },
      cancel: false
    };
  },
  methods: {
    getSlides() {
      let self = this;
      this.$axios.get("/slide").then(function(res) {
        console.log(res);
        self.slides = res.data.rows;
      });
    },
    handleDelete(id) {
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
            this.$swal.fire("Xóa!", "Bạn xóa sản phẩm thành công!.", "success");
            let self = this;
            this.$axios.delete("/slide/" + id).then(function(res) {
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