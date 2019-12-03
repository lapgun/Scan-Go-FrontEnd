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
                <h4>Có {{result}} kết quả với từ khóa '{{this.$route.query.search}}'</h4>
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
                        <a @click="addToCart(product)" class="btn btn-default add-to-cart">
                          <i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <label>
                  Sắp xếp theo
                  <b-form-select v-model="order_by" :options="order" @change="getProductsByOrder"></b-form-select>
                </label>
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
                        <a @click="addToCart(product)" class="btn btn-default add-to-cart">
                          <i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng
                        </a>
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
    <shopFooter></shopFooter>
  </div>
</template>
<script>
import shopHeader from "~/components/shopHeader.vue";
import shopFooter from "~/components/shopFooter.vue";
import shopNav from "~/components/shopNav.vue";
import InfiniteLoading from "vue-infinite-loading";
import QrcodeVue from "qrcode.vue";
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
  mounted: function() {
    if (this.$route.query.search) {
      this.handleSearch();
    } else {
      this.getProducts();
    }
  },
  data: function() {
    return {
      products: [],
      order: [
        { value: ["name", "ASC"], text: "Tên từ A-Z" },
        { value: ["name", "DESC"], text: "Tên từ Z-A" },
        { value: ["price", "ASC"], text: "Giá tiền tăng dần" },
        { value: ["price", "DESC"], text: "Giá tiền giảm dần" },
        { value: ["id", "DESC"], text: "Mới nhất" },
        { value: ["id", "ASC"], text: "Cũ nhất" }
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
    QrcodeVue
  },
  methods: {
    currency(x) {
      x = x.toLocaleString("currency", { style: "currency", currency: "VND" });
      return x;
    },
    handleSearch() {
      let self = this;
      this.$axios
        .get("/products/search?search=" + this.$route.query.search)
        .then(function(res) {
          console.log(res);
          self.products = res.data.data;
          self.result = res.data.data.length;
        });
    },
    getProducts: function() {
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
          console.log(res);
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
      let pro = this.cart.find(element => element.id == product.id);
      if (pro) {
        alert("Đã tồn tại sản phẩm trong giỏ hàng");
      } else this.$store.dispatch("addToCart", product);
      this.$store.dispatch("setCart", this.cart);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    infiniteHandler($state) {
      setTimeout(() => {
        this.pagination.currentPage++;
        if (this.pagination.currentPage <= this.pagination.totalPage) {
          console.log(this.pagination.currentPage);
          console.log(this.pagination.totalPage);
          this.getProducts();
          setTimeout(() => {
            $state.loaded();
          }, 1000);
        } else {
          console.log("no more data");
        }
      }, 1000);
    }
  }
};
</script>
