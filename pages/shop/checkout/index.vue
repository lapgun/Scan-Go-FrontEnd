<template>
  <div>
    <shopHeader></shopHeader>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li>
              <a href="#">Home</a>
            </li>
            <li class="active">Check out</li>
          </ol>
        </div>
        <!--/breadcrums-->

        <div class="review-payment">
          <h2>Review & Payment</h2>
        </div>
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image" style="text-align: center">Sản phẩm</td>
                <td class="description">Tên</td>
                <td class="price">Số lượng</td>
                <td class="quantity">Thành tiền</td>
                <td class="total">Total</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in cart" :key="index">
                <td class="cart_product">
                  <a>
                    <img :src="`/${item.images? item.images.default_image: ''}`" />
                  </a>
                </td>
                <td class="cart_description">
                  <h4>
                    <a href>{{item.name}}</a>
                  </h4>
                </td>
                <td class="cart_price">
                  <p>{{currency(item.price)}}</p>
                </td>
                <td class="cart_quantity">
                  <div class="cart_quantity_button">
                    <p>{{item.order_time}}</p>
                  </div>
                </td>
                <td class="cart_total">
                  <p class="cart_total_price">{{currency(item.price * item.order_time)}}</p>
                </td>
              </tr>
              <tr>
                <td colspan="4">&nbsp;</td>
                <td colspan="2">
                  <table class="table table-condensed total-result">
                    <tr>
                      <td>Giá tiền</td>
                      <td>{{currency(total)}}</td>
                    </tr>
                    <tr>
                      <td>VAT</td>
                      <td>10%</td>
                    </tr>
                    <tr class="shipping-cost">
                      <td>Phí vận chuyển</td>
                      <td>Miễn phí</td>
                    </tr>
                    <tr>
                      <td>Tổng giá tiền</td>
                      <td>
                        <span>{{currency(total + total * 10/100)}}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="register-req">
          <p>Xin vui lòng, đảm bảo thông tin kiểm tra trước khi bấm vào thanh toán</p>
          <p>Giúp chúng tôi giữ an toàn tài khoản của bạn và an toàn, xin vui lòng xác minh thông tin thanh toán của bạn.</p>
        </div>
        <!--/register-req-->

        <div class="shopper-informations" id="payment">
          <div class="text-center">
            <div class="col-sm-6">
              <div class="shopper-info">
                <p>Thông tin của bạn</p>
                <form>
                  <input type="text" placeholder="Họ tên" :value="user_name" />
                  <input type="text" placeholder="Email của bạn" :value="user_email" />
                  <input type="number" placeholder="Số điện thoại" />
                  <input type="text" placeholder="Địa chỉ" />
                </form>
                <a class="btn btn-primary" @click="$router.push('/shop/cart')">Trở lại</a>
                <a class="btn btn-primary" @click="handelSubmit">Thanh toán</a>
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
  data() {
    return {
      cart: [],
      total: 0,
      user_id: "",
      user_name: "",
      user_email: ""
    };
  },
  components: {
    shopHeader,
    shopFooter
  },
  mounted() {
    this.totalPrice();
    this.getUsers();
  },
  methods: {
    currency(x) {
      x = x.toLocaleString("currency", { style: "currency", currency: "VND" });
      return x;
    },
    getUsers() {
      let self = this;
      this.$axios.get("/users").then(function(res) {
        self.user_id = res.data.decoded.user_id;
        self.user_name = res.data.decoded.user_name;
        self.user_email = res.data.decoded.user_email;
      });
    },
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].price * this.cart[i].order_time;
        this.total = total;
      }
    },
    handelSubmit() {
      let self = this;
      this.$axios
        .post("/orders", {
          cart: this.cart,
          total: this.total,
          user_id: this.user_id
        })
        .then(function(res) {
          console.log(res);
        });
      alert("Đã gửi yêu cầu mua hàng");
      self.$router.push("/");
      localStorage.removeItem("cart");
      self.$store.commit("setCart", []);
    }
  }
};
</script>
<style scoped>
img {
  object-fit: cover;
  width: 100px;
  height: 100px;
}

#payment {
  margin-left: 350px;
}

tbody tr td {
  padding-left: 50px;
}

thead tr td {
  padding-left: 50px;
}
</style>
