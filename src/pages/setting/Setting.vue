<template>
	<div class="setting">
		<div class="setTitle">
			<p>通用设置</p>
		</div>
		<div class="selectCity">
			<label>选择签证国家：</label>
			<select v-model='countryId' @change='generalSetting'>
				<!-- <option value = ''></option> -->
				<option v-for='item in countryList' :value='item.CountryId' >{{item.CountryName}}</option>
			</select>
		</div>
		<div class="selectedCont" v-if='countryId'>
			<div class="part1">
				<div class="title">{{countryName}}网站登录信息</div>
				<div class="userCont" v-for='userInfo in channelInfo'>
					<label>{{userInfo.title}}：</label>
					<!-- <input type="password" v-model='userInfo.Value' v-if='userInfo.Tag == "ZX0083"'> -->
					<input type="text" v-model='userInfo.Value' >
				</div>
			</div>
			<div class="part2" v-if='isGreenChannel.length>0'>
				<div class="line1">
					<p>绿通信息：</p>
					<div class="cont">
						<div v-for='(info,index) in isGreenChannel'>
							<div>
								<span v-if='info.IsMust'>*</span>
								<span>{{index+1}}、</span>
								<span v-html='info.title.replace("\n","<br/>")'></span>
								<!-- <div>{{info.title}}</div> -->
							</div>
							<select v-if='info.Options'>
								<!-- <option value=''></option> -->
								<option v-for='(opt,optIndex) in info.Options' :value='opt.Value'>{{opt.Value}}</option>
								<!-- <option v-for='opt in info.Options' :value='opt.Value' v-else >{{opt.Value}}</option> -->
							</select>
							<input v-if='!info.Options' v-model='info.Value' type="text" :title='info.Value'>
						</div>
					</div>
				</div>
				<div class="line2">
					<p>非绿通信息：</p>
					<div class="cont">
						<div v-for='(info,index) in noGreenChannel'>
							<div>
								<span v-if='info.IsMust'>*</span>
								<span>{{index+1}}、</span>
								<span v-html='info.title.replace("\n","<br/>")'></span>
							</div>
							<select v-if='info.Options'>
								<!-- <option value=''></option> -->
								<option v-for='(opt,optIndex) in info.Options' :value='opt.Value'>{{opt.Value}}</option>
								<!-- <option v-for='opt in info.Options' :value='opt.Value' v-else >{{opt.Value}}</option> -->
							</select>
							<input v-if='!info.Options' v-model='info.Value' type="text" :title='info.Value'>
						</div>
					</div>
				</div>
			</div>

		</div>

		<div class="btnGroup" v-if='countryId&&countryName != "美国EVUS"'>
			<button class="saveBtn" v-tap='{methods:saveInfo}'>保存</button>
			<button class="cancelBtn">取消</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				countryList:[],
				countryId:'',
				questions:[],
				TagList:[],
				countryName:"",

				channelInfo:[],
				isGreenChannel:[],
				noGreenChannel:[],

			}
		},
		methods:{
			getCountryList(){
				this.$http.get(this.$store.state.app.host + "api/Manage/GetCountrys",{headers:{Authorization: this.$store.state.app.token}})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.countryList = res.data.Result
						}
					}
				)
			},
			generalSetting(){
				for(var i = 0;i<this.countryList.length;i++){
					if(this.countryList[i].CountryId == this.countryId){
						this.countryName = this.countryList[i].CountryName
					}
				}
				this.$http.get(this.$store.state.app.host + "api/Manage/GeneralSettings",{params:{countryId:this.countryId},headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.questions = res.data.Result

							if(this.questions.length>0){
								this.isGreenChannel = []
								this.noGreenChannel = []
								this.channelInfo = []
								for(var i=0;i<this.questions.length;i++){
									if(!this.questions[i].Value)this.questions[i].Value = this.questions[i].DefaultValue
										switch(this.countryId){
											case 1:
												// 澳大利亚
												if(this.questions[i].Tag.match(new RegExp(/^ZX002503/))){
													// 绿通
													this.isGreenChannel.push(this.questions[i])
												}else if(this.questions[i].Tag.match(new RegExp(/^ZX002502/))){
													// 非绿通
													this.noGreenChannel.push(this.questions[i])
												}else{
													// 登录信息
													if(this.questions[i].Tag == "ZX0082"){
														this.channelInfo.push(this.questions[i])
													}
													if(this.questions[i].Tag == "ZX0083"){
														this.channelInfo.push(this.questions[i])
													}
												}
											break;
											case 3:
												// 新西兰
												if(this.questions[i].Tag.match(new RegExp(/^ZXXXLTY0/))){
													// 绿通
													this.isGreenChannel.push(this.questions[i])
												}else{
													// 非绿通
													this.noGreenChannel.push(this.questions[i])
												}
											break;
											case 4:
												this.channelInfo = res.data.Result
											break;
											default:
												this.channelInfo = res.data.Result

										}
										console.log(this.channelInfo);
								}
							}else{
								this.isGreenChannel = []
								this.noGreenChannel = []
								this.channelInfo = []
							}

							// console.log(this.isGreenChannel)
							// console.log(this.noGreenChannel)
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")
					}
				)
			},
			saveInfo(){
				// console.log(this.questions)
				this.$http.post(this.$store.state.app.host + 'api/Manage/SaveGeneralSettings',{
					CountryId:this.countryId,
					TagList:this.questions
				},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$layer.msg("已保存修改！")
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")
					}
				)
			}
		},
		mounted(){
			// this.$store.state.app.host = this.$root.get("AppHost")
			this.$store.state.app.token = this.$root.get("AppToken")
			this.$store.state.app.ivisaId = this.$root.get("IvisaId")
			this.getCountryList()
		},
		updated(){
		}
	}
</script>
<style type="text/css">
	@import url(./setting.css);
</style>
