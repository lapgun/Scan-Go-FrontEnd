<template>
  <div>
    <adminNav />
    <div>
       <admin />
      <div class="col-sm-8 col-lg-10 sidebar" style="margin-top:40px">
        <div class="create-form">
          <label>Name</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Enter your cat name "
          />
          <label>Select category's parent in the select form below :</label>
          <b-form-select
            v-model="form.cat_parent"
            @change="getCatName(form.cat_parent)"
            :options="options"
          ></b-form-select>
          <br />
          <label>
            <button class="btn btn-info" @click="handleSubmit" style="margin-top:20px">Submit</button>
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
  head: { title: "Sửa thể loại" },
  mounted() {
    this.getDetail();
    this.getCategories();
  },
  components: {
    adminNav,
    admin
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
      this.$axios.get("/categories/cat_parent/0").then(function(res) {
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
    getDetail() {
      let self = this;
      this.$axios
        .get("/categories/" + this.$route.params.id)
        .then(function(res) {
          self.form = res.data.data;
        });
    },
    handleSubmit() {
      this.$swal.fire("Yes", "Cập nhật thể loại thành công!", "success");
      let self = this;
      this.$axios
        .put("/categories/" + this.form.id, this.form)
        .then(function(res) {
          self.$router.push("/categories");
        });
    },
    handleLogout() {
      Cookie.remove("token");
      this.$store.commit("setToken", null);
      this.$router.push("/login");
    }
  }
};
</script>
