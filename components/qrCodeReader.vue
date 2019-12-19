<template>
  <div class="qrCodeReader">
    <p class="error">{{ error }}</p>
    <a @click="changeCamera">
      <a v-if="!isCamera"><i class="fa fa-qrcode"  aria-hidden="true"></i></a>
      <a  v-else>Quay lai</a>
      <a v-if="!result"></a>
      <a v-else :href="result">xác nhận thanh toán</a>
    </a>
    <qrcode-stream v-if="isCamera" @decode="onDecode" @init="onInit"/>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                result: '',
                error: '',
                isCamera: false
            }
        },

        methods: {
            onDecode(result) {
                this.result = result;
            },
            async onInit(promise) {
                try {
                    await promise
                } catch (error) {
                    if (error.name === 'NotAllowedError') {
                        this.error = "ERROR: you need to grant camera access permisson"
                    } else if (error.name === 'NotFoundError') {
                        this.error = "ERROR: no camera on this device"
                    } else if (error.name === 'NotSupportedError') {
                        this.error = "ERROR: secure context required (HTTPS, localhost)"
                    } else if (error.name === 'NotReadableError') {
                        this.error = "ERROR: is the camera already in use?"
                    } else if (error.name === 'OverconstrainedError') {
                        this.error = "ERROR: installed cameras are not suitable"
                    } else if (error.name === 'StreamApiNotSupportedError') {
                        this.error = "ERROR: Stream API is not supported in this browser"
                    }
                }
            },
            changeCamera() {
                this.isCamera = !this.isCamera;
                this.result = '';
            }
        }
    }
</script>
<style scoped>
  .error {
    font-weight: bold;
    color: red;
  }
  .qrCodeReader {
    position: fixed;
    width: 400px;
    height: 400px;
    bottom: 0%;
    right: 0%;
    text-align: right;
  }
</style>

