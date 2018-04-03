<template>
	<div class="identification">
		<div class="cancel" v-tap='{methods:closeModal}'>×</div>
		<div v-if='$store.state.visa.certificateInfo.Country!="美国EVUS"'>
			<div  class="haveIdCard" v-if='$store.state.visa.uploadInfo.FileType==3||$store.state.visa.uploadInfo.FileType==5||$store.state.visa.uploadInfo.FileType==35||$store.state.visa.uploadInfo.FileType==10'>
				<span v-if='$store.state.visa.uploadInfo.FileType==3'>我小于18岁，尚未办理身份证</span>
				<span v-else>没有{{$store.state.visa.uploadInfo.FileName}}</span>
				<input type="checkbox" v-model='haveIdCard' v-tap='{methods:changeStatus}'>
			</div>
		</div>
		<div v-if='$store.state.visa.certificateInfo.Country=="美国EVUS"'>
			<div  class="haveIdCard" v-if='$store.state.visa.uploadInfo.FileType==3||$store.state.visa.uploadInfo.FileType==5||$store.state.visa.uploadInfo.FileType==10'>
				<span v-if='$store.state.visa.uploadInfo.FileType==3'>我小于18岁，尚未办理身份证</span>
				<span v-else>没有{{$store.state.visa.uploadInfo.FileName}}</span>
				<input type="checkbox" v-model='haveIdCard' v-tap='{methods:changeStatus}'>
			</div>
		</div>

		<div class="onlyIdcardNum" v-if='haveIdCard'>
			<div v-if='$store.state.visa.uploadInfo.FileType==3'>
				<span>身份证号：</span><input type="text" v-model='idCardNum'>
			</div>
			<div v-if='$store.state.visa.uploadInfo.FileType==10'>
				<form>
					<div><span>放假期间学校无法开具准假信</span><input value='1' type="radio" v-model='havezhunjia'></div>
					<!-- <div><span>学龄前儿童</span><input value='2' type="radio" v-model='havezhunjia'></div> -->
				</form>
			</div>
		</div>
		<div class="content" v-if='!haveIdCard'>
			<!--  -->
			<div class="part1" v-for='item in uploadlist' :class='uploadlist[0].demoImg?"":"noDemoImg"'>
				<div class="title" v-if='item.demoImg'>
					<span>{{item.Name}}</span>
					<span v-if='$store.state.visa.uploadInfo.FileType==3&&item.Tag ==1'>正面</span>
					<span v-if='$store.state.visa.uploadInfo.FileType==3&&item.Tag ==2'>反面</span>
				</div>
				<div class="imgDemo" v-if='item.demoImg'>
					<img :src="item.demoImg">
				</div>
				<div class="uploadBtn" v-if='!item.ResultFile' >
					<img src="static/upload.png">
					<span>上传本地照片</span>
					<input class="fileBtn" type="file" :accept="uploadFile.accepts.default" @change="upload($event,item.Tag)">
				</div>
				 <div class="realImg" v-if='item.ResultFile'>
					<div>
						<img :src="$store.state.app.host + item.ResultFile" width="287px" height="192px">
					</div>
					<div>
						<div class="deleteBtn">
							<img src="static/delete.png">
							<span v-tap='{methods:deleteFun,tag:item.Tag}'>删除</span>
						</div>
						<div class="changeBtn">
							<img src="static/changeImg.png">
							<span>更换</span>
							<input class="fileBtn" type="file" :accept="uploadFile.accepts.default" @change="upload($event,item.Tag)">
						</div>
					</div>
				</div >
			</div>
			<div class="addNext" v-if='uploadlist[0].canAdd'>
				<div class="con" v-tap='{methods:addFun}'>
					<div class="addImg">+</div>
					<div class="addText">新增页</div>
				</div>
			</div>
		</div>
		<div class="btns">
			<div class="okbtn" v-tap='{methods:okFun}'>确认</div>
			<div class="cancelbtn" v-tap='{methods:cancelFun}'>取消</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import TurnImg from "./TurnImg.vue"
import CutImg from "./CutImg.vue"
import ImgInfo from "./ImgInfo.vue"
import DifferentTip from "./DifferentTip.vue"
	export default{
		data(){
			return{
				uploadFile: {
			        accepts: { //允许的上传类型
			          type: String,
			          default: 'image/jpeg,image/jpg,image/png,image/gif'
			        }
		        },
		        uploadlist:[{Tag:1,demoImg:""}],
		        addObj:{Tag:1,demoImg:"",canAdd:true},
		        haveIdCard:false,
		        idCardNum:"",
		        havezhunjia:"1",

			}
		},
		methods:{
			closeModal(){
				this.$parent.$emit('CLOSE',{hideFrame:"idcardFrame"})
			},
			upload(e,tag){
				// console.log(123456)
				// this.$store.state.visa.uploadInfo
				this.$store.state.visa.uploadInfo.Tag = tag

				let file = event.target.files[0]
			      const self = this
			      // console.log(file.name)
			      if (file.name) {
			        const formData = new FormData()
			        formData.append('file', file)
			        formData.append('Title', this.$store.state.visa.uploadInfo.FileName)
			        formData.append('UserVisaId', this.$store.state.app.ivisaId)
			        formData.append('VisaFileId', this.$store.state.visa.uploadInfo.VisaFileId)

			        if(this.$store.state.visa.uploadInfo.Passport){
			        	formData.append('Passport', this.$store.state.visa.uploadInfo.Passport)
			        }else{
			        	formData.append('Passport', "")
			        }

			        formData.append('Tag', tag)
			        var wating = this.$layer.loading()

			        //提交给后台处理

			        self.$http.post(this.$store.state.app.host + 'api/Manage/IdentifyCredentials', formData, { headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime }, {
			            progress(event) {
			              console.log(event)
			            }
			          })
			          .then(
			            function(res) {
			              if (res.data.Code == 0) {
			                // this.getUserInfo()
			                this.$store.state.visa.preViewInfo = res.data.Result
			                this.$layer.close(wating)
			                this.turnImgFun()
			              } else {
			                this.$layer.close(wating)
			                this.$layer.alert(res.data.Message)
			              }
			            },
			            function(err){
			            	this.$layer.close(wating)
							this.$layer.msg("网络连接超时")
		                }
			          )
			      }
			},
			turnImgFun(){
				this.TurnImgFrame = this.$layer.iframe({
					content:{
						content:TurnImg,
						parent:this,
						data:[]
					},
					title:"上传"+this.$store.state.visa.uploadInfo.FileName
				})
			},
			cutImgFun(){
				this.cutImageFrame = this.$layer.iframe({
		  	 		content:{
		  	 			content:CutImg,
		  	 			parent:this,
		  	 			data:[]
		  	 		},
		  	 		title:"上传"+this.$store.state.visa.uploadInfo.FileName
		  	 	})
			},
			imgInfoFun(){
				this.imgInfoFrame = this.$layer.iframe({
		  	 		content:{
		  	 			content:ImgInfo,
		  	 			parent:this,
		  	 			data:[]
		  	 		},
		  	 		title:"上传"+this.$store.state.visa.uploadInfo.FileName
		  	 	})
			},
			// imgInfoFun(){
			// 	this.imgInfoFrame = this.$layer.iframe({
		 //  	 		content:{
		 //  	 			content:ImgInfo,
		 //  	 			parent:this,
		 //  	 			data:[]
		 //  	 		},
		 //  	 		title:"上传"+this.$store.state.visa.uploadInfo.FileName
		 //  	 	})
			// },
			okFun(){
				if(this.haveIdCard){
					var apiObj = null

					if(this.$store.state.visa.uploadInfo.Passport){
						apiObj= {
							UserVisaId:this.$store.state.app.ivisaId,
							VisaFileId:this.$store.state.visa.uploadInfo.VisaFileId,
							HaveContent:false,
							Extend:{
								Passport:this.$store.state.visa.uploadInfo.Passport,
								Type:this.$store.state.visa.uploadInfo.UserType
							}
						}
					}else{
						apiObj = {
							UserVisaId:this.$store.state.app.ivisaId,
							VisaFileId:this.$store.state.visa.uploadInfo.VisaFileId,
							HaveContent:false
						}
					}

					this.$http.post(this.$store.state.app.host + "api/Manage/SetFileFinish",apiObj,{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
					.then(
						function(res){
							if(res.data.Code == 0){
								if(this.$store.state.visa.uploadInfo.FileType == 3){
									this.saveIdcardNum(this.idCardNum,this.$store.state.visa.uploadInfo.Passport,this.$store.state.visa.uploadInfo.UserType)
								}else{
									this.$parent.$emit('CLOSE',{hideFrame:"idcardFrame"})
								}
							}
						},
						function(err){
							this.$layer.msg("网络连接超时")
		                }
					)
				}else{
					this.$parent.$emit('CLOSE',{hideFrame:"idcardFrame"})
				}
				//
			},
			saveIdcardNum(num,passport,type){
				var ValueAry = []
				if(passport){
					// 新西兰
					switch(type){
						case 0:
							ValueAry = [
								{
									Tag:"JB000601",
									Value:num
								},
								{
									Tag:"JB000603",
									Value:"中国"
								},
								{
									Tag:"JB000607",
									Value:"公安局"
								},
								{
									Tag:"JB000604",
									Value:"长期"
								},
								{
									Tag:"JB000605",
									Value:"长期"
								}
							]
						break;
						case 1:
							ValueAry = [
								{
									Tag:"JT000118",
									Value:num
								}
							]
						break;
						case 2:
							ValueAry = [
								{
									Tag:"JTXXL00805",
									Value:num
								}
							]
						break;
					}
				}else{
					// 澳大利亚 美国
					ValueAry = [
						{
							Tag:"JB000601",
							Value:num
						},
						{
							Tag:"JB000603",
							Value:"中国"
						},
						{
							Tag:"JB000607",
							Value:"公安局"
						},
						{
							Tag:"JB000604",
							Value:"长期"
						},
						{
							Tag:"JB000605",
							Value:"长期"
						}
					]
				}
				this.$http.post(this.$store.state.app.host + "api/Wechat/SetFieldValue",{
						UserVisaId:this.$store.state.app.ivisaId,
						FieldValue:ValueAry,
						Extend:{
							Passport:passport,
							Type:type
						}
					},{headers:{Authorization: this.$store.state.app.token}})
					.then(
						function(res){
							if(res.data.Code == 0){
								this.$parent.$emit('CLOSE',{hideFrame:"idcardFrame"})
							}
						}
					)
			},
			cancelFun(){
				this.$parent.$emit('CLOSE',{hideFrame:"idcardFrame"})
			},
			getuploadInfoImg(){
				// this.$store.state.visa.uploadInfo ----- 点击获取的信息
				// console.log("UploadPreView",this.$store.state.visa.uploadInfo)
				var passpost = ""
				if(this.$store.state.visa.uploadInfo.Passport){
					passpost = this.$store.state.visa.uploadInfo.Passport
				}

				this.$http.get(this.$store.state.app.host + 'api/Manage/UploadPreView',{
					params:{
						userVisaId:this.$store.state.app.ivisaId,
						visaFileId:this.$store.state.visa.uploadInfo.VisaFileId,
						passport:passpost
					},
					headers:{Authorization: this.$store.state.app.token},
					timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$store.state.visa.upList = res.data.Result
							console.log(res.data.Result.length)
							if(res.data.Result.length){
								this.uploadlist = res.data.Result
								this.haveIdCard = false
							}
							// console.log(this.$store.state.visa.uploadInfo.FileName)
							this.uploadlist[0].Name = this.$store.state.visa.uploadInfo.FileName
							// console.log(this.uploadlist[0])
							// console.log(this.$store.state.visa.uploadInfo.FileType)
							// 存放样例图
							console.log("shang",this.$store.state.visa.uploadInfo.FileType,this.uploadlist)
							switch (this.$store.state.visa.uploadInfo.FileType){
								case 2:
								// 护照
								this.uploadlist[0].demoImg = "static/huzhaodemo.png"
								break;
								case 3:
								// 身份证
								var sfzInfo = [{Tag:1,demoImg:"static/shenfenzheng1.png",Name:"身份证"},{Tag:2,demoImg:"static/shenfenzheng2.png",Name:"身份证"}]
								if(this.uploadlist.length == 0){
									this.uploadlist = sfzInfo
								}else{
									for(var i = 0;i<sfzInfo.length;i++){
										for(var j = 0;j<this.uploadlist.length;j++){
											if(sfzInfo[i].Tag == this.uploadlist[j].Tag){
												sfzInfo[i].ResultFile = this.uploadlist[j].ResultFile
											}
										}
									}
									this.uploadlist = sfzInfo
								}
								break;
								case 32:
								// 父亲身份证
								var sfzInfo = [{Tag:1,demoImg:"static/shenfenzheng1.png",Name:"身份证"},{Tag:2,demoImg:"static/shenfenzheng2.png",Name:"身份证"}]
								if(this.uploadlist.length == 0){
									this.uploadlist = sfzInfo
								}else{
									for(var i = 0;i<sfzInfo.length;i++){
										for(var j = 0;j<this.uploadlist.length;j++){
											if(sfzInfo[i].Tag == this.uploadlist[j].Tag){
												sfzInfo[i].ResultFile = this.uploadlist[j].ResultFile
											}
										}
									}
									this.uploadlist = sfzInfo
								}
								break;
								case 33:
								// 母亲身份证
								var sfzInfo = [{Tag:1,demoImg:"static/shenfenzheng1.png",Name:"身份证"},{Tag:2,demoImg:"static/shenfenzheng2.png",Name:"身份证"}]
								if(this.uploadlist.length == 0){
									this.uploadlist = sfzInfo
								}else{
									for(var i = 0;i<sfzInfo.length;i++){
										for(var j = 0;j<this.uploadlist.length;j++){
											if(sfzInfo[i].Tag == this.uploadlist[j].Tag){
												sfzInfo[i].ResultFile = this.uploadlist[j].ResultFile
											}
										}
									}
									this.uploadlist = sfzInfo
								}
								break;
								case 4:
								// 户口本
								for(var i = 0;i<this.uploadlist.length;i++){
									this.uploadlist[i].demoImg = 'static/hukouben.png'
									this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
									this.uploadlist[i].canAdd = true
								}
								break;
								case 5:
                					// 居住证
									if(this.$root.get("country") != "澳大利亚"||this.$root.get("country") != "美国EVUS"||this.$root.get("country") != "新西兰"){
										var jzInfo = [{Tag:1,demoImg:"static/juzhuzheng.png",Name:"居住证正面"},{Tag:2,demoImg:"static/jzzfanmian.png",Name:"居住证反面"}]
										if(this.uploadlist.length == 0){
											this.uploadlist = jzInfo
										}else{
											for(var i = 0;i<jzInfo.length;i++){
												for(var j = 0;j<this.uploadlist.length;j++){
													if(jzInfo[i].Tag == this.uploadlist[j].Tag){
														jzInfo[i].ResultFile = this.uploadlist[j].ResultFile
													}
												}
											}
											this.uploadlist = jzInfo
										}
									}else{
										this.uploadlist[0].demoImg = 'static/juzhuzheng.png'
									}

								break;
								case 7:
									this.uploadlist[0].demoImg = 'static/jiehunzheng.jpg'
								break;
								case 20:
									for(var i = 0;i<this.uploadlist.length;i++){
										this.uploadlist[i].demoImg = 'static/cunkuan.png'
										this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
										this.uploadlist[i].canAdd = true
									}
								break;
								case 21:
									// this.uploadlist[0].demoImg = 'static/fangchan.png'
									for(var i = 0;i<this.uploadlist.length;i++){
										this.uploadlist[i].demoImg = 'static/fangchan.png'
										this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
										this.uploadlist[i].canAdd = true
									}
								break;
								case 22:
									// this.uploadlist[0].demoImg = 'static/chechan.png'
									for(var i = 0;i<this.uploadlist.length;i++){
										this.uploadlist[i].demoImg = 'static/chechan.png'
										this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
										this.uploadlist[i].canAdd = true
									}
								break;
								case 29:
									// this.uploadlist[0].demoImg = 'static/cunkuan.png'
									for(var i = 0;i<this.uploadlist.length;i++){
										this.uploadlist[i].demoImg = 'static/cunkuan.png'
										this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
										this.uploadlist[i].canAdd = true
									}
								break;
								case 30:
									// this.uploadlist[0].demoImg = 'static/fangchan.png'
									for(var i = 0;i<this.uploadlist.length;i++){
										this.uploadlist[i].demoImg = 'static/fangchan.png'
										this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
										this.uploadlist[i].canAdd = true
									}
								break;
								case 31:
									// this.uploadlist[0].demoImg = 'static/chechan.png'
									for(var i = 0;i<this.uploadlist.length;i++){
										this.uploadlist[i].demoImg = 'static/chechan.png'
										this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
										this.uploadlist[i].canAdd = true
									}
								break;
								case 6:
								this.uploadlist[0].demoImg = 'static/yingyezhizhao.png'
								break;
								case 15:
									// 银行对账单
									for(var i = 0;i<this.uploadlist.length;i++){
										this.uploadlist[i].demoImg = 'static/yinhang.png'
										this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
										this.uploadlist[i].canAdd = true
									}
								break;
								case 16:
									// this.uploadlist[0].demoImg = 'static/yinhang.png'
									for(var i = 0;i<this.uploadlist.length;i++){
										this.uploadlist[i].demoImg = 'static/yinhang.png'
										this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
										this.uploadlist[i].canAdd = true
									}
								break;
								case 36:
								// 护照尾页
								this.uploadlist[0].demoImg = "static/weiye.png"
								break;
								case 35:
								// 护照签证页
								console.log(this.uploadlist)
								for(var i = 0;i<this.uploadlist.length;i++){
									this.uploadlist[i].demoImg = 'static/qianzhengye.png'
									this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
									this.uploadlist[i].canAdd = true
								}
								break;
								case 37:
								// 旧护照首页
								for(var i = 0;i<this.uploadlist.length;i++){
									this.uploadlist[i].demoImg = 'static/weiye.png'
									this.uploadlist[i].Name = this.$store.state.visa.uploadInfo.FileName
								}
								break;
								case 38:
								// 最新美国签证页
								this.uploadlist[0].demoImg = "static/qianzhengye.png"
								break;
							}
						}else{
							this.$layer.msg(res.data.Message)
						}
					},
					function(err){
						this.$layer.msg("网络连接超时")
	                }
				)
			},
			addFun(){
				if(this.uploadlist[this.uploadlist.length-1].ResultFile){
					this.uploadlist.push(this.addObj)
					this.uploadlist[0].demoImg?this.uploadlist[this.uploadlist.length-1].demoImg = this.uploadlist[0].demoImg:void 0;
					this.uploadlist[this.uploadlist.length-1].Tag = Number(this.uploadlist[this.uploadlist.length-2].Tag)+1
				}else{
					this.$layer.msg("请先上传文件！")
				}
			},
			deleteFun(par){
				var passport = ""
				if(this.$store.state.visa.uploadInfo.Passport){
					passport = this.$store.state.visa.uploadInfo.Passport
				}
				this.$http.post(this.$store.state.app.host + 'api/Manage/DeleteUserFile', {
					UserVisaId: this.$store.state.app.ivisaId,
					VisaFileId: this.$store.state.visa.uploadInfo.VisaFileId,
					tag:par.tag,
					Passport:passport
				}, { headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime })
		        .then(
		          function(res) {
		            if (res.data.Code == 0) {
		              this.$parent.$emit('CLOSE',{hideFrame:"idcardFrame",back:true})
		            } else {
		              this.$layer.msg(res.data.Message)
		            }
		          },
		          function(err){
					this.$layer.msg("网络连接超时")
	              }
		        )
			},
			getIdNumber(){
				var passport = ""
				if(this.$store.state.visa.uploadInfo.Passport){
					passport = this.$store.state.visa.uploadInfo.Passport
				}
				this.$http.get(this.$store.state.app.host + 'api/Manage/GetIdCardNumber',{
					params:{
						userVisaId:this.$store.state.app.ivisaId,
						passport:passport
					}, headers: { Authorization: this.$store.state.app.token } })
				.then(
					function(res){
						if(res.data.Code == 0){
							this.idCardNum = res.data.Result
						}
					}
				)
			},
			changeStatus(){
				if(this.haveIdCard == false){
					this.getuploadInfoImg()
				}
			}
		},
		created(){
			if(this.$store.state.visa.uploadInfo.HaveContent === false){
				this.haveIdCard = !this.$store.state.visa.uploadInfo.HaveContent
				if(this.$store.state.visa.uploadInfo.FileType == 3){
					this.getIdNumber()
				}
			}else{
				this.getuploadInfoImg()
			}

			var that = this
			this.$on('CLOSE',function(obj){
				switch(obj.name){
					case "1":
						that.$layer.close(that.TurnImgFrame)
						if(obj.isNext){
							that.cutImgFun()
						}
						if(!obj.isNext&&obj.back){
							that.turnImgFun()
						}
					break;
					case "2":
						that.$layer.close(that.cutImageFrame)
						if(obj.isNext){
							that.imgInfoFun()
						}
						if(!obj.isNext&&obj.back){
							that.turnImgFun()
						}else if(!obj.isNext&&!obj.back){
							that.getuploadInfoImg()
						}
					break;
					case "3":
						that.$layer.close(that.imgInfoFrame)

						if(obj.isNext){
							console.log("xxx")
							that.getuploadInfoImg()
						}

						if(!obj.isNext&&obj.back){
							that.turnImgFun()
						}
					break;
				}
			})
		},
		components:{
			"TurnImg":TurnImg,
			"CutImg": CutImg,
			"ImgInfo":ImgInfo,
			"DifferentTip":DifferentTip
		}
	}
</script>
<style type="text/css">
	@import url('../css/identification.css');
</style>
