<template>
  <div>
    <shop-header @products="products=$event" />
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
              <div v-if="this.$route.query.search">
                <h4>Có {{this.products.length}} kết quả với từ khóa '{{this.$route.query.search}}'</h4>
                <div class="col-sm-4" v-for="(product, index) in products" :key="index">
                  <div class="product-image-wrapper">
                    <div class="single-products">
                      <div class="productinfo text-center">
                        <a @click="$router.push('/shop/product_detail/'+product.id)">
                          <img
                            style="width:250px; height:250px"
                            :src="`/${product.images? product.images.default_image: ''}`"
                            alt
                          />
                        </a>
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
              <div v-else>
                <div>
                  <div style="margin-bottom:20px">
                    <div style="display:inline;margin-left:470px">Sắp xếp theo</div>

                    <b-form-select
                      style="width:30%; margin-left:570px; margin-top:-38px"
                      v-model="order_by"
                      :options="order"
                      @change="getProductsByOrder"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-sm-4" v-for="(product, index) in products" :key="index">
                  <div class="product-image-wrapper">
                    <div class="single-products">
                      <div class="productinfo text-center">
                        <a @click="$router.push('/shop/product_detail/'+product.id)">
                          <img
                            style="width:250px; height:250px"
                            :src="`/${product.images? product.images.default_image: ''}`"
                            alt
                          />
                        </a>
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
                <infinite-loading @infinite="infiniteHandler"></infinite-loading>
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
import shopHeader from "~/components/shopHeader.vue";
import shopFooter from "~/components/shopFooter.vue";
import shopNav from "~/components/shopNav.vue";
import chatShop from "~/components/chatShop.vue";
import InfiniteLoading from "vue-infinite-loading";
import QrcodeVue from "qrcode.vue";
export default {
  head: {
    title: "Sản phẩm"
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
    if (this.$route.query.search) {
      this.handleSearch();
    } else {
      this.getProducts();
    }
  },
  data() {
    return {
      products: [],
      length: "",
      order: [
        {
          value: ["name", "ASC"],
          text: "Tên từ A-Z"
        },
        {
          value: ["name", "DESC"],
          text: "Tên từ Z-A"
        },
        {
          value: ["price", "ASC"],
          text: "Giá tiền tăng dần"
        },
        {
          value: ["price", "DESC"],
          text: "Giá tiền giảm dần"
        },
        {
          value: ["id", "DESC"],
          text: "Mới nhất"
        },
        {
          value: ["id", "ASC"],
          text: "Cũ nhất"
        }
      ],
      order_by: ["name", "ASC"],
      result: "",
      pagination: {
        currentPage: 1,
        perPage: 6,
        totalPage: ""
      }
    };
  },
  components: {
    shopHeader,
    shopFooter,
    shopNav,
    InfiniteLoading,
    QrcodeVue,
    chatShop
  },
  methods: {
    currency(x) {
      x = x.toLocaleString("currency", {
        style: "currency",
        currency: "VND"
      });
      return x;
    },
    handleSearch() {
      let self = this;
      this.$axios
        .get("/products/search?search=" + this.$route.query.search)
        .then(function(res) {
          console.log(res);
          self.products = res.data.data;
        });
    },
    getProducts() {
      let self = this;
      this.$axios
        .post(
          "/products/sort?currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage,
          this.order_by
        )
        .then(function(res) {
          let temp = res.data.data;
          self.products = self.products.concat(temp);
          self.pagination.totalPage = res.data.pagination.totalPage;
        });
    },
    getProductsByOrder() {
      let self = this;
      self.products = [];
      this.pagination.currentPage = 1;
      this.getProducts();
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
        this.flashMessage.warning({title : "warning", message: "Đã tồn tại sản phẩm trong giỏ hàng"});
      } else this.$store.dispatch("addToCart", product);
      this.$store.dispatch("setCart", this.cart);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    infiniteHandler($state) {
      setTimeout(() => {
        this.pagination.currentPage++;
        if (this.pagination.currentPage <= this.pagination.totalPage) {
          this.getProducts();
          setTimeout(() => {
            $state.loaded();
          }, 1000);
        } else {
          console.log("no more data");
        }
      }, 1000);
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
