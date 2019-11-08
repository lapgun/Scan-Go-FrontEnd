<template>
  <div class="create-form">
    <b-button variant="success" @click="$router.push('/task')">User</b-button>
    <b-button variant="success" @click="$router.push('/blog')">Blog</b-button>

    <br />
    <br />
    <br />Name:
    <input
      v-model="form.name"
      type="text"
      class="form-control"
      placeholder="Enter your cat name "
    />
    Select category's parent in the select form below :
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
    this.getDetail();
    this.getCategories();
  },
  data: function() {
    return {
      form: {
        name: "",
        cat_parent: ""
      },
      options: [{ value: 0, text: "This is parent category " }]
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
    },
    getDetail: function() {
      let self = this;

      this.$axios
        .get("/categories/" + this.$route.params.id)
        .then(function(res) {
          self.form = res.data.data;
        });
    },
    handleSubmit: function() {
      let self = this;

      this.$axios
        .put("/categories/" + this.form.id, this.form)
        .then(function(res) {
          self.$router.push("/categories");
        });
    }
  }
};
</script>
