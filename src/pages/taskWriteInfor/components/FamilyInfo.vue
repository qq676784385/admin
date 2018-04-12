<template>
	<div class="familyInfo">
		<div class="cancel" v-tap='{methods:closeModal}'>×</div>
		<div class="contScroll">
			<div class="info">
				<div class="title">
					主申请人
				</div>
				<div class="cont">
					<div>
						<label>护照号：</label>
						<input type="text" v-model='certificateInfo.PassportNumber' disabled="disabled">
					</div>
					<div>
						<label>姓名：</label>
						<input type="text" v-model='certificateInfo.Name' disabled="disabled">
					</div>
					<div>
						<label>国家：</label>
						<input type="text" v-model='certificateInfo.Country' disabled="disabled">
					</div>
					<div>
						<label>出行目的：</label>
						<!-- <input type="text" v-model='visaType[certificateInfo.VisaType]' disabled="disabled"> -->
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
							<option value='2' v-if='certificateInfo.VisaType!=4'>学生(18岁以下)</option>
							<option value='3' v-if='certificateInfo.VisaType!=4'>学生(18岁及以上)</option>
							<option value='4' v-if='certificateInfo.VisaType!=4'>退休</option>
							<option value='5' v-if='certificateInfo.VisaType!=4'>自由职业</option>
							<option value='6'>受雇</option>
							<option value='7' v-if='certificateInfo.VisaType!=4'>学龄前儿童</option>
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
							<option value='5'>5位</option>
							<option value='6'>6位</option>
							<option value='7'>7位</option>
							<option value='8'>8位</option>
							<option value='9'>9位</option>
						</select>
					</div>
				</div>
			</div>
			<div class="info" v-if='certificateInfo.IsSpouseFollow===true'>
				<div class="title">
					配偶信息
				</div>
				<div class="cont">
					<div>
						<label>护照号：</label>
						<input type="text" disabled="disabled" v-model="SpouseApply.Passport">
					</div>
					<div>
						<label>姓名：</label>
						<input type="text" disabled="disabled" v-model="SpouseApply.UserName">
					</div>
					<div>
						<label>职业：</label>
						<select v-model="SpouseApply.Identity">
							<option value='1'>自雇</option>
							<option value='4'>退休</option>
							<option value='5'>自由职业</option>
							<option value='6'>受雇</option>
							<option value='8'>学生</option>
						</select>
					</div>
				</div>
			</div>
			<div class="info" v-if='ChildrenApply.length>0'>
				<div class="title">
					子女信息
				</div>
				<div class="cont" v-for='Child in ChildrenApply'>
					<div>
						<label>护照号：</label>
						<input type="text" disabled="disabled" v-model="Child.ChildPassport">
					</div>
					<div>
						<label>姓名：</label>
						<input type="text" disabled="disabled" v-model="Child.UserName">
					</div>
					<div>
						<label>职业：</label>
						<select v-model="Child.ChildCareer">
							<option value='7'>学龄前儿童</option>
							<option value='8'>学生</option>
						</select>
					</div>
				</div>
			</div>
			<div class="tip">
				注：如果需要变更家庭成员的主申请人身份等信息，请在微信公众号客户端修改并提交。
			</div>
		</div>
		<div class="btns">
			<button class="saveBtn" v-tap='{methods:saveFun}'>确认</button>
	        <button class="cancelBtn" v-tap='{methods:closeModal}'>取消</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				visaType: ["", "旅游", "工作", "学生", "商务", "探亲"],
				MainApply:[],
				SpouseApply:{},
				ChildrenApply:[]
			}
		},
		methods:{
			closeModal(){
				this.$parent.$emit('CLOSE', { hideFrame: "familyInfoFrame" })
				// this.$root.$emit('REFRESHINFO')
			},
			saveFun(){

				/*if(this.certificateInfo.VisaType == 4){
					this.certificateInfo.IsSpouseFollow = false
					this.SpouseApply.Identity = ""
					this.ChildrenApply = []
				}*/
				//
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
		    				this.$parent.$emit('CLOSE', { hideFrame: "familyInfoFrame" })
			    			this.$root.$emit('REFRESHINFO')
		    			}else {
		    				this.$layer.alert(res.data.Message)
		    			}

		    		},
		          function(err){
		              this.$layer.msg("网络连接超时")
		          }
		    	)
		    }
		},
		created(){
			this.certificateInfo = this.$store.state.visa.detailInfo
			this.MainApply = []
	        this.SpouseApply = {}
	        // this.ChildrenApply = []

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
	        console.log(this.SpouseApply)
		}
	}
</script>
<style type="text/css" lang="scss" src='../css/familyInfo.scss'></style>
