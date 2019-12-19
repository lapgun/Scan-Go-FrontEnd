<template>
  <div class="container">
    <h1>Chỉnh Sửa thông tin</h1>
    <br />Name:
    <input
      v-model="form.name"
      type="text"
      class="form-control"
      placeholder="Enter your product's name "
    />
    Select product's category in the select form below :
    <b-form-select v-model="form.categoriesId" :options="options"></b-form-select>Picture:
    <input
      v-model="form.picture"
      type="text"
      class="form-control"
      placeholder="Enter your product picture"
    />
    Prices:
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
      placeholder="Enter your product description"
    ></vue-ckeditor>
    <br />
    <label>
      <button class="btn btn-info" @click="handleSubmit">Submit</button>
    </label>
  </div>
</template>

<script>
export default {
  head: { title: "Chỉnh sủa chi tiết sản phẩm" },
  mounted() {
    this.getDetail();
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
        detail: ""
      },
      options: [{ value: 0, text: "This is parent category " }]
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
    getDetail() {
      let self = this;
      this.$axios.get("/products/" + this.$route.params.id).then(function(res) {
        self.form = res.data.data;
      });
    },
    handleSubmit() {
      this.$swal.fire("Yes...", "Cập nhật sản phẩm thành công!", "success");
      let self = this;
      this.$axios
        .put("/products/" + this.form.id, this.form)
        .then(function(res) {
          self.$router.push("/products");
        });
    }
  }
};
</script>
