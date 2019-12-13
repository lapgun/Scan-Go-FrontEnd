<template>
  <div>{{arr}}</div>
</template>
<script>
export default {
  mounted() {
    this.setRating();
  },
  data() {
    return {
      arr: { index12: "value" }
    };
  },
  methods: {
    setRating() {
      for (let i = 1; i < 11; i++) {
        let value = "value" + i;
        let index = 0;
        index++;
        this.arr.index = value;
      }
    }
  }
};
</script>
