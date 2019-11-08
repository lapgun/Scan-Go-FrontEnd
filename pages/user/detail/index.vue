<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header text-md-center" style="font-size: 20px;font-weight: bold">Thông tin người dùng</div>
          <div class="card-body" style="font-style: italic">
            <div class="row" v-if="user">
              <div class="col-12 col-md-8">
                <div class="form-group row">
                  <label
                         class="col-md-4 col-form-label text-md-left">Name</label>
                  <label class="col-md-4 col-form-label text-md-left">: {{userDetail.name}}</label>
                </div>
                <div class="form-group row">
                  <label
                         class="col-md-4 col-form-label text-md-left">Email</label>
                  <label class="col-md-8 col-form-label text-md-left">: {{userDetail.email}}</label>
                </div>
                <div class="form-group row">
                  <label
                         class="col-md-4 col-form-label text-md-left">Address</label>
                  <label class="col-md-4 col-form-label text-md-left">: {{userDetail.address}}</label>
                </div>
                <div class="form-group row">
                  <label
                         class="col-md-4 col-form-label text-md-right"></label>
                  <div class="col-md-6">
                    <span >
                      <button type="button" class="btn btn-primary" @click="$router.push('/user/edit')">Edit Profile</button>
                    </span>
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
    import _ from 'lodash'
    export default {
        computed:{
            user(){
                return _.cloneDeep(this.$store.state.user)
            }
        },
        data(){
            return{
                userDetail : _.cloneDeep(this.$store.state.user)
            }

        },
    }
</script>

<style scoped>

</style>
