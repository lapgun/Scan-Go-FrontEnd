<template>
  <div id="login">
    <h3 class="text-center text-white pt-5">Register</h3>
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <h3 class="text-center text-info">Register</h3>
            <div class="form-group">
              <label for="username" class="text-info">Username:</label>
              <br />
              <input type="text" v-model="user.name" id="username" class="form-control" />
            </div>
            <div class="form-group">
              <label for="email" class="text-info">Email:</label>
              <br />
              <input type="email" v-model="user.email" id="email" class="form-control" />
            </div>
            <div class="form-group">
              <label for="password" class="text-info">Password:</label>
              <br />
              <input type="password" v-model="user.password" id="password" class="form-control" />
            </div>
            <div class="form-group">
              <label for="address" class="text-info">Address:</label>
              <br />
              <input type="text" v-model="user.address" id="address" class="form-control" />
            </div>
            <div class="form-group text-xl-center">
              <input type="submit" @click="handelSubmit" class="btn btn-info btn-md" value="submit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        address: ""
      }
    };
  },
  methods: {
    handelSubmit() {
      let self = this;
      this.$axios
        .post("http://127.0.0.1:4000/users", this.user)
        .then(function(res) {
          console.log(res);
          self.$router.push("/user/login");
        });
    }
  }
};
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #17a2b8;
  height: 150vh;
}
#login .container #login-row #login-column #login-box {
  margin-top: 120px;
  max-width: 600px;
  height: 480px;
  border: 1px solid #9c9c9c;
  background-color: #eaeaea;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login
  .container
  #login-row
  #login-column
  #login-box
  #login-form
  #register-link {
  margin-top: -85px;
}
</style>
