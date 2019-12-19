<template>
  <div>
    <div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
      <div class="profile-sidebar">
        <div class="profile-userpic">
          <img src="http://placehold.it/50/30a5ff/fff" class="img-responsive" alt />
        </div>
        <div class="profile-usertitle">
          <div class="profile-usertitle-name">Admin</div>
          <div class="profile-usertitle-status">
            <span class="indicator label-success"></span>Online
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="divider"></div>

      <ul class="nav menu" style="display:block">
        <li>
          <a @click="$router.push('/user/home')">Home</a>
        </li>
        <li>
          <a @click="$router.push('/categories')">Categories</a>
        </li>
        <li>
          <a @click="$router.push('/products')">Products</a>
        </li>
        <li>
          <a @click="$router.push('/orders')">Orders</a>
        </li>
        <li>
          <a @click="$router.push('/slide')">Slide</a>
        </li>
        <li>
          <a @click="$router.push('/comment')">Comment</a>
        </li>
        <li>
          <a @click="$router.push('/slide')">Slide</a>
        </li>
        <li>
          <a @click="$router.push('/user')">Users</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {};
</script>