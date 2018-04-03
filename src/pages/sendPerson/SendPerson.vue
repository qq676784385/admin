<template>
	<div class="sendPreson">
		<div>
			<p class="sendTitle">指定送签员</p>
		</div>
		<div class="selectSend">
			<span>是否需要送签：</span>
			<form>
				<label><input type="radio" value = "false" v-model='NoNeedSendSign'><span>需要送签</span></label>
				<label><input type="radio" value = "true" v-model='NoNeedSendSign'><span>无需送签</span></label>
			</form>
		</div>
		<div class="aa" v-if='NoNeedSendSign!=="true"'>
			<div class="chooseTime" v-if='NoNeedSendSign'>
				<label>预约时间:</label>
				<span class="dateTime">{{sendTime}}</span>
				<!-- <input type="checkbox" v-model='NoNeedSendSign'>
				<span>无需送签</span> -->
			</div>
			<div class="x_calender">
				<div id="cal">
			        <div id="top">
			            <div class="select">
			                <select id="year-select"></select>&nbsp;年
			                <select id="month-select"></select>&nbsp;月
			            </div>
			            <div class="step">
			                <span id="prev"><</span>
			                <span id="next">></span>                               
			            </div>
			        </div>
			        <ul id="wk">
			            <li>一</li>
			            <li>二</li>
			            <li>三</li>
			            <li>四</li>
			            <li>五</li>
			            <li><b>六</b></li>
			            <li><b>日</b></li>
			        </ul>
			        <div id="cm"></div>
			        <div id="bm">
			            <div class="heavenly-branch">
			                <span id="heavenly"></span>年 &nbsp;
			                ［<span id="branch"></span>］
			            </div>
			            <a href="javascript:;;" id="now-date">回到今天</a>
			        </div>
			    </div>
			</div>
			<div class="choosePerson">
				<label>送签员：</label>
				<input type="text" name="" v-model='sendPerson'>
			</div>
		</div>
		
		<div class="okBtn">
			<button v-tap='{methods:sendSign}'>确定</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				sendTime:'',
				sendPerson:"",
				NoNeedSendSign:"false"
			}
		},
		methods:{
			calenderInit(){
				var _this = this
				calendar.init({
				    cellClickCallback: function(cell, datedata){
				    	var ele = document.getElementsByClassName('cell yellowBg')
						if(ele.length>0){
							ele[0].className = "cell"
						}

						cell.className = 'cell yellowBg'
				        _this.sendTime =  datedata.solarYear + '-' + datedata.solarMonth + '-' + datedata.solarDate
				    }
				});
			},
			sendSign(par){
				if(this.NoNeedSendSign === "true"){
					this.sendTime = ""
					this.sendPerson = ""
				}
				this.$http.post(this.$store.state.app.host + 'api/Manage/SendSign',{
					UserVisaID:this.$store.state.app.ivisaId,
					SendSignDate:this.sendTime,
					SendSignUser:this.sendPerson,
					NoNeedSendSign:this.NoNeedSendSign
				},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$layer.msg("送签成功")
							this.$root.goRouter({
								router:"/visaInfo/9"
							})
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")            
					}

				)
			}
		},
		mounted(){
			// this.$store.state.app.host = this.$root.get("AppHost")
			this.$store.state.app.token = this.$root.get("AppToken")
			this.$store.state.app.ivisaId = this.$root.get("IvisaId")
			this.calenderInit()
		},
		updated(){
			if(this.NoNeedSendSign === "false"){
				var that = this
				calendar.init({
				    cellClickCallback: function(cell, datedata){
				    	var ele = document.getElementsByClassName('cell yellowBg')
						if(ele.length>0){
							ele[0].className = "cell"
						}

						cell.className = 'cell yellowBg'
				        that.sendTime =  datedata.solarYear + '-' + datedata.solarMonth + '-' + datedata.solarDate
				    }
				})
			}
		}
	}
</script>
<style type="text/css">
@import url(../css/calender.css);
	@import url(./sendPerson.css);

</style>