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
  mounted: function() {
    this.getByOrderTime();
    this.getById();
    this.getUser();
  },
  data: function() {
    return {
      products: {
        id : '',
        name: '',
        price:'',
        images : {
          default_image : ''
        }
      },
      newests: {
        id : '',
        name: '',
        price:'',
        images : {
          default_image : ''
        }
      },
    };
  },
  components: {
    shopHeader,
    shopFooter,
    shopNav
  },
  methods: {
    getByOrderTime: function() {
      let self = this;
      this.$axios.get("/products/order_time").then(function(res) {
        self.products = res.data.data;
      });
    },
    getById: function() {
      let self = this;
      this.$axios.get("/products/newest").then(function(res) {
        self.newests = res.data.data;
      });
    },
    getUser(){
      this.$axios.get("/get_user").then(function(res){
        console.log(res)
      })
    }
  }
};
</script>

