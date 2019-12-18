<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-8 col-lg-10 sidebar" style="margin-top:40px">
        <h1>Thêm mới slide</h1>Name:
        <input style="width:50%"
          v-model="form.name"
          type="text"
          class="form-control"
          placeholder="Enter your product's name "
        />
        <upload_files @uploaded="imageUploaded" style="margin-right:385px; margin-top:10px"></upload_files>
        <b-button @click="handleSubmit">Submit</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import upload_files from "../../components/upload_files";
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Tạo slide" },
  components: {
    upload_files,
    admin,
    adminNav
  },
  data() {
    return {
      form: {
        name: "",
        image: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      // this.$swal.fire('Yes...', 'Tạo slide thành công!', 'success')
      let self = this;
      this.$axios.post("/slide", this.form).then(function(res) {
        if (res.data.error) {
          self.$swal.fire("Failled", res.data.message, "Error");
        } else {
          self.$swal.fire("Success!!", res.data.message, "success");
          self.$router.push("/slide");
        }
      });
    },
    imageUploaded(data = {}) {
      this.form.image = data.productImageInfo ? data.productImageInfo.id : null;
    }
  }
};
</script>
<style scoped>
div input {
  padding-top: 10px;
}
</style>
