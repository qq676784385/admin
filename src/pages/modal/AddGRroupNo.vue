<template>
	<div class="addGroupNo">
		<div class="cancel" v-tap='{methods:cancelFun}'>×</div>
		<div class="cont">
			<div class="title">
				请输入分组编号：
			</div>
			<div>
				<input type="text" v-model='GroupNo'>
			</div>
		</div>
		<div class="btns">
	        <div class="okbtn" v-tap='{methods:okFun}'>确认</div>
	      	<div class="cancelbtn" v-tap='{methods:cancelFun}'>取消</div>
	    </div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				GroupNo:"",
				idAry:[]
			}
		},
		methods:{
			okFun(){
				this.idAry.push(this.$store.state.app.ivisaId)
				this.$http.post(this.$store.state.app.host +"api/Manage/SetGroupNo",{
					UserVisaIds:this.idAry,
					GroupNo:this.GroupNo
				},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$parent.$emit('CLOSE',{closeName:"addGroupNoFrame"})
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")            
					}
				)
			},
			cancelFun(){
				this.$parent.$emit('CLOSE',{closeName:"addGroupNoFrame"})
			}
		}, 
		mounted(){
			// this.$store.state.app.ivisaId
		}
	}
</script>
<style type="text/css">
.addGroupNo{
	width: 300px;
}
	.addGroupNo .cancel {
	  	position: absolute;
	  	top: 16px;
	  	right: 10px;
	  	font-size: 24px;
	  	color: #4C5E70;
	}
	.addGroupNo .cancel:hover{
		cursor: pointer;
	}
	.addGroupNo .cont{
		padding:20px;
	}
	.addGroupNo .cont .title {
		font-size: 14px;
	}
	.addGroupNo .cont input{
	    height: 26px;
	    width: 100%;
	    border: 1px solid #bbb; 
	    margin-top: 10px;
	    padding-left: 5px;
	}
	.addGroupNo .btns {
		text-align: right;
		border-top: 1px solid #bbb;
		padding: 10px;
	}
	.addGroupNo .btns .okbtn {
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

	.addGroupNo .btns .cancelbtn {
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
</style>