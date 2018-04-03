<template>
	<div class="preApprove">
		<div class="cancel" v-tap='{methods:closeModal}'>×</div>
		<div class="middle">
			<div class="chooseSelect">
				<div>请选择：</div>
				<form>
					<input type="radio" name='approve' value='true' v-model='preApproveResult.PreCheckResult' v-tap='{methods:passFun}'><label>预审通过</label>
					<input type="radio" name='approve' value='false' v-model='preApproveResult.PreCheckResult'><label>预审不通过</label>
				</form>
			</div>
			<div class="whyNo">
				<div class="whyTitle">不通过理由：</div>
				<div class="part">
					<div class="col">
						<div>申请人材料问题：</div>
						<form>
							<input type="checkbox" v-model='preApproveResult.PaperFirst'><label>材料缺失</label>
							<input type="checkbox" v-model='preApproveResult.PaperSecond'><label>材料不真实</label>
						</form>
					</div>
					<div class="col">
						<div>申请人资质问题：</div>
						<form>
							<input type="checkbox" v-model='preApproveResult.QualificationFirst'><label>有不良记录</label>
							<input type="checkbox" v-model='preApproveResult.QualificationSecond'><label>其他</label>
						</form>
					</div>
				</div>
				<div class="cantEdit" v-if='preApproveResult.PreCheckResult==="true"'></div>
			</div>
			
			<div class="whyDetail">
				<div>备注：</div>
				<textarea  placeholder="备注" v-model='preApproveResult.Remark'></textarea>
			</div>
		</div>
		<div class="footBtns">
			<button v-tap='{methods:okFun}'>保存</button>
			<button v-tap='{methods:closeModal}'>取消</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				preApproveResult:{
					PreCheckResult:'',
					PaperFirst:false,
					PaperSecond:false,
					QualificationFirst:false,
					QualificationSecond:false,
					Remark:""
				},
			}
		},
		methods:{
			closeModal(){
				this.$parent.$emit('CLOSE',{closeName:"preApproveFrame"})
			},
			okFun(par){
				this.$http.post(this.$store.state.app.host + 'api/Manage/PreCheck',{
					UserVisaID:this.$store.state.app.ivisaId,
					PreCheckResult:this.preApproveResult.PreCheckResult,
					PaperFirst:this.preApproveResult.PaperFirst,
					PaperSecond:this.preApproveResult.PaperSecond,
					QualificationFirst:this.preApproveResult.QualificationFirst,
					QualificationSecond:this.preApproveResult.QualificationSecond,
					Remark:this.preApproveResult.Remark,
				},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							var addBgId = this.$root.get("addBgId")
							this.$parent.$emit('CLOSE',{closeName:"preApproveFrame"})
							this.$root.goRouter({
								router:'/visaInfo/'+addBgId
							})
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")            
					}
				)
			},
			passFun(){
				// this.preApproveResult:{
				// 	PreCheckResult:'',
				// 	PaperFirst:false,
				// 	PaperSecond:false,
				// 	QualificationFirst:false,
				// 	QualificationSecond:false,
				// 	Remark:""
				// },
				// this.preApproveResult.PreCheckResult = "true"
				this.preApproveResult.PaperFirst = false
				this.preApproveResult.PaperSecond = false
				this.preApproveResult.QualificationFirst = false
				this.preApproveResult.QualificationSecond = false
				this.preApproveResult.Remark = ""
			}
		},
		created(){
			console.log(this.$store.state.visa.approveResult)
			if(this.$store.state.visa.approveResult){
				this.preApproveResult = this.$store.state.visa.approveResult
			}
			console.log(this.preApproveResult)
		}
	}
</script>
<style type="text/css">
@import url(./css/preApprove.css);
	
</style>
