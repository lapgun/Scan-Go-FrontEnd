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
              <div>
                <label>
                  Sắp xếp theo
                  <b-form-select v-model="order_by" :options="order" @change="getProducts"></b-form-select>
                </label>
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
    };
  },
  components: {
    shopHeader,
    shopFooter,
    shopNav
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
          self.products = res.data.data;
        });
    },
    getProducts: function() {
      let self = this;
      this.$axios.post("/products/sort", this.order_by).then(function(res) {
        console.log(res);
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
