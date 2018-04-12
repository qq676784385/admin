<template>
	<div class="userInfoTip">
		<div class="cancel" v-tap='{methods:closeModal}'>×</div>
		<div class="middle">
			<div>
				<label>护照号：</label>
				<input type="text" name="" v-model='detailInfo.PassportNumber'>
			</div>
			<div>
				<label>姓名：</label>
				<input type="text" name="" v-model='detailInfo.Name'>
			</div>
			<div>
				<label>国家：</label>
				<input type="text" name="" v-model='detailInfo.Country'>
			</div>
			<div v-if='haveMarriedCountry.indexOf(detailInfo.Country)<0'>
				<label>出行目的：</label>
				<!-- <input type="text" name="" v-model = 'visaType[detailInfo.VisaType]'> -->
				<select class="" v-model = 'detailInfo.VisaType'>
					<option value="1">旅游</option>
					<option value="4">商务</option>
					<option value="5">探亲</option>
				</select>
			</div>
			<div>
				<label>职业：</label>
				<select v-model='detailInfo.Identity' v-if="detailInfo.Country=='法国'||detailInfo.Country=='奥地利'||detailInfo.Country=='葡萄牙'||detailInfo.Country=='意大利'||detailInfo.Country=='美国'||detailInfo.Country=='英国'">
			        <option value='1'>自雇</option>
			        <option value='6'>受雇</option>
			        <option value='5' v-if='detailInfo.VisaType!=4'>自由职业</option>
			        <option value='4' v-if='detailInfo.VisaType!=4'>退休</option>
			        <option value='3'>学生（18岁及以上）</option>
			        <option value='2'>学生（18岁以下）</option>
			        <option value='7' v-if='detailInfo.VisaType!=4'>学龄前儿童</option>
				</select>
				<select v-model='detailInfo.Identity' v-else-if="detailInfo.Country=='挪威'&&$root.get('isGroupVisa') == 'false'">
			        <option value='1'>自雇</option>
			        <option value='6'>受雇</option>
					<!-- 挪威 只有探亲才可以有自由职业 -->
			        <option value='5' v-if='detailInfo.VisaType!=4&&detailInfo.VisaType!=1'>自由职业</option>
			        <option value='4' v-if='detailInfo.VisaType!=4'>退休</option>
			        <option value='3' v-if='detailInfo.VisaType!=4'>学生（18岁及以上）</option>
			        <option value='2' v-if='detailInfo.VisaType!=4'>学生（18岁以下）</option>
			        <option value='7' v-if='detailInfo.VisaType!=4'>学龄前儿童</option>
				</select>
				<select v-model='detailInfo.Identity' v-else>
			        <option value='1'>自雇</option>
			        <option value='6'>受雇</option>
			        <option value='5' v-if='detailInfo.VisaType!=4'>自由职业</option>
			        <option value='4' v-if='detailInfo.VisaType!=4'>退休</option>
			        <option value='3' v-if='detailInfo.VisaType!=4'>学生（18岁及以上）</option>
			        <option value='2' v-if='detailInfo.VisaType!=4'>学生（18岁以下）</option>
			        <option value='7' v-if='detailInfo.VisaType!=4'>学龄前儿童</option>
				</select>

			</div>
			<div v-if='haveMarriedCountry.indexOf(detailInfo.Country)<0'>
				<label>婚姻状况：</label>
				<select v-model='detailInfo.Married'>
					<option value="0">未婚</option>
		            <option value="1">已婚</option>
		            <option value="2">离异</option>
		            <option value="3">丧偶</option>
				</select>
			</div>
			<div class="line" v-if='detailInfo.Country == "美国EVUS"'>
		        <label>您的有效美国签证页是否在您当前使用的护照内：</label>
		        <select v-model='detailInfo.PassportIncludeVisa'>
			        <option value='true'>是</option>
			        <option value='false'>否</option>
		        </select>
	      	</div>
		</div>
		<div class="footBtn">
			<button v-tap='{methods:okFun}'>确认</button>
			<button v-tap='{methods:cancelFun}'>取消</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export	default{
		data(){
			return {
				detailInfo:{},
				visaType:["","旅游","工作","学生","商务","探亲"],
				haveMarriedCountry:["美国EVUS"],//弹窗不显示婚姻状态的国家
			}
		},
		methods:{
			closeModal(){
				this.$parent.$emit('CLOSE',{hideFrame:"userInforFrame"})
			},
			okFun(){
				this.$http.post(this.$store.state.app.host + "api/Manage/ModifyVisaInfo",{
					Career:this.detailInfo.Identity,
					VisaType:this.detailInfo.VisaType,
					Married:this.detailInfo.Married,
					PassportIncludeVisa:this.detailInfo.PassportIncludeVisa,
					UserVisaId:this.$store.state.app.ivisaId
				},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$parent.$emit('CLOSE',{hideFrame:"userInforFrame"})
							this.$root.$emit('REFRESHINFO')
						}
					},
					function(err){
						this.$parent.$emit('CLOSE',{hideFrame:"userInforFrame"})
						this.$layer.msg("网络连接超时")
	                }
				)
			},
			cancelFun(){
				this.$parent.$emit('CLOSE',{hideFrame:"userInforFrame"})
			}
		},
		created(){
			this.detailInfo = this.$store.state.visa.detailInfo
		}
	}
</script>
<style type="text/css">
	.userInfoTip:hover{cursor: pointer;}
	.userInfoTip .cancel{position: absolute;top: 16px;right: 10px;font-size: 24px;color: #4C5E70;}
	.userInfoTip .middle{padding: 10px 80px;}
	.userInfoTip .middle div{margin-bottom: 10px;padding-top: 1px;}
	.userInfoTip .middle label{display:inline-block;width: 100px;text-align: right;font-size: 14px;vertical-align: middle;margin-right: 5px;}
	.userInfoTip .middle input{height: 22px;border: 1px solid #ccc;pointer-events: none;padding-left: 5px;}
	.userInfoTip .middle select{width: 	174px;height: 28px;border: 1px solid #ccc;}
	.userInfoTip .footBtn{padding: 10px 20px;text-align: right;border-top: 1px solid #ddd;}
	.userInfoTip .footBtn button{padding:5px 15px;border: 1px solid #ccc}
	.userInfoTip .footBtn button:nth-child(1){background: #63a8eb;color: #fff;border: 1px solid #63a8eb;border-radius: 2px;}
	.userInfoTip .footBtn button:nth-child(2){background: #fff;color: #000;border-radius: 2px;}
</style>
