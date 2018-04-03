<template>
	<div class="headTitle">
		<div class="logoImg">
			<img src="static/logo.png">
		</div>
		<div class="titleText">签证助手管理系统</div>
		<div class="titleRight">
			<div>
				欢迎：{{$store.state.app.nikeName}}
			</div>
			<div v-tap='{methods:checkUserInfo}'>
				我的账户
				<img class="dropdownBtn" src="static/dropdown.png" :class='showDropdown?"":"tran90"'>
			</div>
			<div class="userDropdown" v-if='showDropdown'>
				<ul>
					<!-- <li v-tap='{methods:goSetting}'>通用设置</li> -->
					<li v-tap='{methods:changePasw}'>修改密码</li>
					<li class="logout" v-tap='{methods:logout}'>退出</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				userName:'张三',
				showDropdown:false
			}
		},
		methods:{
			checkUserInfo(par){
				this.showDropdown = !this.showDropdown
			},
			goSetting(par){
				this.$root.goRouter({
					router:'/setting'
				})
				this.showDropdown = !this.showDropdown
				this.$root.set('isIvisa','setting')
			},
			changePasw(par){
				this.showDropdown = !this.showDropdown
				// forgotPassword
				this.$root.goRouter({
					router:'/changePassword'
				})
			},
			logout(par){
				this.showDropdown = !this.showDropdown
				this.$http.post(this.$store.state.app.host + 'api/Account/Logout',{},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0 ){
							this.$root.goRouter({
								router:'/login'
							})
							// var userName = this.$root.get("UserName")
							// var password = this.$root.get("Password")
							// var remember = this.$root.get("Remember")
							// window.localStorage.clear()
							// this.$root.set("UserName",userName)
							// this.$root.set("Password",password)
							// this.$root.set("Remember",remember)
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")            
					}
				)
			}
		},
		mounted(){
			this.$store.state.app.nikeName = this.$root.get("NikeName")
			// this.$store.state.app.host = this.$root.get("AppHost")
			this.$store.state.app.token = this.$root.get("AppToken")
			this.showDropdown = this.$store.state.app.showDropdown
		}
	}
</script>
<style type="text/css">
	@import url(./header.css);
</style>