<template>
  <div class="container">
    <h3>Order Detail Processing</h3>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>STT</th>
        <th>Customer Name</th>
        <th>Order Status</th>
        <th>Total Price</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{stt+1}}</td>
        <td>{{orders.user ? orders.user.name : undefined}}</td>
        <td v-if="orders.order_status == 0">Đang chờ xử lí</td>
        <td v-if="orders.order_status == 1">Đã thanh toán</td>
        <td v-if="orders.order_status == 2">Đã hủy đơn hàng</td>
        <td>{{orders.total_price}}</td>
      </tr>
      </tbody>
    </table>

    <h3>Danh sách sản phẩm</h3>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>STT</th>
        <th>Product ID</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product,key) in products" :key="key">
        <td>{{key+1}}</td>
        <td>{{product.id}}</td>
        <td>{{product.name}}</td>
        <td>{{order_products[key].quantity}}</td>
        <td>{{product.price}}</td>
        <td>{{order_products[key].quantity * product.price}}</td>
      </tr>
      </tbody>
    </table>
    <b-button variant="dark" @click="$router.push('/orders')">Trở lại</b-button>
  </div>
</template>
<script>
    export default {
        head: {title: "Chi tiết order"},
        mounted() {
            this.getOrders();
            setTimeout(() => {
                this.getProducts();
            }, 1000);
        },
        data() {
            return {
                stt: 0,
                orders: [],
                order_products: [],
                products: []
            };
        },
        methods: {
            getOrders() {
                let self = this;
                this.$axios.get("/orders/" + this.$route.params.id).then(function (res) {
                    self.orders = res.data;
                    self.order_products = res.data.order_products;
                });
            },
            getProducts() {
                let self = this;
                self.order_products.forEach(element => {
                    this.$axios.get("/products/" + element.productId).then(function (res) {
                        let pro = res.data.data;
                        self.products.push(pro);
                    });
                });
            }
        }
    };
</script>
