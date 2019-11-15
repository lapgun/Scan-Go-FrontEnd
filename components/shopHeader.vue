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
                    <a href="#">
                      <i class="fa fa-phone"></i> +2 95 01 88 821
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-envelope"></i> info@domain.com
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
                <a href="#">
                  <img src="~assets/images/home/logo.png" alt />
                </a>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="shop-menu pull-right">
                <ul class="nav navbar-nav">
                  <li>
                    <a @click="$router.push('/user/detail/'+user.id)" style="margin-left:-220px">
                      <i class="fa fa-user"></i> Account
                    </a>
                  </li>
                  <li>
                    <a
                      @click="$router.push('/shop/checkout/'+user.id)"
                      style="margin-left: -150px; margin-top:-20px"
                    >
                      <i class="fa fa-crosshairs"></i> Checkout
                    </a>
                  </li>
                  <li>
                    <a
                      @click="$router.push('/user/register')"
                      style="margin-left:-70px; margin-top:-20px"
                    >
                      <i class="fa fa-shopping-cart"></i> Register
                    </a>
                  </li>
                  <li>
                    <a @click="$router.push('/login')" style=" margin-top:-20px">
                      <i class="fa fa-lock"></i> Login
                    </a>
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
                    <a href="#" class="active" style="margin-top:-2px">Home</a>
                  </li>
                  <li class="dropdown">
                    <a href="#" style="margin-top:-10px">
                      Shop
                      <i class="fa fa-angle-down"></i>
                    </a>
                    <ul role="menu" class="sub-menu">
                      <li>
                        <a @click="$router.push('/shop/product')">Products</a>
                      </li>
                      <li>
                        <a @click="$router.push('/shop/checkout/'+user.id)">Checkout</a>
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
                    <a @click="$router.push('/shop/blog')">
                      Blog
                      <i class="fa fa-angle-down"></i>
                    </a>
                  </li>
                  <li>
                    <a @click="$router.push('/shop/contact')">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="search_box pull-right">
                <input type="text" v-model="search" placeholder="Search" />
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
            <div id="slider-carousel" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
                <li data-target="#slider-carousel" data-slide-to="1"></li>
                <li data-target="#slider-carousel" data-slide-to="2"></li>
              </ol>

              <div class="carousel-inner">
                <div class="item active">
                  <div class="col-sm-6">
                    <h1>
                      <span>E</span>-SHOPPER
                    </h1>
                    <h2>Free E-Commerce Template</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <button type="button" class="btn btn-default get">Get it now</button>
                  </div>
                  <div class="col-sm-6">
                    <img src="~assets/images/home/girl1.jpg" class="girl img-responsive" alt />
                    <img src="~assets/images/home/pricing.png" class="pricing" alt />
                  </div>
                </div>
                <div class="item">
                  <div class="col-sm-6">
                    <h1>
                      <span>E</span>-SHOPPER
                    </h1>
                    <h2>100% Responsive Design</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <button type="button" class="btn btn-default get">Get it now</button>
                  </div>
                  <div class="col-sm-6">
                    <img src="~assets/images/home/girl2.jpg" class="girl img-responsive" alt />
                    <img src="~assets/images/home/pricing.png" class="pricing" alt />
                  </div>
                </div>

                <div class="item">
                  <div class="col-sm-6">
                    <h1>
                      <span>E</span>-SHOPPER
                    </h1>
                    <h2>Free Ecommerce Template</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <button type="button" class="btn btn-default get">Get it now</button>
                  </div>
                  <div class="col-sm-6">
                    <img src="~assets/images/home/girl3.jpg" class="girl img-responsive" alt />
                    <img src="~assets/images/home/pricing.png" class="pricing" alt />
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
    </section>
    <!--/slider-->
  </div>
</template>
<script>
export default {
	data: function() {
		return {
			search: "",
		}
	},
};
</script>
<style scoped>
</style>