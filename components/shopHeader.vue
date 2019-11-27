<template>
  <div>
    <header id="header"><!--header-->
      <div class="header_top" style="height:60px"><!--header_top-->
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
                  <li><a @click="$router.push('/user/detail/'+user_id)" style="margin-left:-220px"> Account</a></li>
                  <li><a @click="$router.push('/shop/checkout/'+user_id)" style="margin-left: -150px; margin-top:-20px">Checkout</a>
                  </li>
                  <template v-if="user_id">
                    <li><a style="margin-left:-71px ; margin-top: -20px" class="dropdown">
                      <div class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false">
                        <i class="fas fa-user">&nbsp;{{user_name}}</i>
                      </div>
                      <div class="dropdown-menu text-sm-center" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" @click="handelLogout"><i class="fas fa-sign-out-alt">&nbsp;Log out</i></a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </a>
                    </li>
                  </template>
                  <template v-else>
                    <li><a @click="$router.push('/register')" style="margin-left:-70px; margin-top:-20px"> Register</a>
                    </li>
                    <li><a @click="$router.push('/login')" style=" margin-top:-20px">Login</a></li>
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
                  <li><a @click="$router.push('/')" class="active" style="margin-top:-2px">Home</a></li>
                  <li class="dropdown"><a href="#" style="margin-top:-10px">Shop</a>
                    <ul role="menu" class="sub-menu">
                      <li><a @click="$router.push('/shop/product')">Products</a></li>
                      <li><a @click="$router.push('/shop/checkout/'+user_id)">Checkout</a></li>
                      <li><a @click="$router.push('/shop/cart')">Cart</a></li>
                      <li><a @click="$router.push('/login')">Login</a></li>
                    </ul>
                  </li>
                  <li><a @click="$router.push('/shop/blog')">Blog</a>
                  </li>
                  <li><a @click="$router.push('/shop/contact')">Contact</a></li>
                </ul>
              </div>
            </div>
            <div class="col-sm-3" style="margin-top:-20px">
              <div class="search_box " style="display:inline; margin-right:30px">
                <input type="search" placeholder="Search"/>
              </div>
              <div style="display:inline-block; font-size:25px;" v-if="user_id">
                <a @click="$router.push('shop/cart')"><i class="fas fa-shopping-cart"></i>{{cart.length}}</a>
              </div>
            </div>
          </div>
        </div>
      </div><!--/header-bottom-->
    </header><!--/header-->
    <section id="slider"><!--slider-->
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div id="slider-carousel" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
                <li data-target="#slider-carousel" data-slide-to="1"></li>
                <li data-target="#slider-carousel" data-slide-to="2"></li>
              </ol>

              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>Free E-Commerce Template</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. </p>
                    <button type="button" class="btn btn-default get">Get it now</button>
                  </div>
                  <div class="col-sm-6">
                    <img src="~assets/images/home/girl1.jpg" class="girl img-responsive" alt=""/>
                    <img src="~assets/images/home/pricing.png" class="pricing" alt=""/>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>100% Responsive Design</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. </p>
                    <button type="button" class="btn btn-default get">Get it now</button>
                  </div>
                  <div class="col-sm-6">
                    <img src="~assets/images/home/girl2.jpg" class="girl img-responsive" alt=""/>
                    <img src="~assets/images/home/pricing.png" class="pricing" alt=""/>
                  </div>
                </div>

                <div class="carousel-item">
                  <div class="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>Free Ecommerce Template</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. </p>
                    <button type="button" class="btn btn-default get">Get it now</button>
                  </div>
                  <div class="col-sm-6">
                    <img src="~assets/images/home/girl3.jpg" class="girl img-responsive" alt=""/>
                    <img src="~assets/images/home/pricing.png" class="pricing" alt=""/>
                  </div>
                </div>

              </div>

              <a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev">
                <i class="fa fa-angle-left"></i>
              </a>
              <a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
                <i class="fa fa-angle-right"></i>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section><!--/slider-->
  </div>
</template>
<script>
    const Cookies = process.client ? require("js-cookie") : undefined;
    export default {
        data() {
            return {
                cart: [],
                users: [],
                user_id: '',
                user_name: ''
            }
        },
        created() {
            if (process.browser) {
                if (Cookies.get("cart")) {
                    let cart = JSON.parse(Cookies.get("cart"));
                    return this.cart = cart;
                } else {
                    let cart =  this.$store.getters.cart;
                    return this.cart = cart;
                }
            }

        },
        mounted() {
            if (this.$store.state.token) {
                this.getUsers();
            } else {
                this.$router.push("/");
            }
        },
        methods: {
            getUsers() {
                let self = this;
                this.$axios.get('/users')
                    .then(function (res) {
                        self.user_id = res.data.decoded.user_id;
                        self.user_name = res.data.decoded.user_name;
                        self.users = res.data.data
                    })
            },
            handelLogout() {
                Cookies.remove("token");
                Cookies.remove("cart");
                this.$store.commit("setToken", null);
                this.$store.commit("setCart", []);
                this.$router.push("/login");
            },
        }

    }
</script>
<style scoped>
</style>
