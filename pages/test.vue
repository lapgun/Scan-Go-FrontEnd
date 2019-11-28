 <template>
  <div>
    <div id="status"></div>
    <div id="wrap">
      <h1 style="height:2000px;background: red">Hello</h1>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.scroll();
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        var container = document.getElementById("container");
        var wrap = document.getElementById("wrap");
        var contentHeight = wrap.offsetHeight;
        var y = window.pageYOffset + window.innerHeight;
        console.log(wrap.offsetHeight);
        console.log(window.innerHeight);
        if (y >= contentHeight) {
          wrap.innerHTML +=
            '<h1 style="height:1000px;background: black">ADD</h1>';
        }
        var status = document.getElementById("status");
        status.innerHTML = contentHeight + " | " + y;
      };
    }
  }
};
</script>
<style scoped>
#status {
  position: fixed;
  color: aliceblue;
}
</style>
