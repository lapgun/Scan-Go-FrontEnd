<template>
  <div>
    <header id="header">
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
                      >Register</a>
                    </li>
                    <li>
                      <a @click="$router.push('/login')" style=" margin-top:-20px">Login</a>
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
                    <a @click="$router.push('/')" class="active">Trang chủ</a>
                  </li>
                  <li>
                    <a @click="$router.push('/shop/products')">Sản Phẩm</a>
                  </li>
                  <li>
                    <a @click="$router.push('/shop/blog')">Blog</a>
                  </li>
                  <li>
                    <a @click="$router.push('/shop/contact')">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-sm-3" style="margin-top:-20px">
              <div class="search_box" style="display:inline; margin-right:30px">
                <input v-model="search" @change="handleSearch" placeholder="Search" />
              </div>
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
                        <div
                          class="text-md-center checkout-preview-dropdown__empty p-7"
                          style="min-width: 250px; height:100px"
                        >
                          <span
                            class="d-block font-weight-bold"
                            style="margin-top:80px"
                          >Chưa có sản phẩm</span>
                          <span class="btn btn-icon btn-soft-primary rounded-circle mb-3">
                            <span class="fas fa-shopping-basket btn-icon__inner"></span>
                          </span>
                        </div>
                      </template>
                    </b-dropdown-item>
                    <b-dropdown-item v-else>
                      <template>
                        <div>
                          <span style="font-size:20px;margin-right:50px">Giỏ hàng của bạn</span>
                          <span>{{cart.length}} sản phẩm</span>
                        </div>
                        <div style="border: 1px solid #c1bbbb ; margin-top:15px"></div>
                        <div style="margin-top:15px" v-for="(item,index) in cart" :key="index">
                          <img
                            style="width:70px; height:70px"
                            :src="`/${item.images? item.images.default_image: ''}`"
                          />
                          <span style="width:30px !important">{{item.name}}</span>
                          <span>{{item.price}} đ</span>
                        </div>
                        <div style="border: 1px solid #c1bbbb ; margin-top:15px; margin-bottom:15px"></div>
                        <div>
                          <span style="font-size:20px">Tạm tính</span>
                          <span>{{total}} đ</span>
                        </div>
                        <div style="font-size:12px; margin-top:10px">(Phí vận chuyển và thuế sẽ được tính lúc thanh toán.) </div>
                        <div style="border: 1px solid #c1bbbb ; margin-top:15px; margin-bottom:15px"></div>
                        <div>
                          <a style="border: 1px solid #c1bbbb ; padding:10px 15px; width:100px; height:40px" href="#" @click="$router.push('/shop/cart')">Đến giỏ hàng</a>
                          <a style="border: 1px solid #c1bbbb ;padding:10px 15px; width:100px; height:40px; float:right" href="#" @click="$router.push('/shop/checkout')">Mua ngay</a>
                        </div>
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
    <!--/header-->
    <section id="slider">
      <!--slider-->
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <b-carousel
              id="carousel"
              v-model="slide"
              :indicator="1110"
              controls
              @sliding-start="onSlileStart"
              @sliding-end="onSlileEnd"
              :visible-slides="3"
              :slide-ratio="1/4"
            >
              <div v-for="slide in slides" :key="slide.id">
                <b-carousel-slide
                  :img-src="`/${slide.slide_images ? slide.slide_images.default_image : ''}`"
                ></b-carousel-slide>
              </div>
            </b-carousel>
          </div>
        </div>
      </div>
    </section>
    <!--/slider-->
  </div>
</template>
<script>
const Cookies = process.client ? require("js-cookie") : undefined;
export default {
  created() {
    if (process.browser) {
      if (localStorage.getItem("cart")) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        return (this.cart = cart);
      } else {
        let cart = this.$store.getters.cart;
        return (this.cart = cart);
        console.log(this.cart);
      }
    }
  },
  mounted() {
    if (this.$store.state.token) {
      this.getUsers();
    } else {
      this.$router.push("/");
    }
    this.getSlides();
     this.totalPrice();
  },
  data() {
    return {
      cart: [],
      users: [],
      user_id: "",
      user_name: "",
      search: "",
      slide: 0,
      sliding: null,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      slides: [],
      total: 0,
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
  mounted() {
    if (this.$store.state.token) {
      this.getUsers();
    } else {
      this.$router.push("/");
    }
    this.getSlides();
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
    },
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].price * this.cart[i].order_time;
        this.total = total;
      }
    },
    onSlileStart(slide) {
      this.sliding = true;
    },
    onSlileEnd(slide) {
      this.sliding = false;
    },
    getSlides() {
      let self = this;
      this.$axios.get("/slide").then(function(res) {
        self.slides = res.data.rows;
      });
    }
  }
};
</script>
<style scoped>
</style>
