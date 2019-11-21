<template>
  <div class="slides">
    <div class="slides-inner">
      <div v-for="(slide, index) in slides" :key="index">
        <Slide v-bind:slide="slide"></Slide>
      </div>
    </div>
  </div>
</template>
<script>
import Slide from "~/components/carousel/Slide.vue"
export default {
  mounted() {
    this.getSlides()
  },
  data() {
    return {
      slides : {
        id : '',
        name: '',
        slide_images :{
          default_image: ''
        }
      }
    };
  },
  methods: {
    getSlides() {
      let self = this
      this.$axios.get('/slide').then(function(res){
        console.log(res)
        self.slides = res.data.rows
      })
    }
  },
  components: {
    Slide
  }
};
</script>