<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div class="col-sm-8 col-lg-10 sidebar">
        <div class="create-form">
          <br />
          <label>Please select your cat's name</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Enter your cat name "
          />
          <label>Please select your cat's parent</label>
          <b-form-select
            v-model="form.cat_parent"
            @change="getCatName(form.cat_parent)"
            :options="options"
          ></b-form-select>
          <br />
          <label>
            <button class="btn btn-info" @click="handleSubmit">Submit</button>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Tạo thể loại" },
  components: {
    adminNav,
    admin
  },
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      form: {
        name: "",
        cat_parent: "",
        cat_parent_name: ""
      },
      options: [{ value: 0, text: "This is parent category " }]
    };
  },
  methods: {
    getCategories() {
      let self = this;
      let id = 0;
      this.$axios.get("/categories/cat_parent/" + id).then(function(res) {
        let data = res.data.data.rows;
        data.forEach(value => {
          self.options.push({
            value: value.id,
            text: value.name
          });
        });
      });
    },
    getCatName(id) {
      this.$axios.get("/categories/" + id).then(res => {
        this.form.cat_parent_name = res.data.data.name;
      });
    },
    handleSubmit() {
      // this.$swal.fire("Yes...", "Tạo thể loại thành công!", "success");
      let self = this;

      this.$axios.post("/categories", this.form).then(function(res) {
        if (res.data.error) {
          self.$swal.fire("Failled", res.data.message, "error");
        } else {
          self.$swal.fire("Success", res.data.message, "true");
          self.$router.push("/categories");
        }
      });
    }
  }
};
</script>
