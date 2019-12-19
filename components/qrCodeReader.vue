<template>
  <div>
    <a @click="changeCamera">
      <a class="qrcode" v-if="!isCamera" href="#">
        Quét mã Qrcode
        <i class="fas fa-qrcode" aria-hidden="true"></i>
      </a>
      <a class="qrcode_next" href="#" v-else>Quay lại</a>
      <a v-if="!result"></a>
      <a class="qrcode_code" v-else :href="result">Xác nhận thanh toán</a>
    </a>
    <div class="qrCodeReader">
      <qrcode-stream v-if="isCamera" @decode="onDecode" @init="onInit" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: "",
      isCamera: false
    };
  },

  methods: {
    onDecode(result) {
      this.result = result;
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    changeCamera() {
      this.isCamera = !this.isCamera;
      this.result = "";
    }
  }
};
</script>
<style scoped>
.error {
  font-weight: bold;
  color: red;
}
.qrCodeReader {
  width: 500px;
  position: fixed;
  height: 500px;
  bottom: 10%;
  right: 0%;
}
.qrcode {
  width: 200px;
  position: fixed;
  height: 70px;
  font-size: 20px;
  right: 2%;
  margin-left: 1900px;
  background: #f5f5ed;
  color: black;
  bottom: 4%;
  padding: 20px 0 0 15px;
  text-decoration: none;
}
.qrcode_next,
.qrcode_code {
  font-size: 20px;
  position: fixed;
  bottom: 58%;
  background: #f5f5ed;
  text-decoration: none;
}
.qrcode_code {
  right: 10%;
  width: 230px;
  height: 40px;
  padding: 7px 0 0 20px;
}
.qrcode_next {
  right: 18%;
  width: 110px;
  height: 40px;
  padding: 7px 0 0 15px;
}
</style>

