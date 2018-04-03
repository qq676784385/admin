<template>
	<div class="loginBg">
		<!-- <iframe src="static/ww.doc" width="400" height="500"></iframe> -->
		<div class="loginBgImg">
			<img src="static/bg.jpg" width="100%" height="100%">
		</div>
		<div class="logo">
			<span>签证助手管理系统</span>
		</div>
		<div class="loginCont">
			<div class="title">
				<div class="titleBg">
					<img src="static/title.png" width="100%" height="50px">
				</div>
				<span class="titleTxt">用户登录</span>
			</div>
			<div class="titleImg">
				<img src="static/touxiang.png" width="79px" height="79px">
			</div>
			<div class="text">
				<div class="u_part">
					<div class="parImg"><img src="static/user.png"></div>
					<input class="user" type="text" name="" placeholder="用户名" v-model='userName'>
				</div>
				<div class="u_part">
					<div class="parImg"><img src="static/password.png"></div>
					<input class="pasw" type="password" name="" placeholder="密码" v-model='password'>
				</div>

			</div>
			<div class='rember wrong'>{{wrongTxt}}</div>
			<div class="rember">
				<input type="checkbox" v-model='isPersistent'>
				<span>记住我</span>
			</div>
			<div v-tap='{methods:loginFun}'>
				<img src="static/loginbtn.png">
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	// import './test.scss'
	export default{
		data(){
			return {
				userName:"", //管理员1
				password:"",
				isPersistent:true,
				wrongTxt:"",
				today:"",
				canLogin:true
			}
		},
		methods:{
			loginFun(){
				if(this.canLogin){
					this.canLogin = false
					this.$http.post(this.$store.state.app.host + "api/Account/Login",{LoginName:this.userName,Password:this.password,IsPersistent:this.isPersistent},{timeout: this.$store.state.app.httpTime})
					.then(
						function(res){
							if(res.data.Code == 0){
								this.canLogin = true
								this.wrongTxt = ""
								this.$store.state.app.token = "Bearer "+ res.data.Result.AccessToken
								this.$store.state.app.nikeName = res.data.Result.NikeName
								// Type
								// 1--- 顾客； 2---操作员； 3---管理员； 4---超级管理员；
								this.$store.state.app.isLeader = res.data.Result.Type
								if(res.data.Result.Type>2){
									this.$root.set('addBgId',"1")
									this.$root.set('isIvisa',"visa1")
									this.$root.set('showIndex',"1")

									// this.$root.goRouter({
									// 	router:'/visaInfo/1'
									// })

									if(window.location.href.indexOf("8060")>0){
										this.$root.goRouter({
											router:'/visaInfo/1'
										})
									}else{
										window.location.href = this.$store.state.app.host+"admin/#/visaInfo/1"
									}

								}else{
									this.$root.set('addBgId',"7")
									this.$root.set('isIvisa',"task1")
									this.$root.set('showIndex',"2")

									// this.$root.goRouter({
									// 	router:'/visaInfo/7'
									// })
									if(window.location.href.indexOf("8060")>0){
										this.$root.goRouter({
											router:'/visaInfo/7'
										})
									}else{
										window.location.href = this.$store.state.app.host+"admin/#/visaInfo/7"
									}



								}
								this.$root.set("AppToken",this.$store.state.app.token)
								// this.$root.set("AppHost",this.$store.state.app.host)
								this.$root.set("NikeName",this.$store.state.app.nikeName)
								this.$root.set("IsLeader",this.$store.state.app.isLeader)
								this.$root.set("UserName",res.data.Result.UserName)

								this.$root.set("Remember",this.isPersistent)
								if(this.isPersistent){
									this.$root.set("Password",this.password)
								}else{
									this.$root.set("Password","")
								}
								this.$root.remove("Allinfo")
							}else{
								this.canLogin = true
								this.wrongTxt = "用户名或密码错误"
							}
						},
						function(err){
							this.canLogin = true
						    this.$layer.msg("网络连接超时")
						}
					)
				}

			}
		},
		mounted(){
			// console.log(window.location.href.split("/")[3].toUpperCase())
			if(this.$root.get("Remember") === "true"){
				this.userName = this.$root.get("UserName")
				this.password = this.$root.get("Password")
			}else{
				this.userName = ""
				this.password = ""
			}
			// this.$layer.closeAll()
		}
	}
</script>
<style type="text/css" src='./login.css'></style>

<!-- <style lang="scss" type="text/css" src='./test.scss'></style> -->
