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
              <h2 style="margin-top:3px" class="title text-center">Sản phẩm bán chạy nhất</h2>
              <div class="col-sm-4" v-for="(product,index) in products" :key="index">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <img
                        style="width:250px; height:250px"
                        :src="`/${product.images ? product.images.default_image : ''}`"
                        @click="$router.push('/shop/product_detail/'+product.id)"
                        alt
                      />
                      <h2>{{product.price}} đ</h2>
                      <p>{{product.name}}</p>
                      <a @click="addToCart(product)" class="btn btn-default add-to-cart">
                        <i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--features_items-->
            <div class="features_items">
              <!--features_items-->
              <h2 style="margin-top:3px" class="title text-center">Sản phẩm mới nhất</h2>
              <div class="col-sm-4" v-for="(newest,index) in newests" :key="index">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <img
                        style="width:250px; height:250px"
                        :src="`/${newest.images ? newest.images.default_image : ''}`"
                        @click="$router.push('/shop/product_detail/'+newest.id)"
                        alt
                      />
                      <h2>{{newest.price}} đ</h2>
                      <p>{{newest.name}}</p>
                      <a
                        @click="$router.push('/shop/product_detail/'+newest .id)"
                        class="btn btn-default add-to-cart"
                      >
                        <i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng
                      </a>
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
                cart: [],
                newests: []
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
            this.getByOrderTime();
            this.getById();
        },
        methods: {
            addToCart(product) {
                let pro = this.cart.find(element => element.id == product.id);
                if (pro) {
                    alert("Đã tồn tại sản phẩm trong giỏ hàng")
                } else
                    this.$store.dispatch('addToCart', product);
                this.$store.dispatch('setCart', this.cart);
                localStorage.setItem('cart', JSON.stringify(this.cart))
            },
            getByOrderTime: function () {
                let self = this;
                this.$axios.get("/products/order_time").then(function (res) {
                    self.products = res.data.data;
                });
            },
            getById: function () {
                let self = this;
                this.$axios.get("/products/newest").then(function (res) {
                    self.newests = res.data.data;
                });
            },

        }
    }
</script>
<style scoped>
  #default_image {
    width: 248px;
    height: 270px;
    object-fit: cover;
  }
</style>

