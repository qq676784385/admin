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
						<!-- <input type="text" name="" disabled="disabled" v-model='visaType[certificateInfo.VisaType]'> -->
						<select class="" v-model = 'certificateInfo.VisaType'>
				            <option value="1">旅游</option>
				            <option value="4">商务</option>
				            <option value="5">探亲</option>
				        </select>
					</div>
					<div>
						<label>职业：</label>
						<select v-model='certificateInfo.Identity'>
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
							<option value='0'>无</option>
							<option value='1'>1位</option>
							<option value='2'>2位</option>
							<option value='3'>3位</option>
							<option value='4'>4位</option>
						</select>
					</div>
				</div>
			</div>
			<div class="part2 " v-if='SpouseApply.Passport'>
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
						<select v-model='SpouseApply.Identity'>
							<option value='1'>自雇</option>
							<option value='4'>退休</option>
							<option value='5'>自由职业</option>
							<option value='6'>受雇</option>
							<option value='8'>学生</option>
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
						<select v-model='Child.ChildCareer'>
							<option value='7'>学龄前儿童</option>
							<option value='8'>学生</option>
						</select>
					</div>
				</div>
			</div>
			<div class="part4">
				<button class="saveBtn" v-tap='{methods:saveFun}'>保存</button>
			    <button class="cancelBtn">取消</button>
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
								<td :class="!info1.HaveContent?'':'blueFont'" v-tap='{methods:preview,info:info1,userType:material.UserType,passport:material.Passport}'>
					                浏览
					            </td>
								<td :class="!info1.HaveContent?'':'blueFont'">
									<a :class="info1.HaveContent&&info1.UploadFileName?'link':'nothingA'" v-tap='{methods:downLoadFun,info:info1,passport:material.Passport}'>下载</a>
								</td>
								<td class='blueFont' @click='upload(info1,1,material.UserType,material.Passport)'>点击上传</td>
								<td>
									<span v-if='!info1.HaveContent'>---</span>
					                <span v-if='info1.HaveContent' v-html='info1.UploadFileName||"---"'></span>
								</td>
								<td class="redFont" v-tap='{methods:delectFun,info:info1,passport:material.Passport}'>删除</td>
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
								<td :class="!info2.HaveContent?'':'blueFont'" v-tap='{methods:preview,info:info2,userType:material.UserType,passport:material.Passport}'>预览</td>
								<td :class="!info2.HaveContent?'':'blueFont'">
									<a :class="info2.HaveContent&&info2.UploadFileName?'link':'nothingA'" target="_blank" v-tap='{methods:downLoadFun,info:info2,passport:material.Passport}'>下载</a>
								</td>
								<td class='blueFont' @click='upload(info2,3,material.UserType,material.Passport)'>点击上传</td>
								<td>
									<span v-if='!info2.HaveContent'>---</span>
					                <span v-if='info2.HaveContent' v-html='info2.UploadFileName||"---"'></span>
								</td>
								<td class="redFont" v-tap='{methods:delectFun,info:info2,passport:material.Passport}'>删除</td>
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
	import DelectAll from './DelectAll.vue'
	import Identification from './Identification.vue'
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
		      	this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo4NZL', { params: { userVisaId: this.$store.state.app.ivisaId, isAllFiles: true }, headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime })
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
		              var arr1 = [],arr2 = []

		              for(var i = 0;i<this.certificateInfo.ApplyAllMaterialListInfo.length;i++){
		              	// 新西兰合并 证件列表和材料列表
			            // 识别完成后需要更新百分比
		              	for(var j = 0;j<this.certificateInfo.ApplyAllMaterialListInfo[i].CredentialsFileList.length;j++){
		              		arr1.push(this.certificateInfo.ApplyAllMaterialListInfo[i].CredentialsFileList[j])
		              	}
		              	for(var m = 0;m<this.certificateInfo.ApplyAllMaterialListInfo[i].PaperFileList.length;m++){
		              		arr2.push(this.certificateInfo.ApplyAllMaterialListInfo[i].PaperFileList[m])
		              	}
		              	this.$store.state.visa.certificateInfo.CredentialsFileList = arr1
		              	this.$store.state.visa.certificateInfo.PaperFileList = arr2

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
		              // console.log(this.$store.state.visa.certificateInfo)
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
					VisaType:this.certificateInfo.VisaType,
		    		UserVisaId:this.$store.state.app.ivisaId,
		    		IsSpouseFollow:this.certificateInfo.IsSpouseFollow,
		    		SpouseCareer:this.SpouseApply.Identity,
		    		ChildInfo:this.ChildrenApply
		    	},{headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime})
		    	.then(
		    		function(res){
		    			if(res.data.Code == 0){
		    				this.$layer.msg("保存成功")
		    				this.$root.eventHub.$emit("REFRESHFILL")
		    				this.getUserInfo()
		    			}else{
		    				this.$layer.alert(res.data.Message)
		    			}
		    		},
		          function(err){
		              this.$layer.msg("网络连接超时")
		          }
		    	)
		    },
		    upload(item,type,usertype,passport) {
		    	// 证件 - type:1  材料 - type:3
		      this.$store.state.visa.uploadInfo = item
		      // 新西兰 申请人身份 主申请人-0 配偶-1 子女-2
		      this.$store.state.visa.uploadInfo.UserType = usertype
		      // 护照号
		      this.$store.state.visa.uploadInfo.Passport = passport
		      this.$store.state.visa.progressType = type
		      this.idcardFrame = this.$layer.iframe({
		        content: {
		          content: Identification,
		          parent: this,
		          data: []
		        },
		        title: item.FileName
		      })
		    },
		    preview(par){
		      this.$store.state.visa.fileInfo = par.info
		      this.$store.state.visa.fileInfo.UserType = par.userType
		      this.$store.state.visa.fileInfo.Passport = par.passport
		      var passport = ""
		      if(this.$store.state.visa.fileInfo.Passport){
		      	passport = this.$store.state.visa.fileInfo.Passport
		      }

		      if (par.info.HaveContent&&par.info.UploadFileName.length>0){
		        this.$http.get(this.$store.state.app.host + 'api/Manage/PreView',{
		        	params:{
		        		userVisaId:this.$store.state.app.ivisaId,
		        		visaFileId:this.$store.state.visa.fileInfo.VisaFileId,
		        		passport:passport
		        	},headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
		        .then(
		          function(res){
		            if(res.data.Code == 0){
		            	this.$store.state.visa.previewInfo = res.data.Result
			            this.previewFrame = this.$layer.iframe({
			              content: {
			                content: Preview,
			                parent: this,
			                data: []
			              },
			              title: par.info.FileName
			            })
		            }
		          },
		          function(err){
		              this.$layer.msg("网络连接超时")
		          }
		        )
		      }else{

		      }
		    },
		    delectFun(par) {
		        this.$store.state.visa.VisaFileId = par.info.VisaFileId
		        this.$store.state.visa.delectPassport = par.passport
		        console.log($(par.event.target).parent().children().find("a"))
		        $(par.event.target).parent().children().find("a").attr("href","")
		        $(par.event.target).parent().children().find("a").attr("download","")

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
		    	}else{
		    		par.event.target.removeAttribute("href")
		    		par.event.target.removeAttribute("download")
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

		     	var type = this.$store.state.visa.progressType
		     	var usertype = this.$store.state.visa.uploadInfo.UserType
		     	var passport = this.$store.state.visa.uploadInfo.Passport
		        _this.upload(this.$store.state.visa.uploadInfo,type,usertype,passport)
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
		    'Preview': Preview,
		    "Identification":Identification,
		    "DelectAll":DelectAll
		},
	  destroyed(){
	    this.$root.eventHub.$off("REFRESHINFO")
	  }
	}
</script>
<style lang='scss' type="text/css" src='../css/certificateNewZealand.scss'></style>
