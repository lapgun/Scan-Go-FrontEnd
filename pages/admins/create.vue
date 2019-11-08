<template>
  <div id="app">
    <form style="margin-left:600px; width:1000px" method="post" action>
      <b-row>
        <b-col cols="8">
          <div class="login-panel panel panel-default">
            <div class="panel-heading">Register</div>
            <div class="panel-body">
              Username
              <div class="form-group">
                <input
                  class="form-control"
                  required
                  placeholder="Please enter your name...."
                  v-model="form.name"
                  type="text"
                />
              </div>Email
              <div class="form-group">
                <input
                  class="form-control"
                  placeholder="Please enter your email...."
                  v-model="form.email"
                  type="email"
                  name="email"
                />
              </div>Password
              <div class="form-group">
                <input
                  class="form-control"
                  required
                  placeholder="Password"
                  v-model="form.password"
                  type="password"
                />
              </div>Type your password agian
              <div class="form-group">
                <input
                  class="form-control"
                  required
                  placeholder="Password"
                  v-model="form.password1"
                  type="password"
                />
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="1" />Are you an admin ?
                </label>
              </div>
              <b-button variant="info" @click="handleCreate">Register</b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </form>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      form: {
        name: "",
        password: "",
        password1: "",
        email: "",
        role: false
      }
    };
  },
  methods: {
    handleCreate: function() {
      let self = this;
      this.$axios
        .post("/admins", this.form, {
          headers: {
            token: this.$store.state.token
          }
        })
        .then(function(res) {
          console.log(res);
          self.$router.push("/admins/home");
        });
    }
  }
};
</script>