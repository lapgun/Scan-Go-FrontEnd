<template>
  <div>
    <section class="section" id="app">
      <div class="columns">
        <div class="column is-4">
          <div class="card">
            <div class="card-content">
              <div class="card-carousel">
                <div class="card-img">
                  <b-carousel
                    id="carousel"
                    v-model="slide"
                    :indicator="1110"
                    controls
                    @sliding-start="onSlileStart"
                    @sliding-end="onSlileEnd"
                    :visible-slides="3"
                    :slide-ratio="1/4"
                  >
                    <div v-for="image in images" :key="image.id">
                      <b-carousel-slide
                        :img-src="`/${image.slide_images ? image.slide_images.default_image : ''}`"
                      ></b-carousel-slide>
                    </div>
                  </b-carousel>
                </div>
                <div class="thumbnails">
                  <span
                    v-for="(image, index) in  images"
                    :key="image.id"
                    :class="['thumbnail-image', (activeImage == index) ? 'active' : '']"
                    @click="activateImage(index)"
                  >
                    <img
                      style="width:200px; height:150px; display:inline"
                      :src="`/${image.slide_images ? image.slide_images.default_image : ''}`"
                    />
                  </span>
                </div>
              </div>
              <p>Card description.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getSlide();
  },
  data: function() {
    return {
      images: [],
      //Index of the active image on the images array
      activeImage: 0,
      slide: 0,
      sliding: null,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2
    };
  },
  computed: {
    currentImage() {
      return this.images[this.activeImage].big;
    }
  },
  methods: {
    getSlide() {
      let self = this;
      this.$axios.get("/slide").then(function(res) {
        self.images = res.data.rows;
      });
    },
    nextImage() {
      var active = this.activeImage + 1;
      if (active >= this.images.length) {
        active = 0;
      }
      this.activateImage(active);
    },
    onSlileStart(slide) {
      this.sliding = true;
    },
    onSlileEnd(slide) {
      this.sliding = false;
    },
    activateImage(imageIndex) {
      this.activeImage = imageIndex;
    }
  }
};
</script>