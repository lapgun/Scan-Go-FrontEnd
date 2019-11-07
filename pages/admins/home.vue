<template>
    <div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar" style="margin-top:-100px">
		<div class="profile-sidebar">
			<div class="profile-userpic">
				<img src="http://placehold.it/50/30a5ff/fff" class="img-responsive" alt="">
			</div>
			<div class="profile-usertitle">
				<div class="profile-usertitle-name">Admin</div>
				<div class="profile-usertitle-status"><span class="indicator label-success"></span>Online</div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="divider"></div>
		<form role="search">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Search">
			</div>
		</form>
		<ul class="nav menu" style="display:block">
			<li class="active"><a @click="$router.push('/admins/home')"> Home</a></li>
			<li><a @click="$router.push('/categories')">Categories</a></li>
			<li><a @click="$router.push('/products')"> Products</a></li>
			<li><a @click="$router.push('/orders')"> Orders</a></li>
			<li><a @click="$router.push('/order_details')"> Order_details</a></li>
			<li><a @click="$router.push('/order_products')"> Order_products</a></li>
			<li><a @click="$router.push('/order_statuses')"> Order_statuses</a></li>
			<li><a @click="$router.push('/users')"> Users</a></li>
			<li><a @click="handleLogout"> Logout</a></li>
		</ul>
	</div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    data : function(){
        
	},
	methods :{
		handleLogout : function(){
			Cookie.remove("token");
      		this.$store.commit("setToken", null);
      		this.$router.push("/admins/login");
		}
	}
}
</script>