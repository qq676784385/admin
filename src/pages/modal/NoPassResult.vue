<template>
	<div class="outText">
		<textarea class="text" v-model='Reason'></textarea>
		<div class="btnGroups">
			<button class="saveBtn" @click='okFun'>确定</button>
			<button class="cancelBtn" @click='cancelFun'>取消</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				Reason:''
			}
		},
		methods:{
			okFun(){
				this.$http.post(this.$store.state.app.host + 'api/Manage/VisaPass',{
					UserVisaID:this.$store.state.app.ivisaId,
					VisaResult:false,
					Reason:this.Reason
				},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$parent.$emit('CLOSE',{closeName:"NoPassResult"})
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")            
					}
				)
			},
			cancelFun(){
				this.$parent.$emit('CLOSE',{closeName:"NoPassResult"})
			}
		}
	}
</script>
<style type="text/css">
	.outText{padding: 10px;}
	.text{
		width: 400px;height: 123px;
		font-size: 16px;
		margin-bottom: 10px;
	}
	.btnGroups{
		text-align: right;
	}
	.btnGroups .cancelBtn{
    background: #fff;
	border: 1px solid #bbb;
	border-radius: 4px;
	color: #000;
	padding: 8px 20px;
}
.btnGroups .saveBtn{
	background: #63a8eb;
	border: none;
	border-radius: 4px;
	color: #fff;
	padding: 8px 20px;
	margin-right: 10px;
}
</style>