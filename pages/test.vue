<template>
  <div>
    <h2 style="margin-top:10px" class="title text-center">Đánh giá sản phẩm</h2>
    <div>
      <div>
        <label style="margin:20px 0 30px 420px" for="viet_bai_danh_gia">Đánh giá sản phẩm</label>
        <input
          class="input_rating"
          type="text"
          v-model="form.comment"
          id="viet_bai_danh_gia"
          placeholder="Viết bình luận..."
        />
        <star-rating
          :show-rating="false"
          @rating-selected="setRating"
          v-model="form.rating"
          v-bind:star-size="20"
          :increment="0.5"
        ></star-rating>
        <b-button variant="info" style="float:right" @click="handleSubmit">Comment</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs'
export default {
  name: 'app',
  data() {
    return {
      isConnected: false,
      name: '',
      email: '',
      personalID: '',
      picture: '',
      FB: undefined
    }
  },
  components: {
    facebookLogin
  },
  methods: {
    getUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
        user => {
          this.personalID = user.id;
          this.email = user.email;
          this.name = user.name;
          this.picture = user.picture.data.url;
        }
      )
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    onLogin() {
      this.isConnected = true
      this.getUserData()
    },
    onLogout() {
      this.isConnected = false;
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: flex-start
}
.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  ;
  border-radius: 20px;
  /* display:inline-block; */
}
.login {
  width: 200px;
  margin: auto;
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
</style>