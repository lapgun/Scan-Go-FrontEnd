<template>
  <div class="create-form">
    <input v-model="form.name" type="text" class="form-control" placeholder="Enter your cat name" />
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
  mounted: function() {
    this.getDetail();
  },
  data: function() {
    return {
      form: {
        name: "",
        cat_parent: ""
      }
    };
  },
  methods: {
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
