<template>
  <div>
    <shopHeader></shopHeader>
    <section>
      <div class="container">
        <section id="cart_items">
          <div class="container">
            <div class="breadcrumbs">
              <ol class="breadcrumb">
                <li>
                  <a href="#" @click="$router.push('/')">Trang chủ</a>
                </li>
                <li class="active">Giỏ hàng</li>
              </ol>
            </div>
            <div class="table-responsive cart_info">
              <table class="table table-condensed">
                <thead>
                  <tr class="cart_menu">
                    <td class="image">Sản phẩm</td>
                    <td class="description">Tên</td>
                    <td class="quantity">Số lượng</td>
                    <td class="price">Giá tiền</td>
                    <td class="total">Toàn bộ</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in cart" :key="index">
                    <template>
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
                      <td class="cart_quantity">
                        <div class="cart_quantity_button">
                          <template v-if=" 1 < item.order_time">
                            <a
                              class="cart_quantity_down btn btn-success"
                              @click="decrement(item.id)"
                            >-</a>
                          </template>
                          <template v-else>
                            <a class="cart_quantity_down btn btn-success">-</a>
                          </template>
                          <div
                            class="cart_quantity_input"
                            type="text"
                            autocomplete="off"
                            size="2"
                          >{{item.order_time}}</div>
                          <a class="cart_quantity_up btn btn-success" @click="increment(item.id)">+</a>
                        </div>
                      </td>
                      <td>{{currency(item.price)}}</td>
                      <td class="cart_total">
                        <p class="cart_total_price">{{currency(item.price * item.order_time)}}</p>
                      </td>
                      <td class="cart_delete">
                        <a class="cart_quantity_delete" @click="removeItem(index)">
                          <i class="fa fa-times"></i>
                        </a>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <!--/#cart_items-->
        <section id="do_action">
          <div class="container">
            <div class="heading">
              <h3>Bạn muốn thanh toán?</h3>
              <p>Chọn nếu bạn có một mã hoặc thưởng giảm điểm bạn muốn sử dụng hoặc muốn để ước tính chi phí giao hàng của bạn.</p>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="total_area">
                  <ul>
                    <li>
                      Giá tiền
                      <span>{{currency(total)}}</span>
                    </li>
                    <li>
                      VAT
                      <span>10%</span>
                    </li>
                    <li>
                      Phí vận chuyển
                      <span>Miễn phí</span>
                    </li>
                    <li>
                      Tổng tiền
                      <span>{{currency(total + total * 10/100)}}</span>
                    </li>
                  </ul>
                  <a class="btn btn-default update" @click="$router.push('/')">Trở lại</a>
                  <a
                    class="btn btn-default check_out"
                    @click="$router.push('/shop/checkout')"
                  >Thanh toán</a>
                </div>
                <a href="#" @click="$router.push('/')">
                  <i class="fas fa-arrow-left"></i>
                  <h4 style="display:inline; margin-left:5px">Tiếp tục mua hàng</h4>
                </a>
              </div>
            </div>
          </div>
        </section>
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
        console.log(this.cart);
      }
    }
  },
  data() {
    return {
      cart: [],
      total: 0
    };
  },
  components: {
    shopHeader,
    shopFooter
  },
  mounted() {
    this.totalPrice();
    setTimeout(() => {
      this.quantity();
    }, 1000);
  },
  methods: {
    currency(x) {
      x = x.toLocaleString("currency", { style: "currency", currency: "VND" });
      return x;
    },
    setLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeItem(index) {
      this.cart.splice(index, 1);
      this.totalPrice();
      this.setLocalStorage();
    },
    increment(id) {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === id) this.cart[i].order_time++;
      }
      this.totalPrice();
      this.setLocalStorage();
    },
    decrement(id) {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === id) this.cart[i].order_time--;
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
    quantity() {
      this.cart.forEach(element => {
        element.order_time = 1;
        // this.$axios.put("/products/" + element.id).then(function(res) {
        //   console.log("update order times");
        // });
      });
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
.product_span {
  font-size: 20px;
}
.cart_quantity_input {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
