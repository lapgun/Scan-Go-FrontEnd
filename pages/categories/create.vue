<template>
  <div class="create-form">
    <b-button variant="success" @click="$router.push('/task')">User</b-button>
    <b-button variant="success" @click="$router.push('/blog')">Blog</b-button>
    <b-button variant="success" @click="$router.push('/task/login')">Login</b-button>
    <input v-model="form.name" type="text" class="form-control" placeholder="Enter your cat name " />
    <b-form-select v-model="form.cat_parent" :options="options"></b-form-select>
    <br />
    <label>
      <button class="btn btn-info" @click="handleSubmit">Submit</button>
    </label>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.getCategories();
  },
  data: function() {
    return {
      form: {
        name: "",
        cat_parent: ""
      },
      options: [ 
        {value: 0, text: "This is parent category "} 
        ]
    };
  },
  methods: {
    getCategories: function() {
      let self = this;
      this.$axios.get("/categories/cat_parent").then(function(res) {
        let data = res.data.data.rows;
        data.forEach(value => {
          self.options.push({
            value: value.id,
            text: value.name
          });
        });
      });
      console.log(self.options)
    },
    handleSubmit: function() {
      let self = this;
      this.$axios.post("/categories", this.form).then(function(res) {
        self.$router.push("/categories");
      });
    }
  }
};
</script>
