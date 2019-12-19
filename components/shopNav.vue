<template>
  <div>
    <div class="left-sidebar">
      <h2>DANH MỤC SẢN PHẨM</h2>
      <div class="mainmenu pull-left" v-for="(cat,index) in cats" :key="index">
        <ul class="nav navbar-nav collapse navbar-collapse">
          <li style="display:block" class="dropdown">
            <a href="#" @click="$router.push('/shop/product/'+cat.id)">
              {{cat.name}}
              <i class="fa fa-angle-down"></i>
            </a>
            <ul role="menu" class="sub-menu">
              <li li v-for="(menu,key) in menus" :key="key" v-show="menu.cat_parent == cat.id">
                <a href="#" @click="$router.push('/shop/product/'+menu.id)">{{menu.name}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cats: [],
      menus: []
    };
  },
  mounted() {
    this.getCatParent();
    this.getCatProduct();
  },
  methods: {
    getCatParent() {
      let self = this;
      let id = 0;
      this.$axios.get("/categories/cat_parent/" + id).then(function(res) {
        self.cats = res.data.data.rows;
      });
    },
    getCatProduct() {
      let self = this;
      this.$axios.get("/categories/cat_product").then(function(res) {
        self.menus = res.data.data.rows;
      });
    }
  }
};
</script>