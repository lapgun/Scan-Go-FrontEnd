<template>
  <div>
    <div v-for="(n,index) in pageOffset" :key="index">
      <img :src="'https://picsum.photos/800/150/?image='+index" alt />
      <h6>Image Description {{index +1}} hey hey hey heyyyy</h6>
    </div>
    <footer>
      <div ref="infinitescrolltrigger" id="scoll-trigger">
        <div class="circle-loader"></div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      currentPage: 1,
      maxPerPage: 3,
      totalResults: 100,
      showloader: false
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage);
    },
    pageOffset() {
      return this.maxPerPage * this.currentPage;
    }
  },
  methods: {
    scrollTrigger() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (
            entry.intersectionRatio > 0 &&
            this.currentPage < this.pageCount
          ) {
            this.showloader = true;
            setTimeout(() => {
              this.currentPage += 1;
              this.showloader = false;
            }, 2000);
          }
        });
      });
      observer.observe(this.$refs.infinitescrolltrigger);
    }
  },
  mounted() {
    this.scrollTrigger();
  }
};
</script>