<template>
  <div>
    <shopHeader @products="products=$event"></shopHeader>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <shopNav></shopNav>
          </div>

          <div class="col-sm-9 padding-right">
            <div class="blog-post-area">
              <h2 class="title text-center">Latest From our Blog</h2>
              <div class="single-blog-post"></div>
              <div class="single-blog-post"></div>
              <div class="single-blog-post"></div>
              <div class="pagination-area">
                <ul class="pagination">
                  <li>
                    <a href class="active">1</a>
                  </li>
                  <li>
                    <a href>2</a>
                  </li>
                  <li>
                    <a href>3</a>
                  </li>
                  <li>
                    <a href>
                      <i class="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <shopFooter></shopFooter>
  </div>
</template>
<script>
import shopHeader from "~/components/shopHeader.vue";
import shopFooter from "~/components/shopFooter.vue";
import shopNav from "~/components/shopNav.vue";
export default {
  data: function() {},
  components: {
    shopHeader,
    shopFooter,
    shopNav
  }
};
</script>