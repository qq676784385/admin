<template>
	<div class="task">
		<div class="selectList"  :class='visaPdf== "true"?$store.state.visa.pdfFile.length>0?"":" nothing":""'>
			<ul>
				<li class="titleList" v-tap='{methods:selectFun,groupId:0}' :class='$store.state.visa.groupId == 0?"selected":""' v-if='visaPdf== "false"'>
					证件信息
					<img src="static/ok.png">
				</li>
				<li class="titleList"  v-for='title in meterialDetail.GroupList' v-tap='{methods:selectFun,groupId:title.GroupID,groupName:title.GroupName}' :class='$store.state.visa.groupId == title.GroupID?"selected":""' v-if='visaPdf== "false"'>
					{{title.GroupName}}
					<img src="static/ok.png" v-if='title.IsFilled'>
				</li>
				<li class="titleList pdfTable" v-for='item in $store.state.visa.pdfFile'  v-if='visaPdf== "true"' v-tap='{methods:changePdf,info:item}' :class='pdfTag == item.Tag?"selected":""'>
					{{item.FileName}}
				</li>
				<button class='changeType' v-tap='{methods:createSubmitFile}' v-if='visaPdf== "false"&&addBgId!=1&&showPdfCountry.indexOf($store.state.visa.country)>-1'>签证模式</button>
				<button class='changeType' v-tap='{methods:backEdit}' v-if='visaPdf== "true"&&showPdfCountry.indexOf($store.state.visa.country)>-1'>返回编辑模式</button>
			</ul>
		</div>
		<div class="selectCont">
			<component :is='selectContModal'></component>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BaseInfo from './components/BaseInfo.vue'
	import VisaPdf from './components/VisaPdf.vue'
	import MaterialDetail from './components/MaterialDetail.vue'
	import MaterialDetailNewZealand from './components/MaterialDetailNewZealand.vue'
	export default{
		data(){
			return {
				selectContModal:'',
				selectContModalID:0,
				meterialDetail:'',
				pdfTag:null,
				visaPdf:"false",
				countryName:["澳大利亚","美国","新西兰"],//签证模式要调用的国家id
				showPdfCountry:["澳大利亚","新西兰","意大利"],//哪些国家需要显示签证模式

			}
		},
		methods:{
			selectFun(par){
				this.selectContModalID = par.groupId
				this.$store.state.visa.country = this.$root.get("country")
				this.$store.state.visa.groupId = par.groupId
				this.$store.state.visa.groupName = par.groupName
				this.$root.set("Groupid",this.$store.state.visa.groupId)

				if(this.selectContModalID!=0){
					this.selectContModal = "BaseInfo"
					this.$root.eventHub.$emit('GROUPID',{groupId:par.groupId})
				}else{
					if(this.$store.state.visa.country == "新西兰"){
						this.selectContModal = "MaterialDetailNewZealand"
						this.getUserInfoNZL()
					}else{
						this.selectContModal = "MaterialDetail"
						this.getUserInfo()
					}
				}
			},
			createSubmitFile(){
				var wait = this.$layer.loading()
				// 生成模板文件
				if(this.countryName.indexOf(this.$store.state.visa.country)>-1){
					var CountryNumber = this.countryName.indexOf(this.$store.state.visa.country)+1
				}
				this.$http.post(this.$store.state.app.host + 'api/Manage/CreateSubmitFiles',{
					UserVisaID:this.$store.state.app.ivisaId,
					CountryNumber:CountryNumber
				},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$layer.close(wait)
							this.visaPdf = "true"
							this.$root.set("VisaPdf",this.visaPdf)
							this.$store.state.visa.pdfFile = res.data.Result
							this.pdfTag = this.$store.state.visa.pdfFile[0].Tag

							for(var i = 0;i<this.$store.state.visa.pdfFile.length;i++){
							// 	switch(this.$store.state.visa.pdfFile[i].Tag){
							// 		case 5:
							// 			this.$store.state.visa.pdfFile[i].Name = "54表"
							// 		break;
							// 		case 4:
							// 			this.$store.state.visa.pdfFile[i].Name = "1229委托表"
							// 		break;
							// 		// 新西兰
							// 		case 6:
							// 			this.$store.state.visa.pdfFile[i].Name = "1017表"
							// 		break;
							// 		case 7:
							// 			this.$store.state.visa.pdfFile[i].Name = "1188委托表"
							// 		break;
							// 		case 8:
							// 			this.$store.state.visa.pdfFile[i].Name = "1027主申请人补充表"
							// 		break;
							// 		case 9:
							// 			this.$store.state.visa.pdfFile[i].Name = "1027配偶补充表"
							// 		break;
							// 		case 10:
							// 			this.$store.state.visa.pdfFile[i].Name = "1027子女补充表"
							// 		break;
							// 	}
								if(this.$store.state.visa.pdfFile[i].Tag == 10){
									for(var j = 0;j<this.$store.state.visa.pdfFile[i].ItemChild.length;j++){
										this.$store.state.visa.pdfFile[i].ItemChild[j].Tag = "10_"+j
										this.$store.state.visa.pdfFile.push(this.$store.state.visa.pdfFile[i].ItemChild[j])
									}
									this.$store.state.visa.pdfFile.splice(i,1)
									break;
								}
							}

							this.$root.remove("pdfFile")
							this.$root.set("pdfFile",JSON.stringify(this.$store.state.visa.pdfFile))
							this.selectContModal = 'VisaPdf'
						}else{
							this.visaPdf = "false"
							this.$root.set("VisaPdf",this.visaPdf)
							this.$layer.close(wait)
						}
					},
					function(err){
						this.$layer.close(wait)
					    this.$layer.msg("网络连接超时")
					}
				)
			},
			backEdit(){
				this.visaPdf = "false"
				this.$root.remove("VisaPdf")
				this.$root.set("VisaPdf",this.visaPdf)
				this.$store.state.app.canEdit = false
				this.$store.state.visa.groupId = 0
				this.$root.set("Groupid",this.$store.state.visa.groupId)
				if(this.$store.state.visa.country == "新西兰"){
					this.selectContModal = "MaterialDetailNewZealand"
				}else{
					this.selectContModal = "MaterialDetail"
				}
			},
			getUserInfo(){
				// 代录的时候 isAllFiles ：true
				// 详情的时候 isAllFiles：false
				this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo',{params:{userVisaId:this.$store.state.app.ivisaId,isAllFiles:false},headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.meterialDetail = res.data.Result
							// this.$store.state.app.meterialDetail = this.meterialDetail
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")
					}
				)
			},
			changePdf(par){
				this.pdfTag = par.info.Tag
				this.$root.eventHub.$emit("CHANGEPDF",{tag:par.info.Tag})
			},
			getUserInfoNZL(){
				this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo4NZL', { params: { userVisaId: this.$store.state.app.ivisaId, isAllFiles: false }, headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime })
				.then(
					function(res){
						this.meterialDetail = res.data.Result
						this.$store.state.visa.detailInfo = res.data.Result
						if(this.submit == "false"){
			                if(window.localStorage.getItem('addBgId') =="7"){
			                	this.familyTip()
			                }
						}
						this.submit = true
					},
					function(err){
						this.$layer.msg("网络连接超时")
	                }
				)
			},
		},
		created(){
			this.$store.state.visa.groupId = 0
			this.$root.set("Groupid",this.$store.state.visa.groupId)
			this.$store.state.app.token = this.$root.get("AppToken")
			this.$store.state.app.ivisaId = this.$root.get("IvisaId")
			this.addBgId = this.$root.get("addBgId")
			this.$store.state.visa.country = this.$root.get("country")
			if(this.$store.state.visa.country == "新西兰"){
				this.getUserInfoNZL()
			}else{
				this.getUserInfo()
			}


			if(this.$root.get("VisaPdf"))this.visaPdf = this.$root.get("VisaPdf")
			if(this.visaPdf === "true"){
				this.selectContModal = "VisaPdf"
				this.createSubmitFile()
			}else{
				if(this.$store.state.visa.country == "新西兰"){
					this.selectContModal = "MaterialDetailNewZealand"
				}else{
					this.selectContModal = "MaterialDetail"
				}
			}

		},
		components:{
			"BaseInfo":BaseInfo,
			"VisaPdf":VisaPdf,
			"MaterialDetailNewZealand":MaterialDetailNewZealand,
			"MaterialDetail":MaterialDetail
		}
	}
</script>
<style type="text/css">
	/*@import url(./css/taskWriteInfo.css);*/
</style>
