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
              <h2 class="title text-center">Sản phẩm</h2>
              <div class="col-sm-4" v-for="(product, index) in products" :key="index">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <a @click="$router.push('/shop/product_detail/'+product.id)">
                        <!-- <img style="width:250px; height:250px" :src="product.images.default_image"  /> -->
                      </a>
                      <h2>{{product.price}} đ</h2>
                      <p>{{product.name}}</p>
                      <a
                        @click="$router.push('/shop/product_detail/'+product.id)"
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
  mounted: function() {
    this.getProducts();
    this.getMenu();
    this.getByCat();
  },
  data: function() {
    return {
      products: [],
      menu: []
    };
  },
  components: {
    shopHeader,
    shopFooter,
    shopNav
  },
  methods: {
    getProducts: function() {
      let self = this;
      this.$axios
        .get("/products/menu/" + this.$route.params.id)
        .then(function(res) {
          console.log(res);
          self.products = res.data.data;
        });
    },
    getMenu() {
      let self = this;
      this.$axios
        .get("/categories/cat_parent/" + this.$route.params.id)
        .then(function(res) {
          let array = res.data.data.rows;
          array.forEach(element => {
            self.menu.push(element.id);
          });
        });
    },
    getByCat() {
      console.log("this.menu", this.menu);
      this.$axios
        .post("/products/by_cat", this.menu)
        .then(function(results) {});
    }
  }
};
</script>