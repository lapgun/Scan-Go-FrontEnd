<template>
  <div>
    <shopHeader></shopHeader>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <shopNav></shopNav>
          </div>
          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->
              <h2 class="title text-center">Features Items</h2>
              <template v-for="product in products">
                <div class="col-sm-4">
                  <div class="product-image-wrapper">
                    <div class="single-products">
                      <div class="productinfo text-center">
                        <img :src="product.images.default_image" id="default_image"/>
                        <h2>${{product.price}}</h2>
                        <p>{{product.name}}</p>
                        <a href="#" class="btn btn-default add-to-cart">
                          <i class="fa fa-shopping-cart"></i>Add to cart
                        </a>
                      </div>
                      <div class="product-overlay">
                        <div class="overlay-content">
                          <h2>${{product.price}}</h2>
                          <p>{{product.name}}</p>
                          <a href="#" class="btn btn-default add-to-cart" @click="addToCart(product)">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <!--features_items-->
            <div class="category-tab">
              <!--category-tab-->
              <div class="col-sm-12">
                <ul class="nav nav-tabs">
                  <li class="active">
                    <a href="#tshirt" data-toggle="tab">T-Shirt</a>
                  </li>
                  <li>
                    <a href="#blazers" data-toggle="tab">Blazers</a>
                  </li>
                  <li>
                    <a href="#sunglass" data-toggle="tab">Sunglass</a>
                  </li>
                  <li>
                    <a href="#kids" data-toggle="tab">Kids</a>
                  </li>
                  <li>
                    <a href="#poloshirt" data-toggle="tab">Polo shirt</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content">
                <div class="tab-pane fade active in" id="tshirt">
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery2.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane fade" id="blazers">
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery4.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery3.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery2.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery1.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane fade" id="sunglass">
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery3.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery4.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery1.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery2.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane fade" id="kids">
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery1.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery2.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery3.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery4.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane fade" id="poloshirt">
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery2.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery4.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery3.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="~assets/images/home/gallery1.jpg" alt/>
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" class="btn btn-default add-to-cart">
                            <i class="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/category-tab-->

            <div class="recommended_items">
              <!--recommended_items-->
              <h2 class="title text-center">recommended items</h2>

              <div id="recommended-item-carousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="~assets/images/home/recommend1.jpg" alt/>
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="~assets/images/home/recommend2.jpg" alt/>
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="~assets/images/home/recommend3.jpg" alt/>
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="~assets/images/home/recommend2.jpg" alt/>
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="~assets/images/home/recommend3.jpg" alt/>
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <shopFooter></shopFooter>
  </div>
</template>
<script>
    import shopHeader from "~/components/shopHeader.vue";
    import shopFooter from "~/components/shopFooter.vue";
    import shopNav from "~/components/shopNav.vue";

    export default {
        data() {
            return {
                products: [],
                cart: []
            }
        },
        components: {
            shopHeader,
            shopFooter,
            shopNav
        },
        created() {
            if (process.browser) {
                if (localStorage.getItem("cart")) {
                    let cart = JSON.parse(localStorage.getItem("cart"));
                    return this.cart = cart;
                } else {
                    let cart = this.$store.getters.cart;
                    return this.cart = cart;
                }
            }
        },
        mounted() {
            this.getProducts();
        },
        methods: {
            getProducts() {
                let self = this;
                this.$axios.get('/products')
                    .then(function (res) {
                        self.products = res.data.data
                    })
            },
            addToCart(product) {
                let pro = this.cart.find(element => element.id == product.id);
                if (pro) {
                    alert("Đã tồn tại sản phẩm trong giỏ hàng")
                } else
                    this.$store.dispatch('addToCart', product);
                    this.$store.dispatch('setCart', this.cart);
                     localStorage.setItem('cart',  JSON.stringify(this.cart))
            }
        }
    };
</script>
<style scoped>
  #default_image {
    width: 248px;
    height: 270px;
    object-fit: cover;
  }
</style>

