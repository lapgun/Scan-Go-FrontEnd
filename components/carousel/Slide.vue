<template>
    <div class="slide">
      <img v-bind:src="`/${slide.slide_images ? slide.slide_images.default_image : ''}`">
    </div>
</template>
<script>
export default {
    data() {
      return {

      }
    },
    props: {
        slide : ['slide']
    }
}
</script>