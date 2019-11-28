<template>
  <div>
    <qrcode-vue :value="value" size="250" level="H" style="margin : 100px 500px"></qrcode-vue>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
export default {
  mounted() {
    if (this.$store.state.token) {
      this.getUsers();
    } else {
      this.$router.push("/");
    }
  },
  data() {
    return {
      value: "http://localhost:3000/products/details/9",
    };
  },
  components: {
    QrcodeVue
  }
};
</script> 
