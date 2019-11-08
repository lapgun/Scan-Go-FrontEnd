<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div
            class="card-header text-md-center"
            style="font-size: 20px;font-weight: bold"
          >Chỉnh Sửa thông tin</div>
          <div class="card-body" style="font-style: italic">
            <div class="row" v-if="user">
              <div class="col-12 col-md-8">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-left">Tên Người Dùng :</label>
                  <b-input class="col-md-8 col-form-label text-md-left" v-model="user.name"></b-input>
                </div>
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-left">Địa chỉ Email :</label>
                  <b-input class="col-md-8 col-form-label text-md-left" v-model="user.email"></b-input>
                </div>
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-left">Nơi Sinh Sống :</label>
                  <b-input class="col-md-8 col-form-label text-md-left" v-model="user.address"></b-input>
                </div>
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right"></label>
                  <div class="col-md-3">
                    <a>
                      <button type="button" class="btn btn-primary" @click="handelSubmit">Update</button>
                    </a>
                  </div>
                  <div class="col-md-3">
                    <a>
                      <button
                        type="button"
                        class="btn btn-dark"
                        @click="$router.push('/user/detail')"
                      >Back</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  // data(){
  //     return{
  //         form :{
  //             name :'',
  //             email : '',
  //             address :''
  //         }
  //     }

        // computed: {
        //     user() {
        //         return this.$store.state.user
        //     }
        // },
        // // data(){
        // //     return{
        // //         user :{
        // //             name :'',
        // //             email : '',
        // //             address :''
        // //         }
        // //     }
        // //
        // // },
        // methods: {
        //     handelSubmit() {
        //         let self = this;
        //         this.$axios.put('/users/edit' + this.user.id + this.user)
        //             .then(function (res) {
        //                 self.$router.push('/user/detail');
        //             })
        //     }
        // }
  // },
  methods: {
    handelSubmit() {
      let self = this;
      this.$axios
        .put("/users/edit" + this.user.id, this.user)
        .then(function(res) {
          self.$router.push("/user/detail");
        });
    }
  }
};
</script>

<style scoped>
/*#back {*/
/*  margin-right: 150px;*/
/*}*/
</style>
