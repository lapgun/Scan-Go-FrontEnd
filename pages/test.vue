<template>
  <div>
    <header id="header">
      <!--header-->
      <div class="header_top" style="height:60px">
        <!--header_top-->
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <div class="contactinfo">
                <ul class="nav nav-pills">
                  <li>
                    <a href="#">+2 95 01 88 821</a>
                  </li>
                  <li>
                    <a href="#">nguyenthila@gmail.com</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="social-icons pull-right">
                <ul style="margin-top:15px">
                  <li>
                    <a href="#">
                      <i class="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fab fa-dribbble"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fab fa-google-plus"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/header_top-->

      <div class="header-middle">
        <!--header-middle-->
        <div class="container">
          <div class="row">
            <div class="col-sm-4">
              <div class="logo pull-left">
                <a @click="$router.push('/')">
                  <img src="~assets/images/home/logo.png" alt />
                </a>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="shop-menu pull-right">
                <ul class="nav navbar-nav">
                  <li>
                    <a
                      @click="$router.push('/shop/checkout')"
                      style="margin-left: -150px; margin-top:10px"
                    >Thanh toán</a>
                  </li>
                  <template v-if="user_id">
                    <li>
                      <a style="margin-left:-71px ; margin-top: -20px" class="dropdown">
                        <div
                          class="dropdown-toggle"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i class="fas fa-user">&nbsp;{{user_name}}</i>
                        </div>
                        <div
                          class="dropdown-menu text-sm-center"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a class="dropdown-item" @click="handelLogout">
                            <i class="fas fa-sign-out-alt">&nbsp;Đăng xuất</i>
                          </a>
                          <a
                            class="dropdown-item"
                            href="#"
                            @click="$router.push('/shop/user/detail/'+user_id)"
                          >Tài khoản</a>
                        </div>
                      </a>
                    </li>
                  </template>
                  <template v-else>
                    <li>
                      <a
                        @click="$router.push('/register')"
                        style="margin-left:-70px; margin-top:-20px"
                      >Đăng kí</a>
                    </li>
                    <li>
                      <a @click="$router.push('/login')" style=" margin-top:-20px">Đăng nhập</a>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/header-middle-->
      <div class="header-bottom">
        <!--header-bottom-->
        <div class="container">
          <div class="row">
            <div class="col-sm-9">
              <div class="mainmenu pull-left">
                <ul class="nav navbar-nav collapse navbar-collapse">
                  <li>
                    <a @click="$router.push('/')" class="active" style="margin-top:-2px">Trang chủ</a>
                  </li>
                  <li class="dropdown">
                    <a href="#" style="margin-top:-10px">Cửa hàng</a>
                    <ul role="menu" class="sub-menu">
                      <li>
                        <a @click="$router.push('/shop/products')">Sản phẩm</a>
                      </li>
                      <li>
                        <a @click="$router.push('/shop/checkout')">Thanh toán</a>
                      </li>
                      <li>
                        <a @click="$router.push('/shop/cart')">Giỏ hàng</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a @click="$router.push('/shop/blog')">Blog</a>
                  </li>
                  <li>
                    <a @click="$router.push('/shop/contact')">Liên hệ</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-sm-3" style="margin-top:-20px">
              <div style="display:inline-block; font-size:25px;" v-if="user_id">
                <div>
                  <b-dropdown>
                    <template v-slot:button-content>
                      <a>
                        <i class="fas fa-shopping-cart"></i>
                        {{cart.length}}
                      </a>
                    </template>
                    <b-dropdown-item v-if="cart.length == 0">
                      <template>
                        
                      </template>
                    </b-dropdown-item>
                     <b-dropdown-item v-else>
                       <template>

                       </template>
                     </b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/header-bottom-->
    </header>
  </div>
</template>
<script>
const Cookies = process.client ? require("js-cookie") : undefined;
export default {
  mounted() {
    if (this.$store.state.token) {
      this.getUsers();
    } else {
      this.$router.push("/");
    }
  },
  data() {
    return {
      cart: [],
      users: [],
      user_id: "",
      user_name: "",
      search: ""
    };
  },
  created() {
    if (process.browser) {
      if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        return (this.cart = cart);
      } else {
        let cart = this.$store.getters.cart;
        return (this.cart = cart);
      }
    }
  },
  methods: {
    getUsers() {
      let self = this;
      this.$axios.get("/users").then(function(res) {
        self.user_id = res.data.decoded.user_id;
        self.user_name = res.data.decoded.user_name;
        self.users = res.data.data;
      });
    },
    handelLogout() {
      Cookies.remove("token");
      localStorage.removeItem("cart");
      this.$store.commit("setToken", null);
      this.$store.commit("setCart", []);
      this.$router.push("/login");
    },
    handleSearch() {
      let self = this;
      this.$axios
        .get("/products/search?search=" + this.search)
        .then(function(res) {
          self.products = res.data.data;
          self.$emit("products", self.products);
          self.$router.push("/shop/products?search=" + self.search);
        });
    }
  }
};
</script>
<style scoped>
</style>
