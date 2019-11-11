
<template>
  <div class="create-form">
    <b-button variant="success" @click="$router.push('/task')">User</b-button>
    <b-button variant="success" @click="$router.push('/blog')">Blog</b-button>
    <b-button variant="success" @click="$router.push('/task/login')">Login</b-button>
    <br />
    <br />
    <br />Name:
    <input
      v-model="form.name"
      type="text"
      class="form-control"
      placeholder="Enter your product's name "
    />
    <input
      v-model="form.categoriesId"
      type="text"
      class="form-control"
      placeholder="Enter your product's categories ";
    />
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
    <br />
    <label>
      <button class="btn btn-info" @click="handleSubmit">Submit</button>
    </label>
  </div>
</template>
<script>
    export default {
        data: function() {
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

            };
        },
        methods: {

            handleSubmit() {
                let formData = new FormData();
                // formData.append('form',this.form);
                formData.append('picture', this.picture);
                formData.append('name', this.form.name);
                formData.append('price', this.form.price);
                formData.append('description', this.form.description);
                formData.append('detail', this.form.detail);
                formData.append('order_time', this.form.order_time);

                let self = this;
                this.$axios
                    .post("/products/create" , formData , {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(function(res) {
                        console.log(res)
                        self.$router.push("/products");
                    });
            },
            handleFileUpload(){
                this.picture = this.$refs.picture.files[0];
            }
        }
    };
</script>
