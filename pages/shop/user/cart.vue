<template>
  <div>
    <shopHeader />
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <shopUser />
        </div>
        <div class="col-sm-9">
          <div class="card">
            
          </div>
        </div>
      </div>
    </div>
    <shopFooter />
  </div>
</template>
<script>
import shopHeader from "~/components/shopHeader.vue";
import shopFooter from "~/components/shopFooter.vue";
import shopUser from "~/components/shopUser.vue";
export default {
  components: {
    shopHeader,
    shopFooter,
    shopUser
  },
  mounted: function() {
    this.getUsers();
  },
  data: function() {
    return {
      users: []
    };
  },
  methods: {
    getUsers: function() {
      let self = this;
      this.$axios.get("/users/" + this.$route.params.id).then(function(res) {
        self.users = res.data.data;
      });
    }
  }
};
</script>