<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-8 col-lg-10 sidebar" style="margin-top:40px">
        <h1>Thêm mới sản Phẩm</h1>Name:
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          placeholder="Enter your product's name "
        />
        <h5 style="margin-top:20px">Product's category in the select form below :</h5>
        <b-form-select v-model="form.categoriesId" :options="options" style="width:60%"></b-form-select>
        <upload_files @uploaded="imageUploaded" style="float:left; margin-top:10px"></upload_files>
        <h5 style="margin-top:50px">Price:</h5>
        <input
          v-model="form.price"
          type="text"
          class="form-control"
          placeholder="Enter your product price"
        />
        Description:
        <vue-ckeditor
          type="classic"
          v-model="form.description"
          class="form-control"
          placeholder="Enter your product description"
        ></vue-ckeditor>Detail:
        <vue-ckeditor
          type="classic"
          v-model="form.detail"
          class="form-control"
          placeholder="Enter your product detail"
        ></vue-ckeditor>
        <br />
        <label>
          <button class="btn btn-info" @click="handleSubmit">Submit</button>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import upload_files from "../../components/upload_files";
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Tạo sản phẩm" },
  components: {
    upload_files,
    admin,
    adminNav
  },
  mounted() {
    this.getCatProduct();
  },
  data() {
    return {
      form: {
        name: "",
        categoriesId: "",
        picture: "",
        price: "",
        description: "",
        detail: "",
        order_time: 0
      },
      options: []
    };
  },
  methods: {
    getCatProduct() {
      let self = this;
      this.$axios.get("/categories/cat_product").then(function(res) {
        let data = res.data.data.rows;
        data.forEach(value => {
          self.options.push({
            value: value.id,
            text: value.name
          });
        });
      });
    },
    handleSubmit() {
      let self = this;
      this.$axios.post("/products", this.form).then(res => {
        if (res.data.error) {
          self.$swal.fire("Failed", res.data.message, "error");
        } else {
          self.$swal.fire("Success!!", res.data.message, "success");
          self.$router.push("/products");
        }
      });
    },
    imageUploaded(data = {}) {
      this.form.picture = data.productImageInfo
        ? data.productImageInfo.id
        : null;
    }
  }
};
</script>
<style scoped>
div input {
  padding-top: 10px;
}
.form-control {
  width: 60%;
}
</style>