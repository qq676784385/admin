<template>
	<div class="resourcePrint printNZL">
		<div>
			<button class="backBtn" v-tap='{methods:backFun}'>返回已审核列表</button>
		</div>
		<div class="printList">
			<p class="printTitle">申请表打印</p>
			<div class="inforList">
				<table border="1" cellspacing="0" frame="above" rules="all">
					<tr>
						<th class="firstTr">序号</th>
						<th>名称</th>
						<th>在线预览</th>
						<th>下载</th>
						<th>打印</th>
					</tr>
					<tr v-for='(item,index) in listInfo.PaperList'>
						<td class="firstTr">{{index+1}}</td>
						<td>{{item.FileName}}</td>
						<td>
							<span class="link" v-if='item.FileType != 1000' v-tap='{methods:preview,info:item}'>预览</span>
							<a class="link" v-if='item.FileType == 1000' :href="$store.state.app.host + item.File" target="_blank">预览</a>
						</td>
						<td class="link">
							<a class="link" v-tap='{methods:downLoadFun,info:item}'>下载</a>
						</td>
						<td class="link" >
							<a class="link" v-tap='{methods:printFun,info:item}'>打印</a>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="printList">
			<p class="printTitle">资料打印</p>
			<div class="inforList" v-for='item in listInfo.DetailsInfo'>
				<div class="title">{{item.UserName}} ({{shenfen[item.UserType]}}) {{item.Passport}}</div>
				<table border="1" cellspacing="0" frame="above" rules="all">
					<tr>
						<th class="firstTr">序号</th>
						<th>名称</th>
						<th>在线预览</th>
						<th>下载</th>
						<th>打印</th>
					</tr>
					<tr v-for='(info,index) in item.CredentialsFileList'>
						<td>{{index+1}}</td>
						<td>{{info.FileName}}</td>
						<td>
							<span  class="link" v-if='info.FileType !=8&&info.FileType !=28&&info.FileType !=1001' v-tap='{methods:preview,info:info,passport:item.Passport}'>
							预览
							</span>
							<span v-else>---</span>
						</td>
						<td class="link">
				            <a class="link" v-tap='{methods:downLoadFun,info:info,passport:item.Passport}'>下载</a>
						</td>
						<td class="link">
							<a class="link" v-tap='{methods:printFun,info:info,passport:item.Passport}'>打印</a>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import Preview from '../materialDetail/components/Preview.vue'
	export default{
		data(){
			return {
				listInfo:[],
				imgFile:"",
				zichanType:[15,20,21,22],
				chuzirenType:[16,29,30,31],
				hebingType:[2,36,35],
				haveczr:null,
				havezc:null,
				havehz:null,
				MainApply:[],
				SpouseApply:[],
				ChildrenApply:[],
				shenfen:['主申请人','配偶','子女'],
			}
		},
		methods:{
			backFun(par){
				this.$root.goRouter({
					router:'/visaInfo/9'
				})
			},
			getList(){
				this.$http.get(this.$store.state.app.host + 'api/Manage/PrintPage4NZL',{
					params:{
						userVisaId:this.$store.state.app.ivisaId
					},
					headers:{Authorization: this.$store.state.app.token},
					timeout: this.$store.state.app.httpTime
				})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.listInfo = res.data.Result

							for(var i=0; i<this.listInfo.DetailsInfo.length;i++){
								this.havezc = false
								this.haveczr = false
								this.havehz = false
								for(var n = 0;n<this.listInfo.DetailsInfo[i].CredentialsFileList.length;n++){
									if(this.zichanType.indexOf(this.listInfo.DetailsInfo[i].CredentialsFileList[n].FileType)>-1&&!this.havezc){
										// 资产证明
										var obj1 = {
											FileType:8,
											FileName:"资产证明"
										}
										this.listInfo.DetailsInfo[i].CredentialsFileList.unshift(obj1)
										this.havezc = true
									}
									if(this.chuzirenType.indexOf(this.listInfo.DetailsInfo[i].CredentialsFileList[n].FileType)>-1&&!this.haveczr){
										// 出资人资产证明
										var obj2 = {
											FileType:28,
											FileName:"出资人资产证明"
										}
										this.listInfo.DetailsInfo[i].CredentialsFileList.unshift(obj2)
										this.haveczr = true
									}

									if(this.hebingType.indexOf(this.listInfo.DetailsInfo[i].CredentialsFileList[n].FileType)>-1&&!this.havehz){
										// 护照合并项
										var obj3 = {
											FileType:1001,
											FileName:"护照"
										}
										this.listInfo.DetailsInfo[i].CredentialsFileList.unshift(obj3)
										this.havehz = true
									}

								}


							}
						}
					},
					function(err){
						this.$layer.msg("网络连接超时")
					}
				)

			},
			preview(par){
				this.$store.state.visa.fileInfo = par.info
				this.$store.state.visa.fileInfo.Passport = par.passport

		        if (par.info.File) {
		          this.previewFrame = this.$layer.iframe({
		            content: {
		              content: Preview,
		              parent: this,
		              data: []
		            },
		            title: par.info.FileName
		          })
		        }else{
		          this.$layer.msg("请先上传完整文件")
		        }

            },
            printFun(par){
            	if(par.info.FileType == 3||par.info.FileType ==4||par.info.FileType ==15||par.info.FileType ==20||par.info.FileType ==21||par.info.FileType ==22||par.info.FileType ==16||par.info.FileType ==29||par.info.FileType ==30||par.info.FileType ==31||par.info.FileType ==33||par.info.FileType ==32||par.info.FileType ==8||par.info.FileType ==28||par.info.FileType ==35){
			        par.event.target.setAttribute("href",this.$store.state.app.host + "api/Manage/MergeJPEGToPDF?userVisaId="+this.$store.state.app.ivisaId+"&fileType="+par.info.FileType+"&passport="+par.passport+"&download=false")
			        par.event.target.setAttribute("target","_blank")
			    }else if(par.info.FileType == 1001){
			    	// 护照合并项
			    	par.event.target.setAttribute("href",this.$store.state.app.host + "api/Manage/MergePassportToPDF?userVisaId="+this.$store.state.app.ivisaId+"&passport="+par.passport+"&download=false")
			    	par.event.target.setAttribute("target","_blank")
			    }else{
			    	this.printFinish(par)
	            	this.imgFile = this.$store.state.app.host + par.info.File
	            	this.$store.state.visa.fileId = par.info.FileId

	            	// console.log(this.$store.state.app.host + par.info.File)
	            	let newWindow = window.open(this.$store.state.app.host + par.info.File,"_blank")
					newWindow.print()
					return true

			    }

            },
            printFinish(par){
            	this.$http.get(this.$store.state.app.host + "api/Manage/SetImportOrPrintFinish",{params:{userVisaId:this.$store.state.app.ivisaId,type:2},headers:{Authorization: this.$store.state.app.token}})
            	.then(
            		function(res){

            		}
            	)

            },
            downLoadFun(par){
            	// 下载
            	if(par.info.FileType == 3||par.info.FileType ==4||par.info.FileType ==15||par.info.FileType ==20||par.info.FileType ==21||par.info.FileType ==22||par.info.FileType ==16||par.info.FileType ==29||par.info.FileType ==30||par.info.FileType ==31||par.info.FileType ==32||par.info.FileType ==33||par.info.FileType ==8||par.info.FileType ==28||par.info.FileType ==35||par.info.FileType ==5){
			        par.event.target.setAttribute("href",this.$store.state.app.host+"api/Manage/MergeJPEGToPDF?userVisaId="+this.$store.state.app.ivisaId+"&fileType="+par.info.FileType+"&passport="+par.passport+"&download=true")
			    }else if(par.info.FileType == 1001){
			    	// 护照合并项
			    	par.event.target.setAttribute("href",this.$store.state.app.host+"api/Manage/MergePassportToPDF?userVisaId="+this.$store.state.app.ivisaId+"&passport="+par.passport+"&download=true")
			    }else{
			        par.event.target.setAttribute("href",this.$store.state.app.host+par.info.File)
			        par.event.target.setAttribute("download",this.$store.state.app.host+par.info.File)
			    }

            }
		},
		mounted(){
			this.$store.state.app.token = this.$root.get("AppToken")
			this.$store.state.app.ivisaId = this.$root.get("IvisaId")
			this.getList()

			var that = this
			this.$on('CLOSE',function(obj){
				that.$layer.close(that.previewFrame)
			})
		},
		components:{
			"Preview":Preview
		}
	}
</script>
<style>
	@import url(./resourcePrint.css);
</style>
