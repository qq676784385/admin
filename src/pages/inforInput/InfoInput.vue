<template>
	<div class="inforInput">
		<div class="inforLabel">
			<div class="line">
				<label>受理单号：</label>
				<input type="text" name="">
				<label>姓名：</label>
				<input type="text" name="">
				<label>护照号：</label>
				<input type="text" name="">
			</div>
			<div class="line">
				<label>目的地：</label>
				<input type="text" name="">
				<label>办理人：</label>
				<select>
					<option>赵</option>
					<option>钱</option>
					<option>孙</option>
				</select>
			</div>
		</div>
		<div class="inforList">
			<table border="1" cellspacing="0" frame="box" rules="all">
				<tr>
					<th>No.</th>
					<th>付费时间</th>
					<th>受理单号</th>
					<th>办理渠道</th>
					<th>销售人员</th>
					<th>姓名</th>
					<th>护照号</th>
					<th>目的地</th>
					<th>事由</th>
					<th>材料递交地点</th>
					<th>材料进度</th>
					<th>任务锁定</th>
					<th>操作</th>
				</tr>
				<tr v-for='(visaInfo,index) in visaAllInfo'>
					<td>{{index+1}}</td>
					<td>{{visaInfo.PayTime}}</td>
					<td>{{visaInfo.OrderNumber}}</td>
					<td>{{visaInfo.TransactChannel}}</td>
					<td>{{visaInfo.SalesPerson}}</td>
					<td>{{visaInfo.Name}}</td>
					<td>{{visaInfo.PassportNumber}}</td>
					<td>{{visaInfo.Destination}}</td>
					<td>{{visaInfo.Cause}}</td>
					<td>{{visaInfo.HandPaperPlace}}</td>
					<td>{{visaInfo.PaperProgress}}</td>
					<td>{{visaInfo.UserName}}</td>
					<td>材料详情</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				visaAllInfo:[
					{
						VisaID:"1",
	 					PayTime:  "11111",
	 					OrderNumber:  "GBL12333",
	 					TransactChannel:  "中信1",
	 					SalesPerson:  "赵",
	 					Name:"钱",
	 					PassportNumber: "E1234",  
	 					Destination:  "澳大利亚",
	 					Cause: "旅游", 
	 					HandPaperPlace: "北京",  
	 					PaperProgress:  "30%",
	 					// PaperReceive:  ""
	 					UserName:  "孙",
	 					// InAndOut:  
	 					SendInfo:  "ok",
	 					VisaResult: "ok"
	 				},
	 				{
						VisaID:"1",
	 					PayTime:  "222",
	 					OrderNumber:  "GBL12333",
	 					TransactChannel:  "中信2",
	 					SalesPerson:  "赵",
	 					Name:"钱",
	 					PassportNumber: "E1234",  
	 					Destination:  "澳大利亚",
	 					Cause: "旅游", 
	 					HandPaperPlace: "北京",  
	 					PaperProgress:  "30%",
	 					// PaperReceive:  ""
	 					UserName:  "孙",
	 					// InAndOut:  
	 					SendInfo:  "ok",
	 					VisaResult: "ok"
	 				}
				],
				visaAllInfo2:[
					{
						VisaID:"1",
	 					PayTime:  "3333",
	 					OrderNumber:  "GBL12333",
	 					TransactChannel:  "中信3",
	 					SalesPerson:  "赵",
	 					Name:"钱",
	 					PassportNumber: "E1234",  
	 					Destination:  "澳大利亚",
	 					Cause: "旅游", 
	 					HandPaperPlace: "北京",  
	 					PaperProgress:  "30%",
	 					// PaperReceive:  ""
	 					UserName:  "孙",
	 					// InAndOut:  
	 					SendInfo:  "ok",
	 					VisaResult: "ok"
	 				},
	 				{
						VisaID:"1",
	 					PayTime:  "4444",
	 					OrderNumber:  "GBL12333",
	 					TransactChannel:  "中信4",
	 					SalesPerson:  "赵",
	 					Name:"钱",
	 					PassportNumber: "E1234",  
	 					Destination:  "澳大利亚",
	 					Cause: "旅游", 
	 					HandPaperPlace: "北京",  
	 					PaperProgress:  "30%",
	 					// PaperReceive:  ""
	 					UserName:  "孙",
	 					// InAndOut:  
	 					SendInfo:  "ok",
	 					VisaResult: "ok"
	 				}
				]

			}
		},
		methods:{
			getContInfo(){
				this.visaAllInfo = this.visaAllInfo2
			}
		},
		created(){
			var that = this
			this.$root.eventHub.$on("MODEL_ID",function(obj){
				console.log(obj)
				that.getContInfo()
			})
		}
	}
</script>
<style type="text/css">
	@import url(./infoInput.css);
</style>