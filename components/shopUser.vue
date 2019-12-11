<template>
  <div>
    <ul class="nav menu" style="display:block">
      <li class="active">
        <a @click="$router.push('/shop/user/detail/'+ user_id)">Thông tin tài khoản</a>
      </li>
      <li>
        <a @click="$router.push('/shop/user/cart/' + user_id)">Đơn hàng của tôi</a>
      </li>
      <li>
        <a @click="$router.push('/shop/user/changepassword/' + user_id)">Thay đổi mật khẩu</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      user_id: "",
    };
  },
  methods: {
    getUsers() {
      let self = this;
      this.$axios.get("/users/decoded").then(function(res) {
        self.user_id = res.data.decoded.user_id;
      });
    }
  }
};
</script>
