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
              <div v-for="(product,index) in products" :key="index">
                <div class="col-sm-4">
                  <div class="product-image-wrapper">
                    <div class="single-products">
                      <div class="productinfo text-center">
                        <img
                          style="width:250px; height:250px"
                          :src="`/${product.images? product.images.default_image: ''}`"
                          alt
                        />
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
                          <a
                            href="#"
                            class="btn btn-default add-to-cart"
                            @click="addToCart(product)"
                          >
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
    };
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
        return (this.cart = cart);
      } else {
        let cart = this.$store.getters.cart;
        return (this.cart = cart);
      }
    }
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      let self = this;
      this.$axios.get("/products").then(function(res) {
        self.products = res.data.data;
      });
    },
    addToCart(product) {
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
</style>

