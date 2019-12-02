<template>
  <div>
    <shopHeader @user_id="user_id=$event" />
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
                  <h3>{{product.price}}</h3>
                  <div>
                    <h4>Số lượng:</h4>
                    <div class="cart_quantity">
                      <div class="cart_quantity_button">
                        <template v-if=" 1 < product.order_time">
                          <a
                            class="cart_quantity_down btn btn-success"
                            @click="decrement(product.id)"
                          >-</a>
                        </template>
                        <template v-else>
                          <a class="cart_quantity_down btn btn-success">-</a>
                        </template>
                        <div
                          style="margin-right:10px; margin-left:10px"
                          class="cart_quantity_input"
                          type="text"
                          autocomplete="off"
                          size="2"
                        >{{product.order_time}}</div>
                        <a class="cart_quantity_up btn btn-success" @click="increment(product.id)">+</a>
                      </div>
                    </div>
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
            
            <h2 style="margin-top:10px" class="title text-center">Đánh giá sản phẩm</h2>
            <div>
              <div
                style="border:1px solid #bfbfbf; width:200px; height:50px ; float:right ;margin-top:-42px"
              >
                <i style="margin-top:15px;margin-left:20px" class="fas fa-pen"></i>
                <label for="viet_bai_danh_gia">
                  <h4 style="margin-top:5px;display:inline">Viết bài đánh giá</h4>
                </label>
              </div>
              <input
                type="text"
                style="width:100%; margin-top:30px"
                @change="handleSubmit"
                v-model="form.comment"
                id="viet_bai_danh_gia"
                placeholder="Viết bài đánh giá..."
              />
              <div>
                <div style="border:1px solid #bfbfbf; margin:15px 5px 0 5px;background:#f9ede5">
                  <ul class="nav menu" style="margin:30px 0 30px 0">
                    <li style="margin:0 0 0 20px">
                      <span>5.0 trên 5</span>
                      <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                    </li>
                    <li class="rating">
                      <a href="#" style="padding-left:20px">Tất cả</a>
                    </li>
                    <li class="rating_1">
                      <a href="#" style="padding-left:20px">Bình luận</a>
                    </li>
                    <li class="rating">
                      <a href="#" style="padding-left:25px">5 sao</a>
                    </li>
                     <li class="rating">
                      <a href="#" style="padding-left:25px">4 sao</a>
                    </li>
                     <li class="rating">
                      <a href="#" style="padding-left:25px">3 sao</a>
                    </li>
                     <li class="rating">
                      <a href="#" style="padding-left:25px">2 sao</a>
                    </li>
                     <li class="rating">
                      <a href="#" style="padding-left:25px">1 sao</a>
                    </li>
                  </ul>
                </div>
                <div v-for="(comment, index) in comments" :key="index">
                  <h4>{{comment.user.name}}</h4>
                  <i class="fas fa-star"></i>
                  <h5>{{comment.comment}}</h5>
                  <h4>{{comment.createdAt}}</h4>
                  <div style="border:1px solid #bfbfbf"></div>
                </div>
                
              </div>
            </div>
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
                    <h3>{{product.price}}</h3>
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
    this.totalPrice();
    this.getUsers();
    this.getComments();
  },
  data: function() {
    return {
      user_id: "",
      product: [],
      products: [],
      pictures: [],
      slide: 0,
      sliding: null,
      slidesToShow: 3,
      currentIndex: 0,
      cart: [],
      total: 0,
      form: {
        comment: "",
        userId: "",
        rate: "",
        parentId: "",
        name: ""
      },

      users: []
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
    currency(x) {
      x = x.toLocaleString("currency", { style: "currency", currency: "VND" });
      return x;
    },
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
    },
    setLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addToCart(product) {
      let pro = this.cart.find(element => element.id == product.id);
      if (pro) {
        alert("Đã tồn tại sản phẩm trong giỏ hàng");
      } else this.$store.dispatch("addToCart", product);
      this.$store.dispatch("setCart", this.cart);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    increment(id) {
      console.log("dasdsa", id, this.products);

      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) this.products[i].order_time++;
      }
      this.totalPrice();
      this.setLocalStorage();
    },
    decrement(id) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) this.products[i].order_time--;
      }
      this.totalPrice();
      this.setLocalStorage();
    },
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].price * this.cart[i].order_time;
        this.total = total;
      }
    },
    getUsers() {
      let self = this;
      this.$axios.get("/users").then(function(res) {
        console.log("aaaa", res);
        self.users = res.data.data;
        self.form.userId = res.data.decoded.user_id;
        self.form.name = res.data.decoded.user_name;
      });
    },
    handleSubmit() {
      let self = this;
      this.$axios.post("/comment", this.form).then(function(res) {
        self.getProducts();
        self.form.comment = "";
      });
    },
    getComments() {
      let self = this;
      this.$axios.get("/comment").then(function(res) {
        console.log(res);
        self.comments = res.data.data;
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
.img_picture {
  margin-right: 5px;
  margin-top: 10px;
  width: 75px !important;
  height: 75px !important;
  display: inline-block !important;
  border: 1px solid #e6dfdf;
}
.rating {
  border: 1px solid #bfbfbf;
  width: 86px;
  height: 40px;
  margin-left: 10px;
}
.rating_1 {
  border: 1px solid #bfbfbf;
  width: 100px;
  height: 40px;
  margin-left: 10px;
}
</style>