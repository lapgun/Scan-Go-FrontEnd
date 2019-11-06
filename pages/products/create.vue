<template>
  <div class="create-form">
    <b-button variant="success" @click="$router.push('/task')">User</b-button>
    <b-button variant="success" @click="$router.push('/blog')">Blog</b-button>
    <b-button variant="success" @click="$router.push('/task/login')">Login</b-button>
    <input v-model="form.name" type="text" class="form-control" placeholder="Enter your product name " />
    <input v-model="form.categoriesId" type="text" class="form-control" placeholder="Enter your product categoriesId"/>
    <input v-model="form.picture" type="text" class="form-control" placeholder="Enter your product picture"/>
    <input v-model="form.price" type="text" class="form-control" placeholder="Enter your product price"/>
    <input v-model="form.description" type="text" class="form-control" placeholder="Enter your product description"/>
    <input v-model="form.detail" type="text" class="form-control" placeholder="Enter your product detail"/>
    <input v-model="form.order_time" type="text" class="form-control" placeholder="Enter your product order_time"/>
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
        picture:"",
        price:"",
        description:"",
        detail:"",
        order_time:"",
      }
    };
  },
  methods: {
    handleSubmit: function() {
      let self = this;
      this.$axios.post("/products", this.form).then(function(res) {
        self.$router.push("/products");
      });
    }
  }
};
</script>
