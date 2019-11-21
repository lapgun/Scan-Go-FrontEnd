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
            <div class="product-details">
              <!--product-details-->
              <div class="col-sm-5">
                <div class="view-product">
                  <img :src="`/${products.images? products.images.default_image: ''}`" />
                  <h3>ZOOM</h3>
                </div>
                <div id="similar-product" class="carousel slide" data-ride="carousel">
                  <!-- Wrapper for slides -->
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <a href>
                        <img
                          style="width:100px; height:100px"
                          :src="`/${products.images? products.images.default_image: ''}`"
                        />
                      </a>
                      <a href>
                        <img
                          style="width:100px; height:100px"
                          :src="`/${products.images? products.images.default_image: ''}`"
                        />
                      </a>
                      <a href>
                        <img
                          style="width:100px; height:100px"
                          :src="`/${products.images? products.images.default_image: ''}`"
                        />
                      </a>
                    </div>
                    <div class="carousel-item">
                      <a href>
                        <img
                          style="width:100px; height:100px"
                          :src="`/${products.images? products.images.default_image: ''}`"
                        />
                      </a>
                      <a href>
                        <img
                          style="width:100px; height:100px"
                          :src="`/${products.images? products.images.default_image: ''}`"
                        />
                      </a>
                      <a href>
                        <img
                          style="width:100px; height:100px"
                          :src="`/${products.images? products.images.default_image: ''}`"
                        />
                      </a>
                    </div>
                    <div class="carousel-item">
                      <a href>
                        <img
                          style="width:100px; height:100px"
                          :src="`/${products.images? products.images.default_image: ''}`"
                        />
                      </a>
                      <a href>
                        <img
                          style="width:100px; height:100px"
                          :src="`/${products.images? products.images.default_image: ''}`"
                        />
                      </a>
                      <a href>
                        <img
                          style="width:100px; height:100px"
                          :src="`/${products.images? products.images.default_image: ''}`"
                        />
                      </a>
                    </div>
                  </div>

                  <!-- Controls -->
                  <a class="left item-control" href="#similar-product" data-slide="prev">
                    <i class="fa fa-angle-left"></i>
                  </a>
                  <a class="right item-control" href="#similar-product" data-slide="next">
                    <i class="fa fa-angle-right"></i>
                  </a>
                </div>
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
                    <b>Brand:</b> E-SHOPPER
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
            <h2 style="margin-top:100px" class="title text-center">Sản phẩm mới nhất</h2>
            <div class="recommended_items">
              <!--recommended_items-->
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
        images: {
          default_image: ""
        }
      }
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
      });
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
</style>