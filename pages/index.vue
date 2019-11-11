<template>
  <div>
  <div class="container" >
    <b-navbar toggleable="lg" type="dark"   variant="info">
      <b-navbar-brand href="#">Home</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown href="#">
            <template v-slot:button-content >
              <em>Categories</em>
            </template>
            <b-dropdown-item>Thực Phẩm</b-dropdown-item>
            <b-dropdown-item>Thực Phẩm</b-dropdown-item>
            <b-dropdown-item>Thực Phẩm</b-dropdown-item>
            <b-dropdown-item>Thực Phẩm</b-dropdown-item>
            <b-dropdown-item>Thực Phẩm</b-dropdown-item>
            <b-dropdown-item>Thực Phẩm</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
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
  <div class="container">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
<!--end slide-->
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    handelSigOut() {
      Cookie.remove("token");
      this.$store.commit("setToken", null);
      this.$store.commit("setUser", null);
    }
  }
};
</script>
<style>
  /*#sile {*/
  /*  height: 250px;*/
  /*}*/
</style>

