<template>
  <div class="container">
    <h1>Chỉnh Sửa thông tin</h1>
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
    <b-form-select v-model="form.categoriesId" :options="options"></b-form-select>
    Picture:
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
     <vue-ckeditor type="classic" v-model="form.description" :editors="editors" class="form-control"
                placeholder="Enter your product description"></vue-ckeditor>
    Detail:
    <vue-ckeditor type="classic" v-model="form.detail" :editors="editors" class="form-control"
                placeholder="Enter your product description"></vue-ckeditor>
    Oder time:
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
import Vue from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'
    export default {
      components: {
            'vue-ckeditor': VueCkeditor.component
        },
        mounted: function () {
            this.getDetail();
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
                    order_time: "",
                    
                },
                options: [{value: 0, text: "This is parent category "}],
                editors: {
                    classic: ClassicEditor
                }
            }        
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
            getDetail: function () {
                let self = this;

                this.$axios.get("/products/" + this.$route.params.id).then(function (res) {
                    self.form = res.data.data;
                });
            },
            handleSubmit: function () {
                let self = this;

                this.$axios
                    .put("/products/" + this.form.id, this.form)
                    .then(function (res) {
                        self.$router.push("/products");
                    });
            }
        }
    };
</script>
