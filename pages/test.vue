<template>
  <div>
    <line-chart :data="chartData"></line-chart>
  </div>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs'
export default {
  name: 'app',
  data() {
    return {
     chartData :{
       '2019-12-10' : 4,
       '2019-12-11' : 1,
       '2019-12-12' : 7,
     }
    }
  }
}
</script>