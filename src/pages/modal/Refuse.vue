<template>
	<div class="refuseMaterial">
		<div class="icon-close" v-tap='{methods:closeModal}'>
			×
		</div>
		<div class="checkboxs">
			<div class="whyRefuse">
				<input type="checkbox" name="name" v-model='FirstResult'><label>材料不齐</label>
			</div>
			<div class="whyRefuse">
				<input type="checkbox" name="name" v-model='SecondResult'><label>材料有问题</label>
			</div>
		</div>
		<div class="text">
			<div>备注：</div>
			<textarea v-model='NoReceivedNote' placeholder="输入备注"></textarea>
		</div>
		<!-- <div class="okBtn">
			<button v-tap='{methods:okFun}'>确认</button>
			<button v-tap='{methods:okFun}'>取消</button>
		</div> -->
		<div class="btns">
	      <div class="okbtn" v-tap='{methods:okFun}'>确认</div>
	      <div class="cancelbtn" v-tap='{methods:closeModal}'>取消</div>
	    </div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				FirstResult:false,
				SecondResult:false,
				NoReceivedNote:""
			}
		},
		methods:{
			closeModal(){
				this.$parent.$emit('CLOSE',{closeName:'refuseFrame'})
			},
			okFun(){
				this.$http.post(this.$store.state.app.host +'api/Manage/PaperReceive',
				{
					UserVisaID:this.$store.state.app.ivisaId,
					Result:this.$store.state.visa.rejectMeterial,
					FirstResult:this.FirstResult,
					SecondResult:this.SecondResult,
					Reason:this.NoReceivedNote
				},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime}
				).then(
					function(res){
						if(res.data.Code == 0){
							this.$parent.$emit('CLOSE',{closeName:'refuseFrame'})
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")            
					}

				)
			}
		},
		mounted(){
			console.log(this.$store.state.visa.refuseInfo)
			if(this.$store.state.visa.refuseInfo){
				this.FirstResult = this.$store.state.visa.refuseInfo.FirstResult
				this.SecondResult = this.$store.state.visa.refuseInfo.SecondResult
				this.NoReceivedNote = this.$store.state.visa.refuseInfo.NoReceivedNote
			}
		}
	}
</script>
<style type="text/css">
	.refuseMaterial{
		/*padding-top: 30px;*/
		height: 272px;
	}
	.refuseMaterial .icon-close{
		position: absolute;
		top: 16px;
		right: 10px;
		font-size: 24px;
		color: #4C5E70;
	}
	.refuseMaterial .icon-close:hover{
		cursor: pointer;
	}
	.refuseMaterial .whyRefuse{
		/*margin-left: 30px;*/
		margin-bottom: 10px;
		font-size: 14px;
	}
	.refuseMaterial .btns {
		text-align: right;
		border-top: 1px solid #bbb;
		padding: 10px;
	}

	.refuseMaterial .btns .okbtn {
		background: #63a8eb;
		display: inline-block;
		width: 61px;
		height: 32px;
		color: #fff;
		text-align: center;
		line-height: 32px;
		border-radius: 4px;
		font-size: 14px;
	}

	.refuseMaterial .btns .cancelbtn {
		background: #fff;
		display: inline-block;
		border: 1px solid #bbb;
		width: 61px;
		height: 32px;
		color: #000;
		text-align: center;
		line-height: 32px;
		border-radius: 4px;
		font-size: 14px;
	}
	.refuseMaterial .checkboxs{
		border: 1px solid #ddd;
	    margin: 6px 18px 18px 18px;
	    padding: 10px 10px 0px 10px;
	}
	.refuseMaterial .text{
		font-size: 14px;
		margin: 0px 18px;
	}
	.refuseMaterial .text textarea{
		width: 384px;
		height: 82px;
		border: 1px solid #ddd;
		padding:5px;
	}
</style>