<template>
  <div>
    <adminNav />
    <div>
      <admin />
      <div style class="col-sm-9 col-lg-10 sidebar">
        <h1 style="margin-bottom:50px">Xin chào : {{user_name}}</h1>
        <br />
        <line-chart v-if="loaded" :data="arr"></line-chart>
        <h5>Bản đồ Order trong tháng {{month}}</h5>
        <b-form-input style="width:30%" v-model="month" @change="getByMonth" type="month"></b-form-input>
        <b-table striped hover :items="arr"></b-table>
      </div>
    </div>
  </div>
</template>
<script>
import { format } from "path";
const Cookie = process.client ? require("js-cookie") : undefined;
import adminNav from "~/components/adminNav.vue";
import admin from "~/components/admin.vue";
export default {
  head: { title: "Home" },
  mounted() {
    this.getDecoded();
  },
  components: {
    adminNav,
    admin
  },
  data() {
    return {
      user_name: "",
      month: "",
      months: [],
      arr: [],
      loaded: false
    };
  },
  methods: {
    getDecoded() {
      let self = this;

      this.$axios.get("/users/decoded").then(function(res) {
        self.user_name = res.data.decoded.user_name;
        self.role = res.data.decoded.user_role;
        if (self.role == 0) {
          self.$router.push("/");
        }
      });
    },
    getByMonth() {
      let self = this;
      let total = 0;
      this.arr = [];
      for (let i = 1; i < 32; i++) {
        let money = 0;
        let new_date = "";
        if (i < 10) {
          new_date = this.month + "-0" + i;
        } else {
          new_date = this.month + "-" + i;
        }
        this.$axios.get("/orders/get/by-day?date=" + new_date).then(res => {
          if (res.data.data.rows.length) {
            res.data.data.rows.forEach(element => {
              money += parseInt(element.total_price);
            });
            self.arr.push([new_date, money]);
            self.loaded = true;
          }
        });
      }
    }
  }
};
</script>
