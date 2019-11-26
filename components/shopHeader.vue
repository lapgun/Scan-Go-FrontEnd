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
                      @click="$router.push('/user/detail/'+user_id)"
                      style="margin-left:-220px"
                    >Account</a>
                  </li>
                  <li>
                    <a
                      @click="$router.push('/shop/checkout/'+user_id)"
                      style="margin-left: -150px; margin-top:-20px"
                    >Checkout</a>
                  </li>
                  <li>
                    <a
                      @click="$router.push('/register')"
                      style="margin-left:-70px; margin-top:-20px"
                    >Register</a>
                  </li>
                  <li>
                    <a @click="$router.push('/login')" style=" margin-top:-20px">Login</a>
                  </li>
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
                    <a @click="$router.push('/')" class="active" style="margin-top:-2px">Home</a>
                  </li>
                  <li class="dropdown">
                    <a href="#" style="margin-top:-10px">Shop</a>
                    <ul role="menu" class="sub-menu">
                      <li>
                        <a @click="$router.push('/shop/products')">Products</a>
                      </li>
                      <li>
                        <a @click="$router.push('/shop/checkout/'+user_id)">Checkout</a>
                      </li>
                      <li>
                        <a @click="$router.push('/shop/cart')">Cart</a>
                      </li>
                      <li>
                        <a @click="$router.push('/login')">Login</a>
                      </li>
                    </ul>
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
              <div style="display:inline-block; font-size:25px;">
                <i class="fas fa-shopping-cart"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/header-bottom-->
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
                <div v-for="slide in slides" :key="slide.id" >
                  <b-carousel-slide :img-src="`/${slide.slide_images ? slide.slide_images.default_image : ''}`"></b-carousel-slide>
                </div>
              </b-carousel>
            </div>
          </div>
        </div>
      </section>
    </header>
    <!--/header-->
  </div>
</template>
<script>

export default {
  mounted: function() {
    this.getSlides()
  },
  data: function() {
    return {
      search: "",
      slide:0,
      sliding:null,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      slides : []
    };
  },
  methods: {
    handleSearch() {
      let self = this;
      this.$axios
        .get("/products/search?search=" + this.search)
        .then(function(res) {
          self.products = res.data.data;
          self.$emit("products", self.products);  
          self.$router.push('/shop/products?search='+self.search)
          });
    },
    onSlileStart(slide) {
      this.sliding = true
    },
    onSlileEnd(slide) {
      this.sliding = false
    },
    getSlides() {
      let self = this
       this.$axios.get('/slide').then(function(res){
         self.slides  = res.data.rows
     })
    }
  }
};
</script>
<style scoped>
</style>