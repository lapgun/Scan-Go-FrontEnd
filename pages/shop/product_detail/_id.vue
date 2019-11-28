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
            <div class="product-details">
              <!--product-details-->
              <div class="col-sm-5">
                <div>
                  <b-carousel
                    id="carousel"
                    v-model="slide"
                    :indicator="4000"
                    img-width="320"
                    img-height="320"
                    controls
                    @sliding-start="onSlileStart"
                    @sliding-end="onSlileEnd"
                  >
                    <div v-for="(picture,index) in pictures" :key="index">
                      <b-carousel-slide :img-src="`/${picture ? picture : ''}`"></b-carousel-slide>
                    </div>
                  </b-carousel>
                </div>
                <div>
                  <span v-for="(picture,index) in pictures" :key="index" style="margin-top:50px">
                    <img
                      class="img_picture"
                      :src="`/${picture ? picture : ''}`"
                      @click="activateImage(index)"
                    />
                  </span>
                </div>
              </div>
              <div class="col-sm-7">
                <div class="product-information">
                  <!--/product-information-->
                  <img src="~assets/images/product-details/new.jpg" class="newarrival" alt />
                  <h2>{{product.name}}</h2>
                  <p>Web ID: 1089772</p>
                  <img src="~assets/images/product-details/rating.png" alt />
                  <h3>{{product.price}} đ</h3>
                  <div>
                    <h4>Số lượng:</h4>
                    <input type="text" value="3" />
                    <button type="button" @click="addToCart(product)" class="btn btn-fefault cart">
                      <i class="fa fa-shopping-cart"></i>
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                  <div>
                    <span class="font-size-1">
                      <i class="fas fa-truck-moving"></i> Miễn phí vận chuyển từ
                      <strong>300.000đ</strong>
                    </span>
                  </div>
                  <p>
                    <b>Availability:</b> In Stock
                  </p>
                  <p>
                    <b>Condition:</b> New
                  </p>
                  <p>
                    <b>Brand:</b> Scan & go
                  </p>
                  <a href>
                    <img
                      src="~assets/images/product-details/share.png"
                      class="share img-responsive"
                      alt
                    />
                  </a>
                </div>
                <!--/product-information-->
              </div>
            </div>
            <h2 style="margin-top:10px" class="title text-center">Mô tả sản phẩm</h2>
            <div style="font-size:16px" v-html="product.description"></div>

            <h2 style="margin-top:100px" class="title text-center">Thông tin sản phẩm</h2>
            <div style="font-size:16px" v-html="product.detail"></div>
            <img class="img_detail" :src="`/${product.images? product.images.image_1 : ''}`" />

            <h2 style="margin-top:100px" class="title text-center">Sản phẩm mới nhất</h2>
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
                    <a @click="addToCart(product)" class="btn btn-default add-to-cart">
                      <i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng
                    </a>
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
  mounted() {
    this.getProducts();
    this.getById();
  },
  data: function() {
    return {
      product: [],
      products: [],
      pictures: [],
      slide: 0,
      sliding: null,
      slidesToShow: 3,
      currentIndex: 0,
      cart: []
    };
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
  components: {
    shopHeader,
    shopFooter,
    shopNav
  },
  methods: {
    getProducts() {
      let self = this;
      this.$axios.get("/products/" + this.$route.params.id).then(function(res) {
        self.product = res.data.data;
        Object.keys(self.product.images).forEach(function(key) {
          let img = self.product.images[key];
          if (img) {
            let text = img + "";
            let test = text.split(".");
            if (test[1] == "jpg" || test[1] == "png" || test[1] == "gif") {
              self.pictures.push(img);
            }
          }
        });
      });
    },
    getById: function() {
      let self = this;
      this.$axios.get("/products/new-products").then(function(res) {
        self.products = res.data.data;
      });
    },
    onSlileStart(slide) {
      this.sliding = true;
    },
    onSlileEnd(slide) {
      this.sliding = false;
    },
    activateImage(index) {
      this.currentIndex = index;
      console.log("aaaa: ", this.currentIndex);
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
<style>
.img_detail {
  width: 500px;
  height: 500px;
  display: block;
  margin: 0 auto;
}
.img_picture {
  margin-right: 5px;
  margin-top: 10px;
  width: 75px !important;
  height: 75px !important;
  display: inline-block !important;
  border: 1px solid #e6dfdf;
}
</style>