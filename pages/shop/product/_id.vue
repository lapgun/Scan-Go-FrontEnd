<template>
  <div>
    <shopHeader @products="products=$event"></shopHeader>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <shopNav></shopNav>
          </div>
          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->
              <h2 class="title text-center">Sản phẩm</h2>
              <div class="col-sm-4" v-for="(product, index) in products" :key="index">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <a @click="$router.push('/shop/product_detail/'+product.id)">
                        <img
                          style="width:250px; height:250px"
                          :src="`/${default_image ? default_image[index]: ''}`"
                        />
                      </a>
                      <h2>{{product.price}} đ</h2>
                      <p>{{product.name}}</p>
                      <a
                        @click="addToCart(product)"
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
const Cookies = process.client ? require("js-cookie") : undefined;
import shopHeader from "~/components/shopHeader.vue";
import shopFooter from "~/components/shopFooter.vue";
import shopNav from "~/components/shopNav.vue";
export default {
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
  mounted: async function() {
    await this.getByMenu();
    await this.getByCat();
    this.getPicture();
  },
  data: function() {
    return {
      products: {},
      default_image: [],
      array: []
    };
  },
  components: {
    shopHeader,
    shopFooter,
    shopNav
  },
  methods: {
    async getByMenu() {
      let self = this;
      const res = await this.$axios.get(
        `/products/menu/${this.$route.params.id}`
      );
      self.products = res.data.data;
    },
    async getByCat() {
      let self = this;
      const res = await this.$axios.get(
        `/categories/cat_parent/${this.$route.params.id}`
      );
      let data = res.data.data.rows;
      data.forEach(element => {
        element.products.forEach(e => {
          self.products.push(e);
        });
      });
      self.products.forEach(element => {
        self.array.push(element.picture);
      });
    },
    getPicture() {
      let self = this;
      this.array.forEach(element => {
        let id = element;
        this.$axios.get("/gallery/" + id).then(function(res) {
          let default_image = res.data.data.default_image;
          self.default_image.push(default_image);
        });
      });
      console.log(self.default_image);
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