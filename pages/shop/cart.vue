<template>
  <div>
    <shopHeader></shopHeader>
    <section>
      <div class="container">
        <section id="cart_items">
          <div class="container">
            <div class="breadcrumbs">
              <ol class="breadcrumb">
                <li><a href="#">Home</a></li>
                <li class="active">Shopping Cart</li>
              </ol>
            </div>
            <div class="table-responsive cart_info">
              <table class="table table-condensed">
                <thead>
                <tr class="cart_menu">
                  <td class="image">Item</td>
                  <td class="description">Name</td>
                  <td class="price">Price</td>
                  <td class="quantity">Quantity</td>
                  <td class="total">Total</td>
                  <td></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in cart">
                  <template>
                    <td class="cart_product">
                      <a><img :src="`/${item.images? item.images.default_image: ''}`"></a>
                    </td>
                    <td class="cart_description">
                      <h4><a href="">{{item.name}}</a></h4>
                      <p>{{item.description}}</p>
                    </td>
                    <td class="cart_price">
                      <p>${{item.price}}</p>
                    </td>
                    <td class="cart_quantity">
                      <div class="cart_quantity_button">
                        <template v-if=" 1 < item.order_time">
                          <a class="cart_quantity_down btn btn-success" @click="decrement(item.id)">-</a>
                        </template>
                        <template v-else>
                          <a class="cart_quantity_down btn btn-success">-</a>
                        </template>
                        <input class="cart_quantity_input" type="text" v-model="item.order_time" autocomplete="off"
                               size="2">
                        <a class="cart_quantity_up btn btn-success" @click="increment(item.id)"> + </a>

                      </div>
                    </td>
                    <td class="cart_total">
                      <p class="cart_total_price">${{item.price * item.order_time}}</p>
                    </td>
                    <td class="cart_delete">
                      <a class="cart_quantity_delete" @click="removeItem(index)"><i class="fa fa-times"></i></a>
                    </td>
                  </template>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section> <!--/#cart_items-->

        <section id="do_action">
          <div class="container">
            <div class="heading">
              <h3>What would you like to do next?</h3>
              <p>Choose if you have a discount code or reward points you want to use or would like to estimate your
                delivery cost.</p>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="total_area">
                  <ul>
                    <li>
                      Cart Sub Total
                      <span>${{total}}</span>
                    </li>
                    <li>
                      VAT
                      <span>10%</span>
                    </li>
                    <li>
                      Shipping Cost
                      <span>Free</span>
                    </li>
                    <li>
                      Total
                      <span>${{total + total * 10/100}}</span>
                    </li>
                  </ul>
                  <a class="btn btn-default update" @click="$router.push('/')">Back</a>
                  <a class="btn btn-default check_out" @click="$router.push('/shop/checkout')">Check Out</a>
                </div>
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
        data() {
            return {
                cart: [],
                total: 0
            }
        },
        created() {
            if (process.browser) {
                if (Cookies.get("cart")) {
                    let cart = JSON.parse(Cookies.get("cart"));
                    return this.cart = cart;
                } else {
                    let cart = this.$store.getters.cart;
                    return this.cart = cart;
                }
            }
        },
        components: {
            shopHeader,
            shopFooter
        },
        mounted(){
          this.totalPrice()
        },
        methods: {
            setCookies() {
                Cookies.set("cart", this.cart)
            },
            removeItem(index) {
                this.cart.splice(index, 1);
                this.setCookies();
                this.totalPrice();
            },
            increment(id) {
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === id)
                        this.cart[i].order_time++
                }
                this.totalPrice();
                this.setCookies();

            },
            decrement(id) {
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === id)
                        this.cart[i].order_time--
                }
                this.totalPrice();
                this.setCookies();

            },
            totalPrice() {
                let total = 0;
                for (let i = 0; i < this.cart.length; i++) {
                    total += this.cart[i].price * this.cart[i].order_time;
                    this.total = total
                }
            }
        }
    }
</script>
<style scoped>
  img {
    object-fit: cover;
    width: 100px;
    height: 100px;
  }
</style>
