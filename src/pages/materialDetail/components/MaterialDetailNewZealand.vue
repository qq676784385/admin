<template>
	<div class="newZealand">
		<div class="part1">
			<span>受理单号：</span>
			<span>{{certificateInfo.OrderNumber}}</span>
		</div>
		<div class="contBorder">
			<div class="part2">
				<div class="title">主申请人</div>
				<div class="part2_cont">
					<div>
						<label>护照号：</label>
						<input type="text" name="" disabled="disabled" v-model='certificateInfo.PassportNumber'>
					</div>
					<div>
						<label>姓名：</label>
						<input type="text" name="" disabled="disabled" v-model='certificateInfo.Name'>
					</div>
					<div>
						<label>国家：</label>
						<input type="text" name="" disabled="disabled" v-model='certificateInfo.Country'>
					</div>
					<div>
						<label>出行目的：</label>
						<input type="text" name="" disabled="disabled" v-model='visaType[certificateInfo.VisaType]'>
					</div>
					<div>
						<label>职业：</label>
						<select v-model='certificateInfo.Identity' disabled="disabled">
							<option value='1'>自雇</option>
							<option value='2'>学生(18岁以下)</option>
							<option value='3'>学生(18岁及以上)</option>
							<option value='4'>退休</option>
							<option value='5'>自由职业</option>
							<option value='6'>受雇</option>
							<option value='7'>学龄前儿童</option>
						</select>
					</div>
					<div>
						<label>婚姻状况：</label>
						<select v-model='certificateInfo.Married' disabled="disabled">
							<option value='0'>未婚</option>
							<option value='1'>已婚</option>
							<option value='2'>离婚</option>
							<option value='3'>丧偶</option>
						</select>
					</div>
					<div v-if='certificateInfo.Married == 1'>
						<label>配偶是否跟随：</label>
						<select v-model='certificateInfo.IsSpouseFollow' disabled="disabled">
							<option value='false'>否</option>
							<option value='true'>是</option>
						</select>
					</div>
					<div>
						<label>有几位未成年子女跟随：</label>
						<select v-model='certificateInfo.MinorChildrenFollow' disabled="disabled">
							<option value='0'>0位</option>
							<option value='1'>1位</option>
							<option value='2'>2位</option>
							<option value='3'>3位</option>
							<option value='4'>4位</option>

						</select>
					</div>
				</div>
			</div>
			<div class="part2 " v-if='certificateInfo.Married == 1&&certificateInfo.IsSpouseFollow === true'>
				<div class="title">配偶信息</div>
				<div class="part2_cont">
					<div>
						<label>护照号：</label>
						<input type="text" v-model='SpouseApply.Passport' disabled="disabled">
					</div>
					<div>
						<label>姓名：</label>
						<input type="text" name="" disabled="disabled" v-model='SpouseApply.UserName'>
					</div>
					<div>
						<label>职业：</label>
						<select v-model='SpouseApply.Identity' disabled="disabled">
							<option value='1'>自雇</option>
							<option value='3'>学生，大于等于18岁</option>
							<option value='4'>退休</option>
							<option value='5'>自由职业</option>
							<option value='6'>受雇</option>
						</select>
					</div>
				</div>
			</div>
			<div class="part2 part3" v-if='certificateInfo.MinorChildrenFollow>0'>
				<div class="title">子女信息</div>
				<div class="part2_cont" v-for='Child in ChildrenApply'>
					<div>
						<label>护照号：</label>
						<input type="text" name="" disabled="disabled" v-model='Child.ChildPassport'>
					</div>
					<div>
						<label>姓名：</label>
						<input type="text" name="" disabled="disabled" v-model='Child.UserName'>
					</div>
					<div>
						<label>职业：</label>
						<select v-model='Child.ChildCareer' disabled="disabled">
							<option value='7'>学龄前儿童</option>
							<option value='8'>学生</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="cailiao">
			<div class="tip">
				<div class="blueBorder">申请人此次办理所需材料</div>
			</div>
			<div class="col_1" v-for='material in certificateInfo.ApplyAllMaterialListInfo'>
				<div class="personInfo">
					<span>{{material.UserName}}</span>
					<span>({{shenfen[material.UserType]}})</span>
					<span>{{material.Passport}}</span>
				</div>
				<div class="personList">
					<div class="list1">
						<div class="list_title">
							证件列表
						</div>
						<table border="1" cellspacing="0" frame="above" rules="all" cellpadding='0'>
							<tr>
								<th>NO.</th>
					            <th>附件名称</th>
					            <th>在线预览</th>
					            <th>下载</th>
					            <th>上传</th>
					            <th>已上传文件名称</th>
					            <th>删除</th>
							</tr>
							<tr v-for='(info1,index) in material.CredentialsFileList'>
								<td>{{index+1}}</td>
								<td>{{info1.FileName}}</td>
								<td class="blueFont" v-tap='{methods:preview,info:info1,userType:material.UserType,passport:material.Passport}'>
					                浏览
					            </td>
								<td class="blueFont">
									<a  class="link" v-tap='{methods:downLoadFun,info:info1}'>下载</a>
								</td>
								<td class="uploadInput">点击上传</td>
								<td><span v-html='info1.UploadFileName||"---"'></span></td>
								<td>删除</td>
							</tr>
						</table>
					</div>
					<div class="list1 list2">
						<div class="list_title">
							材料列表
						</div>
						<table border="1" cellspacing="0" frame="above" rules="all" cellpadding='0'>
							<tr>
								<th>NO.</th>
					            <th>附件名称</th>
					            <th>在线预览</th>
					            <th>下载</th>
					            <th>上传</th>
					            <th>已上传文件名称</th>
					            <th>删除</th>
							</tr>
							<tr v-for='(info2,index) in material.PaperFileList'>
								<td>{{index+1}}</td>
								<td>{{info2.FileName}}</td>
								<td class="blueFont" v-tap='{methods:preview,info:info2,userType:material.UserType,passport:material.Passport}'>
									预览
								</td>
								<td class="blueFont"><a  class="link" v-tap='{methods:downLoadFun,info:info2}'>下载</a></td>
								<td class="uploadInput">点击上传</td>
								<td><span v-html='info2.UploadFileName||"---"'></span></td>
								<td>删除</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Preview from './Preview.vue'
	// import Identification from './Identification.vue'
	export default{
		data(){
			return {
				// career: ["", "在职", "学生，小于18岁", "学生，大于等于18岁", "退休", "失业"],
				shenfen:['主申请人','配偶','子女'],
			    visaType: ["", "旅游", "工作", "学生", "商务", "探亲"],
				certificateInfo:{},
				MainApply:[],
				SpouseApply:{},
				ChildrenApply:[]
			}
		},
		methods:{
			getUserInfo() {
		      	this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo4NZL', { params: { userVisaId: this.$store.state.app.ivisaId, isAllFiles: false }, headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime })
		        .then(
		          function(res) {
		            if (res.data.Code == 0) {
		            	// 资产证明 /出资人资产证明
		                for(var i = 0;i<res.data.Result.ApplyAllMaterialListInfo.length;i++){
		                	for(var j = 0;j<res.data.Result.ApplyAllMaterialListInfo[i].PaperFileList.length;j++){
		                		if(res.data.Result.ApplyAllMaterialListInfo[i].PaperFileList[j].FileType == 8){
		                			res.data.Result.ApplyAllMaterialListInfo[i].PaperFileList.splice(j,1)
		                		}
		                		if(res.data.Result.ApplyAllMaterialListInfo[i].PaperFileList[j].FileType == 28){
		                			res.data.Result.ApplyAllMaterialListInfo[i].PaperFileList.splice(j,1)
		                		}
		                	}
		                }

		              this.certificateInfo = res.data.Result
		              this.$store.state.visa.certificateInfo = this.certificateInfo

		              this.MainApply = []
		              this.SpouseApply = {}
		              this.ChildrenApply = []

		              for(var i = 0;i<this.certificateInfo.ApplyAllMaterialListInfo.length;i++){
		              	switch(this.certificateInfo.ApplyAllMaterialListInfo[i].UserType){
		              		case 0:
		              			// 主申请人
			              		this.MainApply.push(this.certificateInfo.ApplyAllMaterialListInfo[i])
		              		break;
		              		case 1:
			              		// 配偶
			              		this.SpouseApply = this.certificateInfo.ApplyAllMaterialListInfo[i]
		              		break;
		              		case 2:
			              		// 子女
			              		var obj = {
					              	"UserName":"",
					                "ChildPassport":"",
					                "ChildCareer":"",
					            }
					            obj.UserName = this.certificateInfo.ApplyAllMaterialListInfo[i].UserName
				              	obj.ChildPassport = this.certificateInfo.ApplyAllMaterialListInfo[i].Passport
				              	obj.ChildCareer = this.certificateInfo.ApplyAllMaterialListInfo[i].Identity
				              	this.ChildrenApply.push(obj)

		              		break;
		              	}
		              }
		            }
		          },
		          function(err){
		              this.$layer.msg("网络连接超时")
		          }
		        )
		    },
		    saveFun(){
		    	this.$http.post(this.$store.state.app.host + 'api/Manage/ModifyVisaInfo4NZL',{
		    		Career:this.certificateInfo.Identity,
		    		Married:this.certificateInfo.Married,
		    		UserVisaId:this.$store.state.app.ivisaId,
		    		nzlField:{
		    			PassportIdentity:-1,
		    			IsSpouseFollow:this.certificateInfo.IsSpouseFollow,
		    			MinorChildrenFollow:this.certificateInfo.MinorChildrenFollow,
		    			SpouseName:this.SpouseApply.UserName,
		    			SpousePassport:this.SpouseApply.Passport,
		    			SpouseCareer:this.SpouseApply.Identity,
		    			MinorChildrenInfo:this.ChildrenApply
		    		}
		    	},{headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime})
		    	.then(
		    		function(res){

		    		},
		          function(err){
		              this.$layer.msg("网络连接超时")
		          }
		    	)
		    },

		    preview(par){
		      this.$store.state.visa.fileInfo = par.info
		      this.$store.state.visa.fileInfo.UserType = par.userType
		      this.$store.state.visa.fileInfo.Passport = par.passport

		        if (par.info.HaveContent) {
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
		    delectFun(par) {
		        this.$store.state.visa.VisaFileId = par.info.VisaFileId
		        if(par.info.HaveContent){
		            this.delectFrame = this.$layer.iframe({
		                content: {
		                  content: DelectAll,
		                  parent: this,
		                  data: []
		                },
		                title: "删除"
		            })
		        }else{
		            this.$layer.msg("请先上传文件")
		        }
		    },
		    downLoadFun(par){
		    	if(par.info.HaveContent){
		    		if(par.info.FileType == 3||par.info.FileType ==4||par.info.FileType ==15||par.info.FileType ==20||par.info.FileType ==21||par.info.FileType ==22||par.info.FileType ==16||par.info.FileType ==29||par.info.FileType ==30||par.info.FileType ==31||par.info.FileType ==32||par.info.FileType ==33||par.info.FileType ==35){
			        par.event.target.setAttribute("target","_blank")
			        par.event.target.setAttribute("href",this.$store.state.app.host + "api/Manage/MergeJPEGToPDF?userVisaId="+this.$store.state.app.ivisaId+"&fileType="+par.info.FileType+"&passport="+par.passport+"&download=true")
			      }else{
			        par.event.target.setAttribute("href",this.$store.state.app.host+par.info.File)
			        par.event.target.setAttribute("download",this.$store.state.app.host+par.info.File)
			      }
		    	}

		    }
		},
		mounted(){
			this.getUserInfo()
			var _this = this
		    this.$on('CLOSE', function(obj) {
		      switch(obj.hideFrame){
		        case "previewFrame":
		        _this.$layer.close(_this.previewFrame)
		        break;
		        case "idcardFrame":
		         _this.$layer.close(_this.idcardFrame)
		        if(obj.back){
		          _this.upload(this.$store.state.visa.uploadInfo)
		        }
		        break;
		        case "delectFrame":
		         _this.$layer.close(_this.delectFrame)
		        break;
		      }
		      _this.$root.eventHub.$emit("REFRESHFILL")
		      _this.getUserInfo()
		    })
		    this.$root.$on("REFRESHINFO",function(obj){
		       _this.getUserInfo()
		    })
		},
		components: {
		    'Preview': Preview
		}
	}
</script>
<style lang='scss' type="text/css" src='../../taskWriteInfor/css/certificateNewZealand.scss'></style>
