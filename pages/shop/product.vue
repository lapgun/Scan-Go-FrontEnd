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
                      <img :src="product.images.image_1" alt />
                      <h2>{{product.price}} đ</h2>
                      <p>{{product.name}}</p>
                      <a href="#" class="btn btn-default add-to-cart">
                        <i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng
                      </a>
                    </div>
                    <div class="product-overlay">
                      <div class="overlay-content">
                        <h2>{{product.price}}</h2>
                        <p>{{product.name}}</p>
                        <a href="#" class="btn btn-default add-to-cart">
                          <i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul class="pagination">
              <li class="active">
                <a href>1</a>
              </li>
              <li>
                <a href>2</a>
              </li>
              <li>
                <a href>3</a>
              </li>
              <li>
                <a href>&raquo;</a>
              </li>
            </ul>
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
  },
  data: function() {
    return {
      products: []
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
      this.$axios.get("/products").then(function(res) {
        console.log(res);
        self.products = res.data.data;
      });
    }
  }
};
</script>