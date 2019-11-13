<template>
  <div>
    <div class="container">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Home</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown href="#">
              <template v-slot:button-content>
                <em>Categories</em>
              </template>
              <b-dropdown-item>Thực Phẩm</b-dropdown-item>
              <b-dropdown-item>Thực Phẩm</b-dropdown-item>
              <b-dropdown-item>Thực Phẩm</b-dropdown-item>
              <b-dropdown-item>Thực Phẩm</b-dropdown-item>
              <b-dropdown-item>Thực Phẩm</b-dropdown-item>
              <b-dropdown-item>Thực Phẩm</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav >
          <b-navbar-nav class="ml-auto" >
            <b-nav-form id="form-menu">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
            <b-nav-item-dropdown v-if="user">
              <template v-slot:button-content>
                <em>{{user.name}}</em>
              </template>
              <b-dropdown-item @click="$router.push('user/detail')">Profile</b-dropdown-item>
              <b-dropdown-item href="#" @click="handelSigOut">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item @click="$router.push('user/login')" v-else>Login</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!--  end header-->

    <!--  slide-->
    <!-- <div class="container" id="slide">
      <slide_show ></slide_show>
    </div> -->
    <!--end slide-->
  </div>
</template>
<script>
    // import slide_show from "../components/slide_show";
    const Cookies = process.client ? require("js-cookie") : undefined;
    export default {
        // components: {
        //     slide_show
        // },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
            handelSigOut() {
                Cookies.remove("setToken");
                Cookies.remove("setUser");
                this.$store.commit("setToken", null);
                this.$store.commit("setUser", null);
            }
        }
    };
</script>
<style scoped>
  #slide{
    width: 1138px;
    margin-top: -18px;
    height: 300px;
  }
  #form-menu{
    margin-left: 565px;
  }
</style>