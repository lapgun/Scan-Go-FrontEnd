<template>
  <div>
    <div class="left-sidebar">
      <h2>DANH MỤC SẢN PHẨM</h2>
      <div class="panel-group category-products" id="accordian">
        <!--category-productsr-->
        <div v-for="(cat,index) in cats" :key="index" class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a data-toggle="collapse" data-parent="#accordian" :href="'#a'+cat.id">
                <span class="badge pull-right">
                  <i class="fa fa-plus"></i>
                </span>
                {{cat.name}}
              </a>
            </h4>
          </div>
          <div :id="'a'+cat.id" class="panel-collapse collapse">
            <div class="panel-body">
              <ul>
                <li v-for="(menu,key) in menus" :key="key" v-show="menu.cat_parent == cat.id">
                  <a href="#">{{menu.name}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!--/category-products-->

      <div class="brands_products">
        <!--brands_products-->
        <h2>Brands</h2>
        <div class="brands-name">
          <ul class="nav nav-pills nav-stacked">
            <li>
              <a href="#">
                <span class="pull-right">(50)</span>Acne
              </a>
            </li>
            <li>
              <a href="#">
                <span class="pull-right">(56)</span>Grüne Erde
              </a>
            </li>
            <li>
              <a href="#">
                <span class="pull-right">(27)</span>Albiro
              </a>
            </li>
            <li>
              <a href="#">
                <span class="pull-right">(32)</span>Ronhill
              </a>
            </li>
            <li>
              <a href="#">
                <span class="pull-right">(5)</span>Oddmolly
              </a>
            </li>
            <li>
              <a href="#">
                <span class="pull-right">(9)</span>Boudestijn
              </a>
            </li>
            <li>
              <a href="#">
                <span class="pull-right">(4)</span>Rösch creative culture
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!--/brands_products-->

      <div class="price-range">
        <!--price-range-->
        <h2>Price Range</h2>
        <div class="well text-center">
          <input
            type="text"
            class="span2"
            value
            data-slider-min="0"
            data-slider-max="600"
            data-slider-step="5"
            data-slider-value="[250,450]"
            id="sl2"
          />
          <br />
          <b class="pull-left">$ 0</b>
          <b class="pull-right">$ 600</b>
        </div>
      </div>
      <!--/price-range-->

      <div class="shipping text-center">
        <!--shipping-->
        <img src="~assets/images/home/shipping.jpg" alt />
      </div>
      <!--/shipping-->
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      cats: [],
      menus: []
    };
  },
  mounted: function() {
    this.getCatParent();
    this.getCatProduct();
  },
  methods: {
    getCatParent: function() {
      let self = this;
      this.$axios.get("/categories/cat_parent").then(function(res) {
        console.log(res);
        self.cats = res.data.data.rows;
        console.log(self.cats);
      });
    },
    getCatProduct: function() {
      let self = this;
      this.$axios.get("/categories/cat_product").then(function(res) {
        console.log(res);
        self.menus = res.data.data.rows;
      });
    }
  }
};
</script>