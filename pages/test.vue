<template>
  <div>
    <h1>Login</h1>
    <facebook-login
      class="button"
      appId="470676757178545"
      @login="getUserData"
      @get-initial-status="getUserData"
    ></facebook-login>
  </div>
</template>
 <script>
const Cookie = process.client ? require("js-cookie") : undefined;
import Vue from "vue";
import facebookLogin from "facebook-login-vuejs";
export default {
  components: {
    facebookLogin
  },
  data() {
    return {
      user: {
        id: "",
        name: "",
        email: ""
      }
    };
  },
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      window.fbAsyncInit = function() {
        FB.init({
          appId: "470676757178545",
          cookie: true,
          xfbml: true,
          version: "v5.0"
        });
        FB.AppEvents.logPageView();
        _this.FB = FB;
      };
      (function(d, s, id) {
        let js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    });
  },
  methods: {
    getUserData() {
      let self = this;
      this.FB.api(
        "/me",
        "GET",
        { fields: "id, name,email" },
        user => {
          this.user = user;
          setTimeout(() => {
            this.getLoginfb();
            this.$router.push("/");
          }, 1000);
          setTimeout(() => {
            this.getFacebook();
          }, 2000);
        }
      );
    },
    getLoginfb() {
      let self = this;
      this.$axios.post("/loginfb", this.user).then(function(res) {});
    },
    getFacebook() {
      let self = this;
      this.$axios
        .post("/loginFacebook", this.user, {
          headers: {
            token: this.$store.state.token
          }
        })
        .then(function(res) {
          self.$store.commit("setToken", res.data.token);
          Cookie.set("token", res.data.token);
          self.$router.push("/");
        });
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    }
  }
};
</script>
