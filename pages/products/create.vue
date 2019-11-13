<template>
  <div class="container">
    <h1>Thêm mới sản Phẩm</h1>
    <input
      v-model="form.name"
      type="text"
      class="form-control"
      placeholder="Enter your product's name "
    />
    Select product's category in the select form below :
    <b-form-select v-model="form.categoriesId" :options="options"></b-form-select>
        <input type="file" id="file" ref="picture" v-on:change="handleFileUpload()" />

    <upload_files></upload_files>
    <input
      v-model="form.price"
      type="text"
      class="form-control"
      placeholder="Enter your product price"
    />
    <input
      v-model="form.description"
      type="text"
      class="form-control"
      placeholder="Enter your product description"
    />
    <input
      v-model="form.detail"
      type="text"
      class="form-control"
      placeholder="Enter your product detail"
    />
    <input
      v-model="form.order_time"
      type="text"
      class="form-control"
      placeholder="Enter your product order_time"
    />
    <br/>
    <label>
      <button class="btn btn-info" @click="handleSubmit">Submit</button>
    </label>
  </div>
</template>
<script>
    import upload_files from "../../components/upload_files";

    export default {
        components: {
            upload_files
        },
        mounted: function () {
            this.getCatProduct();
        },
        data: function () {
            return {
                form: {
                    name: "",
                    categoriesId: "",
                    picture: "",
                    price: "",
                    description: "",
                    detail: "",
                    order_time: ""
                },
                options: [{value: 0, text: "This is parent category "}]
            };
        },
        methods: {
            getCatProduct: function () {
                let self = this;
                this.$axios.get("/categories/cat_product").then(function (res) {
                    let data = res.data.data.rows;
                    data.forEach(value => {
                        self.options.push({
                            value: value.id,
                            text: value.name
                        });
                    });
                });
                console.log(self.options);
            },
            handleSubmit() {
                let formData = new FormData();
                formData.append("picture", this.picture);
                formData.append("name", this.form.name);
                formData.append("price", this.form.price);
                formData.append("description", this.form.description);
                formData.append("detail", this.form.detail);
                formData.append("order_time", this.form.order_time);
                let self = this;
                this.$axios
                    .post("/products/create", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(function (res) {
                        self.$router.push("/products");
                    });
            },
            handleFileUpload() {
                this.picture = this.$refs.picture.files[0];
            }
        }
    };
</script>
