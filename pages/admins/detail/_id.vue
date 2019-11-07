<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Password</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{admins.id}}</td>
          <td>{{admins.name}}</td>
          <td>{{admins.password}}</td>
          <td>{{admins.email}}</td>
          <td>{{admins.role == 1 ? 'admin' : 'user'}}</td>
        </tr>
      </tbody>
    </table>
    <b-button variant="info" @click="$router.push('/admins')">Oder_details</b-button>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.getAdmins();
  },
  data: function() {
    return {
      admins: {
        id: "",
        name: "",
        password: "",
        email: "",
        role: false
      }
    };
  },
  methods: {
    getAdmins: function() {
      let self = this;
      this.$axios.get("/admins/" + this.$route.params.id).then(function(res) {
        console.log(res);
        self.admins = res.data;
      });
    }
  }
};
</script>