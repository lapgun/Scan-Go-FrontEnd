<template>
  <div v-if="loaded">
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
                  <p v-if="average == 0">Chưa có đánh giá</p>
                  <star-rating
                    v-else
                    style="margin-top:-15px"
                    v-bind:star-size="20"
                    :read-only="true"
                    v-model="average"
                    :show-rating="false"
                    :increment="0.25"
                  ></star-rating>
                  <h3>{{currency(product.price)}}</h3>
                  <div>
                    <h4>Số lượng:</h4>
                    <div>
                      <a
                        v-if=" 1 < product.quantity"
                        class="cart_quantity_down btn btn-success"
                        @click="decrement1(product.id)"
                      >-</a>

                      <a v-else class="cart_quantity_down btn btn-success">-</a>

                      <p class="quantity_cart">{{product.quantity}}</p>

                      <a class="cart_quantity_up btn btn-success" @click="increment1(product.id)">+</a>
                      <a
                        style="margin-top:26px;margin-left:10px"
                        @click="addToCart(product)"
                        class="btn btn-default add-to-cart"
                      >
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </div>
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
            <img
              style="margin-bottom:40px"
              class="img_detail"
              :src="`/${product.images? product.images.image_1 : ''}`"
            />
            <h2 style="margin-top:10px" class="title text-center">Đánh giá sản phẩm</h2>
            <div v-if="user_id">
              <div>
                <label style="margin:20px 0 30px 20px" for="viet_bai_danh_gia">Đánh giá sản phẩm</label>
                <input
                  class="input_rating"
                  type="text"
                  v-model="form.comment"
                  id="viet_bai_danh_gia"
                  placeholder="Viết bình luận..."
                />
                <star-rating
                  style="margin: -60px 0 0 450px"
                  :show-rating="false"
                  v-model="form.rating"
                  v-bind:star-size="20"
                  :increment="0.5"
                ></star-rating>
                <b-button
                  variant="info"
                  style="margin:-40px 0 0 700px"
                  @click="handleSubmit"
                >Comment</b-button>
              </div>
              <div v-if="this.comments.length == 0" class="content_comment">Không có bình luận</div>
              <div v-else>
                <div>
                  <div style="border:1px solid #bfbfbf; margin:15px 5px 0 5px;background:#f9ede5">
                    <ul class="nav menu" style="margin:30px 0 30px 0">
                      <li style="margin:0 0 0 50px">
                        <span v-if="!average">0 trên 5</span>
                        <span v-else>{{average}} trên 5</span>
                        <star-rating
                          v-bind:star-size="20"
                          :read-only="true"
                          v-model="average"
                          :show-rating="false"
                          :increment="0.25"
                        ></star-rating>
                      </li>
                      <li class="rating_2">
                        <a href="#">Tất cả ({{this.comments.length}})</a>
                      </li>
                      <li class="rating_1">
                        <a href="#" style="padding-left:20px">Bình luận</a>
                      </li>
                    </ul>
                  </div>
                  <div v-for="(comment, index) in comments" :key="index">
                    <div v-if="comment.productId == product.id">
                      <h4 style="margin:40px 30px 0 30px">{{comment.name}}</h4>
                      <star-rating
                        style="margin:10px 0 20px 35px"
                        v-bind:star-size="20"
                        :read-only="true"
                        v-model="comment.rating"
                        :show-rating="false"
                      ></star-rating>
                      <h5 style="margin:15px 0 15px 30px">{{comment.comment}}</h5>
                      <h6 style="margin-left:30px">{{day[0]}}</h6>
                      <div style="border:1px solid #bfbfbf; margin-top:20px"></div>
                    </div>
                  </div>
                  <b-pagination
                    style="margin-top:20px"
                    v-model="pagination.currentPage"
                    :total-rows="pagination.total"
                    :per-page="pagination.perPage"
                    aria-controls="comments_list"
                    @change="handleChangePage"
                  ></b-pagination>
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
                    <h3>{{currency(product.price)}}</h3>
                    <p>{{product.name}}</p>
                    <div>
                      <a
                        v-if=" 1 < product.quantity"
                        class="cart_quantity_down btn btn-success"
                        @click="decrement(product.id)"
                      >-</a>

                      <a v-else class="cart_quantity_down btn btn-success">-</a>

                      <p class="quantity_cart">{{product.quantity}}</p>

                      <a class="cart_quantity_up btn btn-success" @click="increment(product.id)">+</a>
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
        </div>
      </div>
    </section>
    <shopFooter />
    <chatShop />
  </div>
</template>
<script>
const Cookies = process.client ? require("js-cookie") : undefined;
import shopHeader from "~/components/shopHeader.vue";
import shopFooter from "~/components/shopFooter.vue";
import shopNav from "~/components/shopNav.vue";
import chatShop from "~/components/chatShop.vue";
export default {
  head: { title: "Chi tiết sản phẩm" },
  mounted() {
    if (this.$store.state.token) {
      this.getUsers();
    }
    this.getProducts();
    this.getById();
    this.getCommentProducts();
    setTimeout(() => {
      this.totalRating();
    }, 1000);
  },
  data: function() {
    return {
      loaded: false,
      user_id: "",
      day: [],
      comment: "",
      product: [],
      products: [],
      pictures: [],
      slide: 0,
      sliding: null,
      slidesToShow: 3,
      currentIndex: 0,
      cart: [],
      total: 0,
      comments: [],
      form: {
        comment: "",
        userId: "",
        parentId: "",
        name: "",
        productId: "",
        rating: 0
      },
      average: 0,
      pagination: {
        currentPage: 1,
        perPage: 3,
        totalPage: ""
      }
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
    shopNav,
    chatShop
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
        self.form.productId = res.data.data.id;
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
        self.loaded = true;
      });
    },
    getById() {
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
        alert("Đã tồn tại sản phẩm trong giỏ hàng");
      } else this.$store.dispatch("addToCart", product);
      this.$store.dispatch("setCart", this.cart);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    getUsers() {
      let self = this;
      this.$axios.get("/users/decoded").then(function(res) {
        self.form.userId = res.data.decoded.user_id;
        self.form.name = res.data.decoded.user_name;
      });
    },
    handleSubmit() {
      let self = this;
      this.$axios.post("/comment", this.form).then(function(res) {
        self.getCommentProducts();
        self.form.comment = "";
        self.form.rating = 0;
      });
    },
    getCommentProducts() {
      let self = this;
      this.$axios
        .post(
          "/comment/get?currentPage=" +
            this.pagination.currentPage +
            "&perPage=" +
            this.pagination.perPage,
          {
            currentPage: this.pagination.currentPage,
            perPage: this.pagination.perPage,
            productId: this.$route.params.id
          }
        )
        .then(function(res) {
          self.comments = res.data.data;
          self.pagination = res.data.pagination;
          let text = res.data.data[0].createdAt + "";
          self.day = text.split("T");
        });
    },
    handleChangePage(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getCommentProducts();
    },
    totalRating() {
      let total = 0;
      for (let i = 0; i < this.comments.length; i++) {
        total += this.comments[i].rating;
      }
      this.average = total / this.comments.length;
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
    },
    increment1(id) {
      this.product.quantity += 1;
    },
    decrement1(id) {
      this.product.quantity -= 1;
      if (this.product.quantity < 0) {
        this.product.quantity = 0;
      }
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
  width: 73px !important;
  height: 75px !important;
  display: inline-block !important;
  border: 1px solid #e6dfdf;
}
.rating {
  border: 1px solid #bfbfbf;
  width: 86px;
  height: 40px;
  margin-left: 10px;
  border-radius: 1em;
}
.rating_1 {
  border: 1px solid #bfbfbf;
  width: 130px;
  height: 40px;
  margin-left: 100px;
  border-radius: 1em;
}
.input_rating {
  border-radius: 1em;
  width: 30% !important;
  height: 40px;
}
.rating_2 {
  border: 1px solid #bfbfbf;
  border-radius: 1em;
  width: 130px;
  height: 40px;
  margin-left: 100px;
}
.quantity_cart {
  display: inline;
  margin-left: 10px;
  margin-right: 10px;
}
.content_comment {
  font-size: 20px;
  margin-top: 30px;
  margin-left: 20px;
}
</style>