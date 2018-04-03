<template>
	<div class="delectAll">
		<div class="cancel" v-tap='{methods:closeModal}'>×</div>
		<div class="txt">
			确认删除已上传的文件吗？
		</div>
		<div class="saveInfo">
			<button v-tap='{methods:saveInfoFun}'>确认</button>
			<button class="cancelBtn" v-tap='{methods:closeModal}'>取消</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {}
		},
		methods:{
			closeModal(){
				this.$parent.$emit('CLOSE',{hideFrame:"delectFrame"})
			},
			saveInfoFun(){
				this.$http.post(this.$store.state.app.host + 'api/Manage/DeleteUserFile', { UserVisaId: this.$store.state.app.ivisaId, VisaFileId: this.$store.state.visa.VisaFileId,Passport:this.$store.state.visa.delectPassport}, { headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime })
		        .then(
		          function(res) {
		            if (res.data.Code == 0) {
		              this.$parent.$emit('CLOSE',{hideFrame:"delectFrame"})
		            } else {
		              this.$parent.$emit('CLOSE',{hideFrame:"delectFrame"})
		              this.$layer.msg(res.data.Message)
		            }
		          },
		          function(err){
						this.$layer.msg("网络连接超时")            
	                }
		        )
			}
		}
	}
</script>
<style type="text/css">
	.delectAll .cancel{position: absolute;top: 16px;right: 10px;font-size: 24px;color: #4C5E70;}
	.delectAll .cancel:hover{cursor:pointer;}
	.delectAll .saveInfo{padding-top: 10px;border-top: 1px solid #ccc;margin-top:10px;margin-bottom:10px;text-align: right;}
	.delectAll .saveInfo button{background: #63a8eb;border: none;border-radius: 4px;color: #fff;padding: 8px 20px;margin-right: 10px;}
	.delectAll .saveInfo button.cancelBtn{background: #F8F8F8;border: 1px solid #bbb;color: #000;}
	.delectAll .txt{line-height: 120px;width: 300px;text-align: center;font-size: 14px;}

</style>