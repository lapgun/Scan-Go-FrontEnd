<template>
  <div>
    <shopHeader/>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <shopNav/>
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
                      <h2>{{currency(product.price)}}</h2>
                      <p>{{product.name}}</p>
                      <qrcode-vue
                        :value="'http://localhost:3000/shop/product_detail/'+product.id"
                        size="100"
                        level="H"
                      ></qrcode-vue>
                      <div>
                        <a
                          v-if=" 1 < product.quantity"
                          class="cart_quantity_down btn btn-success"
                          @click="decrement(product.id)"
                        >-</a>

                        <a v-else class="cart_quantity_down btn btn-success">-</a>

                        <p class="quantity_cart" type="number">{{product.quantity}}</p>

                        <a class="cart_quantity_up btn btn-success" @click="increment(product.id)">+</a>
                        <a style="margin-top:26px;margin-left:10px" @click="addToCart(product)"
                           class="btn btn-default add-to-cart">
                          <i class="fa fa-shopping-cart"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--features_items-->
            <div class="features_items">
              <!--features_items-->
              <h2 style="margin-top:3px" class="title text-center">Sản phẩm mới nhất</h2>
              <div class="col-sm-4" v-for="(product,index) in newests" :key="index">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <img
                        style="width:250px; height:250px"
                        :src="`/${product.images ? product.images.default_image : ''}`"
                        @click="$router.push('/shop/product_detail/'+product.id)"
                        alt
                      />
                      <h2>{{currency(product.price)}}</h2>
                      <p>{{product.name}}</p>
                      <qrcode-vue
                        :value="`https://localhost:3000/shop/product_detail/${product.id}`"
                        size="100"
                        level="H"
                      ></qrcode-vue>
                      <div>
                        <a
                          v-if=" 1 < product.quantity"
                          class="cart_quantity_down btn btn-success"
                          @click="decrement1(product.id)"
                        >-</a>

                        <a v-else class="cart_quantity_down btn btn-success">-</a>

                        <p class="quantity_cart">{{product.quantity}}</p>

                        <a class="cart_quantity_up btn btn-success" @click="increment1(product.id)">+</a>
                        <a style="margin-top:26px;margin-left:10px" @click="addToCart(product)"
                           class="btn btn-default add-to-cart">
                          <i class="fa fa-shopping-cart"></i>
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
    </section>
    <qrCodeReader />
    <shopFooter/>
  </div>
</template>
<script>
    import shopHeader from "~/components/shopHeader.vue";
    import shopFooter from "~/components/shopFooter.vue";
    import shopNav from "~/components/shopNav.vue";
    import QrcodeVue from "qrcode.vue";
    import chatShop from "~/components/chatShop.vue";
    import qrCodeReader from "~/components/qrCodeReader";

    export default {
        head: {title: "Trang chủ"},
        data() {
            return {
                products: [],
                cart: [],
                newests: [],
            };
        },
        components: {
            shopHeader,
            shopFooter,
            shopNav,
            QrcodeVue,
            chatShop,
            qrCodeReader
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
            this.getByOrderTime();
            this.getById();
        },
        methods: {
            currency(x) {
                x = x.toLocaleString("currency", {style: "currency", currency: "VND"});
                return x;
            },
            getByOrderTime() {
                let self = this;
                this.$axios.get("/products/order_time").then(function (res) {
                    self.products = res.data.data;
                });
            },
            getById() {
                let self = this;
                this.$axios.get("/products/newest").then(function (res) {
                    self.newests = res.data.data;
                });
            },
            increment(id) {
                for (let i = 0; i < this.products.length; i++) {
                    if (this.products[i].id === id) this.products[i].quantity++;
                }
            },
            decrement(id) {
                for (let i = 0; i < this.products.length; i++) {
                    if (this.products[i].id === id) this.products[i].quantity--;
                }
            },
            increment1(id) {
                for (let i = 0; i < this.newests.length; i++) {
                    if (this.newests[i].id === id) this.newests[i].quantity++;
                }
            },
            decrement1(id) {
                for (let i = 0; i < this.newests.length; i++) {
                    if (this.newests[i].id === id) this.newests[i].quantity--;
                }
            },
            addToCart(product) {
                product = {
                    id: product.id,
                    name: product.name,
                    categoriesId: product.categoriesId,
                    images: product.images,
                    price: product.price,
                    description: product.description,
                    detail: product.detail,
                    quantity: product.quantity,
                    order_time: product.order_time
                };
                let pro = this.cart.find(element => element.id == product.id);
                if (pro) {
                    alert("Đã tồn tại sản phẩm trong giỏ hàng");
                } else this.$store.dispatch("addToCart", product);
                this.$store.dispatch("setCart", this.cart);
                localStorage.setItem("cart", JSON.stringify(this.cart));
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

  .quantity_cart {
    display: inline;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
