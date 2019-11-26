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
                <div class="view-product">
                  <img :src="`/${products.images? products.images.default_image: ''}`" />
                  <h3>ZOOM</h3>
                </div>
                <b-carousel
                  id="carousel"
                  v-model="slide"
                  :indicator="1110"
                  controls
                  @sliding-start="onSlileStart"
                  @sliding-end="onSlileEnd"
                >
                  <div v-for="(picture,key) in pictures" :key="key">
                    <b-carousel-slide style="width:100px !important" :img-src="`/${picture ? picture : ''}`"></b-carousel-slide>
                  </div>
                </b-carousel>
              </div>
              <div class="col-sm-7">
                <div class="product-information">
                  <!--/product-information-->
                  <img src="~assets/images/product-details/new.jpg" class="newarrival" alt />
                  <h2>{{products.name}}</h2>
                  <p>Web ID: 1089772</p>
                  <img src="~assets/images/product-details/rating.png" alt />
                  <span>
                    <span>{{products.price}} đ</span>
                    <label>Tổng:</label>
                    <input type="text" value="3" />
                    <button type="button" class="btn btn-fefault cart">
                      <i class="fa fa-shopping-cart"></i>
                      Thêm vào giỏ hàng
                    </button>
                  </span>
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
            <div style="font-size:16px" v-html="products.description"></div>

            <h2 style="margin-top:100px" class="title text-center">Thông tin sản phẩm</h2>
            <div style="font-size:16px" v-html="products.detail"></div>
            <img class="img_detail" :src="`/${products.images? products.images.image_1 : ''}`" />
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
  mounted() {
    this.getProducts();
  },
  data: function() {
    return {
      products: {
        id: "",
        name: "",
        description: "",
        price: "",
        detail: "",
        order_time: "",
        categoriesId: "",
        images: {}
      },
      pictures: [],
      slide: 0,
      sliding: null,
    };
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
        self.products = res.data.data;
        Object.keys(self.products.images).forEach(function(key) {
          let img = self.products.images[key];
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
    onSlileStart(slide) {
      this.sliding = true;
    },
    onSlileEnd(slide) {
      this.sliding = false;
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
};
</style>