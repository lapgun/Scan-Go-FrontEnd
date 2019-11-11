<template>
  <div class="create-form">
    <b-button variant="success" @click="$router.push('/task')">User</b-button>
    <b-button variant="success" @click="$router.push('/blog')">Blog</b-button>
    <b-button variant="success" @click="$router.push('/task/login')">Login</b-button>
    <br/>
    <br/>
    <br/>Name:
    <input
      v-model="form.name"
      type="text"
      class="form-control"
      placeholder="Enter your product's name "
    />
    Select product's category in the select form below :
    <b-form-select v-model="form.categoriesId" ></b-form-select>
    <input type="file" id="file" ref="picture" v-on:change="handleFileUpload()"/>

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
    export default {
        // mounted: function () {
        //     this.getCatProduct();
        // },
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
                // options: [{value: 0, text: "This is parent category "}]
            };
        },
        methods: {
            // getCatProduct: function () {
            //     let self = this;
            //     this.$axios.get("/categories/cat_product").then(function (res) {
            //         let data = res.data.data.rows;
            //         data.forEach(value => {
            //             self.options.push({
            //                 value: value.id,
            //                 text: value.name
            //             });
            //         });
            //     });
            //     console.log(self.options);
            // },
            handleSubmit: function () {
                let formData = new FormData();

                formData.append('name', this.form.name);
                formData.append('categoriesId', this.form.categoriesId);
                formData.append('price', this.form.price);
                formData.append('description', this.form.description);
                formData.append('detail', this.form.detail);
                formData.append('order_price', this.form.order_price);
                formData.append('picture', this.form.picture);
                let self = this;
                this.$axios.post("/products/create",formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(function (res) {
                        console.log('kjjkj',res);
                        self.$router.push("/products");
                    });
            },
            handleFileUpload() {
                this.form.picture = this.$refs.picture.files[0];

            }
        }
    };
</script>
