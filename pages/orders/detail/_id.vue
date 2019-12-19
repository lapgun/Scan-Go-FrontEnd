<template>
  <div class="container" v-if="loaded">
    <h3>Order Detail</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>STT</th>
          <th>Customer_id</th>
          <th>Customer_name</th>
          <th>Order_status</th>
          <th>Total_price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{orders.id}}</td>
          <td>{{orders.customerId}}</td>
          <td>{{orders.user ? orders.user.name : ""}}</td>
          <td v-if="orders.order_status == 0">Đang chờ xử lí</td>
          <td v-if="orders.order_status == 1">Đã thanh toán</td>
          <td v-if="orders.order_status == 2">Đã hủy đơn hàng</td>
          <td>{{currency(orders.total_price)}}</td>
        </tr>
      </tbody>
    </table>

    <h3>Product's list</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,key) in products" :key="key">
          <td>{{key}}</td>
          <td>{{product.id}}</td>
          <td>{{product.name}}</td>
          <td>{{order_products[key].quantity}}</td>
          <td>{{currency(product.price)}}</td>
          <td>{{currency(order_products[key].quantity * product.price)}}</td>
        </tr>
      </tbody>
    </table>
    <b-button variant="dark" @click="$router.push('/orders')">Trở lại</b-button>
  </div>
  <div class="text-center" v-else>
    <b-button variant="success" disabled>
      <b-spinner type="grow"></b-spinner>Loading...
    </b-button>
  </div>
</template>
<script>
export default {
  head: { title: "Chi tiết order" },
  mounted() {
    this.getOrders();
    setTimeout(() => {
      this.getProducts();
    }, 1000);
  },
  data() {
    return {
      orders: [],
      order_products: [],
      products: [],
      loaded: false
    };
  },
  methods: {
    getOrders() {
      let self = this;
      this.$axios.get("/orders/" + this.$route.params.id).then(function(res) {
        console.log(res);
        self.orders = res.data;
        self.order_products = res.data.order_products;
      });
    },
    getProducts() {
      let self = this;
      self.order_products.forEach(element => {
        this.$axios.get("/products/" + element.productId).then(function(res) {
          let pro = res.data.data;
          self.products.push(pro);
        });
      });
      this.loaded = true;
    },
    currency(x) {
      x = x.toLocaleString("currency", { style: "currency", currency: "VND" });
      return x;
    }
  }
};
</script>
