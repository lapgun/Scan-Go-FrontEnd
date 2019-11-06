<template>
  <div class="create-form">
    <b-button variant="success" @click="$router.push('/task')">User</b-button>
    <b-button variant="success" @click="$router.push('/blog')">Blog</b-button>
    <b-button variant="success" @click="$router.push('/task/login')">Login</b-button>
    <input v-model="form.name" type="text" class="form-control" placeholder="Enter your cat name " />
    <input
      v-model="form.cat_parent"
      type="number"
      class="form-control"
      placeholder="Enter your cat parent"
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
        cat_parent: ""
      }
    };
  },
  methods: {
    handleSubmit: function() {
      let self = this;
      this.$axios.post("/categories", this.form).then(function(res) {
        self.$router.push("/categories");
      });
    }
  }
};
</script>
