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
              <div v-if="this.products.length == 0">
                <h3>Không có sản phẩm nào.</h3>
                <p
                  style="margin-top:30px; font-size:16px"
                >Xin lỗi, không có kết quả nào tương ứng với tìm kiếm của bạn.</p>
                <p style="font-size:16px">Vui lòng thử lại.</p>
              </div>
              <div v-else>
                <h3 style="display:inline">{{cat_name}}</h3>
                <p style="display:inline; font-size:15px">({{this.products.length}} sản phẩm)</p>
                <div v-for="(product, index) in products" :key="index">
                  <div class="col-sm-4">
                    <div>
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <a @click="$router.push('/shop/product_detail/'+product.id)">
                              <img
                                style="width:250px; height:250px"
                                :src="`/${default_image ? default_image[index]: ''}`"
                              />
                            </a>
                            <h2>{{currency(product.price)}}</h2>
                            <p>{{product.name}}</p>
                            <qrcode-vue
                              :value="'/shop/product_detail/'+product.id"
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

                              <p class="quantity_cart">{{product.quantity}}</p>

                              <a
                                class="cart_quantity_up btn btn-success"
                                @click="increment(product.id)"
                              >+</a>
                              <a
                                style="margin-top:26px;margin-left:10px"
                                @click="addToCart(product)"
                                class="btn btn-default add-to-cart"
                              >
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
          </div>
        </div>
      </div>
    </section>
    <shopFooter />
    <chatShop />
  </div>
</template>
<script>
const Cookies = process.client ? require("js-cookie") : undefined;
import shopHeader from "~/components/shopHeader.vue";
import shopFooter from "~/components/shopFooter.vue";
import shopNav from "~/components/shopNav.vue";
import QrcodeVue from "qrcode.vue";
import chatShop from "~/components/chatShop.vue";
export default {
  head: { title: "Sản phẩm" },
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
    this.getCatName();
  },
  data() {
    return {
      products: {},
      default_image: [],
      array: [],
      length: "",
      cat_name: ""
    };
  },
  components: {
    shopHeader,
    shopFooter,
    shopNav,
    QrcodeVue,
    chatShop
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
    },
    getCatName() {
      let self = this;
      this.$axios
        .get("/categories/" + this.$route.params.id)
        .then(function(res) {
          self.cat_name = res.data.data.name;
        });
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
    },
    currency(x) {
      x = x.toLocaleString("currency", { style: "currency", currency: "VND" });
      return x;
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
    }
  }
};
</script>
<style scoped>
.quantity_cart {
  display: inline;
  margin-left: 10px;
  margin-right: 10px;
}
</style>