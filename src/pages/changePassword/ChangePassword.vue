<template>
	<div class="changePas">
		<div class="changePasCont">
			<div class="title">修改密码</div>
			<div class="changeText">
				<div>
					<label>用户名：</label>
					<span class="nameTxt">{{userName}}</span>
				</div>
				<div>
					<label>姓名：</label>
					<span class="nameTxt">{{$store.state.app.nikeName}}</span>
				</div>
				<div>
					<label>原密码：</label>
					<input type="password" v-model='oldPassword' @blur='checkOldPasw'>
					<div class="errorTxt" v-if='!oldPasswError'>
						<img src="static/error.png">
						<span>密码输入错误</span>
					</div>
				</div>
				<div>
					<label>新密码：</label>
					<input type="password" v-model='newPassword' @blur='newPasFun()'>
					<div class="paswTip">请输入6-16位密码，区分大小写，不能使用空格！</div>
					<div class="errorTxt" v-if='newPasswError'>
						<img src="static/error.png">
						<span>密码输入错误</span>
					</div>
				</div>
				<div>
					<label>确认新密码：</label>
					<input type="password" v-model='confirmPassword' @blur='testPas()'>
					<div class="redColor">{{wrongText}}</div>
				</div>
			</div>
			<div class="changeBtn" v-tap='{methods:changePasFun}'>
				<span>确认修改</span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				oldPasswError:true,
				newPasswError:false,
				oldPassword:"",
				newPassword:"",
				confirmPassword:"",
				wrongText:"",
				userName:""
			}
		},
		methods:{
			changePasFun(){
				this.$http.post(this.$store.state.app.host + 'api/Account/ChangePassword',{
					OldPassword:this.oldPassword,
					NewPassword:this.newPassword,
					ConfirmPassword:this.confirmPassword
				},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.status == 200){
							this.oldPasswError = false
							this.$root.goRouter({
								router:'/login'
							})
						}else{
							this.oldPasswError = true
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")            
					}
				)
			},
			newPasFun(){
				if(this.newPassword){
					var regExp = /^(\d{6,16})|((?! )(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_]{6,16})$/
					if(!regExp.test(this.newPassword)){
						this.newPasswError = true
					}else{
						this.newPasswError = false
					}

				}
			},
			testPas(){
				if(this.confirmPassword&&this.newPassword){
					if(this.confirmPassword != this.newPassword){
						this.wrongText = "与新密码不同"
					}else{
						this.wrongText = ""
					}
				}

			},
			checkOldPasw(){
				if(this.oldPassword){
					this.$http.post(this.$store.state.app.host + 'api/Account/CheckPassword',{
						password:this.oldPassword
					},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
					.then(
						function(res){
							if(res.data.Code == 0){
								this.oldPasswError = res.data.Result
							}
						},
						function(err){
						    this.$layer.msg("网络连接超时")            
						}
					)
				}else{
					this.oldPasswError = true
				}
				
			}
		},
		created(){
			// this.$store.state.app.host = this.$root.get("AppHost")
			this.$store.state.app.token = this.$root.get("AppToken")
			this.$store.state.app.nikeName = this.$root.get("NikeName")
			this.userName = this.$root.get('UserName')
		}
	}
</script>
<style type="text/css">
	@import url(./changePassword.css);
</style>