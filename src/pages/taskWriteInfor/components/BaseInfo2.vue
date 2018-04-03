<template>
	<div id='out' class='baseInfoOut'>
		<div class="page1"></div>
		<div class="page1 page2"></div>
		<!-- 
		<div class="translate">
		    <button id='translate' class="transBtn">
		        <span class="textIcon">翻译</span><span class="nextIcon">&rsaquo;</span>
		    </button>
	    </div>
	    <div class="btnGroup">
		    <button class="saveBtn">保存</button>
		    <button class="cancelBtn">取消</button>
	    </div> 
		-->
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				userVisaInfo:null,
				requestOldData:null,
				geolocation: [
			        ["China", "中国"],
			        ["Angola", "安哥拉"],
			        ["Afghanistan", "阿富汗"],
			        ["Albania", "阿尔巴尼亚"],
			        ["Algeria", "阿尔及利亚"],
			        ["Andorra", "安道尔共和国"],
			        ["Anguilla", "安圭拉岛"],
			        ["Barbuda Antigua", "安提瓜和巴布达"],
			        ["Argentina", "阿根廷"],
			        ["Armenia", "亚美尼亚"],
			        ["Australia", "澳大利亚"],
			        ["Austria", "奥地利"],
			        ["Azerbaijan", "阿塞拜疆"],
			        ["Bahamas", "巴哈马"],
			        ["Bahrain", "巴林"],
			        ["Bangladesh", "孟加拉国"],
			        ["Barbados", "巴巴多斯"],
			        ["Belarus", "白俄罗斯"],
			        ["Belgium", "比利时"],
			        ["Belize", "伯利兹"],
			        ["Benin", "贝宁"],
			        ["Bermuda Is.", "百慕大群岛"],
			        ["Bolivia", "玻利维亚"],
			        ["Botswana", "博茨瓦纳"],
			        ["Brazil", "巴西"],
			        ["Brunei", "文莱"],
			        ["Bulgaria", "保加利亚"],
			        ["Burkina-faso", "布基纳法索"],
			        ["Burma", "缅甸"],
			        ["Burundi", "布隆迪"],
			        ["Cameroon", "喀麦隆"],
			        ["Canada", "加拿大"],
			        ["Central African Republic", "中非共和国"],
			        ["Chad", "乍得"],
			        ["Chile", "智利"],
			        ["Colombia", "哥伦比亚"],
			        ["Congo", "刚果"],
			        ["Cook Is.", "库克群岛"],
			        ["Costa Rica", "哥斯达黎加"],
			        ["Cuba", "古巴"],
			        ["Cyprus", "塞浦路斯"],
			        ["Czech Republic", "捷克"],
			        ["Denmark", "丹麦"],
			        ["Djibouti", "吉布提"],
			        ["Dominica Rep.", "多米尼加共和国"],
			        ["Ecuador", "厄瓜多尔"],
			        ["Egypt", "埃及"],
			        ["EI Salvador", "萨尔瓦多"],
			        ["Estonia", "爱沙尼亚"],
			        ["Ethiopia", "埃塞俄比亚"],
			        ["Fiji", "斐济"],
			        ["Finland", "芬兰"],
			        ["France", "法国"],
			        ["French Guiana", "法属圭亚那"],
			        ["Gabon", "加蓬"],
			        ["Gambia", "冈比亚"],
			        ["Georgia", "格鲁吉亚"],
			        ["Germany", "德国"],
			        ["Ghana", "加纳"],
			        ["Gibraltar", "直布罗陀"],
			        ["Greece", "希腊"],
			        ["Grenada", "格林纳达"],
			        ["Guam", "关岛"],
			        ["Guatemala", "危地马拉"],
			        ["Guinea", "几内亚"],
			        ["Guyana", "圭亚那"],
			        ["Haiti", "海地"],
			        ["Honduras", "洪都拉斯"],
			        ["Hungary", "匈牙利"],
			        ["Iceland", "冰岛"],
			        ["India", "印度"],
			        ["Indonesia", "印度尼西亚"],
			        ["Iran", "伊朗"],
			        ["Iraq", "伊拉克"],
			        ["Ireland", "爱尔兰"],
			        ["Israel", "以色列"],
			        ["Italy", "意大利"],
			        ["Jamaica", "牙买加"],
			        ["Japan", "日本"],
			        ["Jordan", "约旦"],
			        ["Kampuchea (Cambodia )", "柬埔寨"],
			        ["Kazakstan", "哈萨克斯坦"],
			        ["Kenya", "肯尼亚"],
			        ["Korea", "韩国"],
			        ["Kuwait", "科威特"],
			        ["Kyrgyzstan", "吉尔吉斯坦"],
			        ["Laos", "老挝"],
			        ["Latvia", "拉脱维亚"],
			        ["Lebanon", "黎巴嫩"],
			        ["Lesotho", "莱索托"],
			        ["Liberia", "利比里亚"],
			        ["Libya", "利比亚"],
			        ["Liechtenstein", "列支敦士登"],
			        ["Lithuania", "立陶宛"],
			        ["Luxembourg", "卢森堡"],
			        ["Madagascar", "马达加斯加"],
			        ["Malawi", "马拉维"],
			        ["Malaysia", "马来西亚"],
			        ["Maldives", "马尔代夫"],
			        ["Mali", "马里"],
			        ["Malta", "马耳他"],
			        ["Mauritius", "毛里求斯"],
			        ["Mexico", "墨西哥"],
			        ["Moldova", "摩尔多瓦"],
			        ["Monaco", "摩纳哥"],
			        ["Mongolia", "蒙古"],
			        ["Montserrat Is.", "蒙特塞拉特岛"],
			        ["Morocco", "摩洛哥"],
			        ["Mozambique", "莫桑比克"],
			        ["Namibia", "纳米比亚"],
			        ["Nauru", "瑙鲁"],
			        ["Nepal", "尼泊尔"],
			        ["Netherlands", "荷兰"],
			        ["New Zealand", "新西兰"],
			        ["Nicaragua", "尼加拉瓜"],
			        ["Niger", "尼日尔"],
			        ["Nigeria", "尼日利亚"],
			        ["North Korea", "朝鲜"],
			        ["Norway", "挪威"],
			        ["Oman", "阿曼"],
			        ["Pakistan", "巴基斯坦"],
			        ["Panama", "巴拿马"],
			        ["Papua New Cuinea", "巴布亚新几内亚"],
			        ["Paraguay", "巴拉圭"],
			        ["Peru", "秘鲁"],
			        ["Philippines", "菲律宾"],
			        ["Poland", "波兰"],
			        ["French Polynesia", "法属玻利尼西亚"],
			        ["Portugal", "葡萄牙"],
			        ["Puerto Rico", "波多黎各"],
			        ["Qatar", "卡塔尔"],
			        ["Romania", "罗马尼亚"],
			        ["Russia", "俄罗斯"],
			        ["Saint Lueia", "圣卢西亚"],
			        ["Saint Vincent", "圣文森特岛"],
			        ["San Marino", "圣马力诺"],
			        ["Sao Tome and Principe", "圣多美和普林西比"],
			        ["Saudi Arabia", "沙特阿拉伯"],
			        ["Senegal", "塞内加尔"],
			        ["Seychelles", "塞舌尔"],
			        ["Sierra Leone", "塞拉利昂"],
			        ["Singapore", "新加坡"],
			        ["Slovakia", "斯洛伐克"],
			        ["Slovenia", "斯洛文尼亚"],
			        ["Solomon Is.", "所罗门群岛"],
			        ["Somali", "索马里"],
			        ["South Africa", "南非"],
			        ["Spain", "西班牙"],
			        ["Sri Lanka", "斯里兰卡"],
			        ["Sudan", "苏丹"],
			        ["Suriname", "苏里南"],
			        ["Swaziland", "斯威士兰"],
			        ["Sweden", "瑞典"],
			        ["Switzerland", "瑞士"],
			        ["Syria", "叙利亚"],
			        ["Tajikstan", "塔吉克斯坦"],
			        ["Tanzania", "坦桑尼亚"],
			        ["Thailand", "泰国"],
			        ["Togo", "多哥"],
			        ["Tonga", "汤加"],
			        ["Trinidad and Tobago", "特立尼达和多巴哥"],
			        ["Tunisia", "突尼斯"],
			        ["Turkey", "土耳其"],
			        ["Turkmenistan", "土库曼斯坦"],
			        ["Uganda", "乌干达"],
			        ["Ukraine", "乌克兰"],
			        ["United Arab Emirates", "阿拉伯联合酋长国"],
			        ["United Kiongdom", "英国"],
			        ["United States of America", "美国"],
			        ["Uruguay", "乌拉圭"],
			        ["Uzbekistan", "乌兹别克斯坦"],
			        ["Venezuela", "委内瑞拉"],
			        ["Vietnam", "越南"],
			        ["Yemen", "也门"],
			        ["Yugoslavia", "南斯拉夫"],
			        ["Zimbabwe", "津巴布韦"],
			        ["Zaire", "扎伊尔"],
			        ["Zambia", "赞比亚"]
			    ],
			    area0:null
			}
		},
		methods:{
			getJson() {
				this.getarea0()
		        this.$http.get("./static/area.json").then(
		            function(res) {
		                this.area = res.data.data
		                this.$store.state.app.area = res.data.data
		                this.$root.set("area",this.$store.state.app.area)
		            }
		        )
		    },
		    getarea0(){
		    	// 国家
		    	this.area0 = [{Value:"",ValueENG:""}]
		    	for(var i = 0;i<this.geolocation.length;i++){
		    		var obj = {}
		    		obj.Value = this.geolocation[i][1]
		    		obj.ValueENG = this.geolocation[i][0]
		    		this.area0.push(obj)
		    	}
		    	return this.area0
		    },
		    getarea1() {
		      // 省
		      this.area1 = [{Value:"",ValueENG:""}]
		      for (var i = 0; i < this.$store.state.app.area.length; i++) {
		        this.area1.push(this.$store.state.app.area[i].province)
		      }
		      return this.area1
		    },
		    getarea2(str) {
		      // 市
		      this.area2 = []
		      this.area = this.$store.state.app.area
		      if (this.area) {
		        for (var i = 0; i < this.area.length; i++) {
		          if (this.area[i].province.Value == str) {

		            this.area2 = this.area[i].city
		            break;
		          }
		        }
		      }
		      return this.area2
		    },
			getGroupInfo(id){
				this.$http.get(this.$store.state.app.host + "api/Manage/GroupInfo",{
					params: { userVisaId: this.$store.state.app.ivisaId, groupId: id },
			        headers: { Authorization: this.$store.state.app.token },
			        timeout: this.$store.state.app.httpTime
				})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.userVisaInfo = res.data.Result.ShowTagInfo
				            this.requestOldData = JSON.parse(JSON.stringify(this.userVisaInfo))
				            var el1 = document.getElementsByClassName('page1')[0]
					        var el2 = document.getElementsByClassName('page1')[1]
					        var that = this
					          
					        el1.innerHTML = '<div class="partTitle"><p>'+this.$store.state.visa.groupName+'</p></div>'
					        el2.innerHTML = '<div class="partTitle"><p>'+this.$store.state.visa.groupName+'</p></div>'

					        for(var i = 0;i<this.userVisaInfo.length;i++){
					        	this.creatDom(el1,el2,this.userVisaInfo[i])
					        }
						}
					},
					function(err){
						this.$layer.msg("网络连接超时")
					}
				)
			},
			creatDom(parent1,parent2,dataObj){
				console.log(parent1)
				console.log(parent2)
				console.log(dataObj)

				// 1--中文  2--英文

				var Div_info1 = document.createElement("div")
				$(Div_info1).addClass("div_info CHS")
				var Div_info2 = document.createElement("div")
				$(Div_info2).addClass("div_info ENG")

				var Div_key = document.createElement("div")
				$(Div_key).addClass("div_key")

				var Div_value1 = document.createElement("div")
				$(Div_value1).addClass("div_value CHS")
				var Div_value2 = document.createElement("div")
				$(Div_value2).addClass("div_value ENG")

				var Div_input1 = document.createElement("input")
				$(Div_input1).addClass("div_input CHS")
				var Div_input2 = document.createElement("input")
				$(Div_input2).addClass("div_input ENG")

				var Div_select1 = document.createElement("select")
				$(Div_select1).addClass("div_select CHS")
				var Div_select2 = document.createElement("select")
				$(Div_select2).addClass("div_select ENG")


				if(dataObj.FieldType == 0){ //输入框
					if(dataObj.Options){
						$(Div_value1).append(Div_select1)
						$(Div_value2).append(Div_select2)
						if(dataObj.Value){
							this.addOption(Div_select1,Div_select2,dataObj,dataObj.Value)
						}else{
							this.addOption(Div_select1,Div_select2,dataObj,dataObj.DefaultValue)
						}
					}else{
						$(Div_input1).attr("type","text")
						$(Div_value1).append(Div_input1)
						$(Div_input2).attr("type","text")
						$(Div_value2).append(Div_input2)
					}
				}else if(dataObj.FieldType == 1){//年月日
					$(Div_input1).attr("type","text")
					$(Div_input1).addClass("dataInput")
					$(Div_value1).append(Div_input1)
					$(Div_input2).attr("type","text")
					$(Div_input2).addClass("dataInput")
					$(Div_value2).append(Div_input2)
				}else if(dataObj.FieldType == 6){//年月
					$(Div_input1).attr("type","text")
					$(Div_input1).addClass("dataInput")
					$(Div_value1).append(Div_input1)
					$(Div_input2).attr("type","text")
					$(Div_input2).addClass("dataInput")
					$(Div_value2).append(Div_input2)
				}else if(dataObj.FieldType == 2){//国家
					$(Div_value1).append(Div_select1)
					$(Div_value2).append(Div_select2)
					this.addCountry(Div_select1,Div_select2,dataObj)
				}else if(dataObj.FieldType == 3){//省市
					$(Div_value1).append(Div_select1)
					$(Div_value2).append(Div_select2)
					this.addCity(Div_select1,Div_select2,dataObj)
				}else if(dataObj.FieldType == 4){//二级市
					$(Div_value1).append(Div_select1)
					$(Div_value2).append(Div_select2)
					this.addCity(Div_select1,Div_select2,dataObj)
				}else if(dataObj.FieldType == 5){//数字
					$(Div_input1).attr("type","number")
					$(Div_value1).append(Div_input1)
					$(Div_input2).attr("type","number")
					$(Div_value2).append(Div_input2)
				}

				$(Div_select1).on("change",[Div_select1,Div_select2,dataObj],this.selectChange)
				$(Div_select2).on("change",[Div_select1,Div_select2,dataObj],this.selectChange)

				Div_key.innerHTML = dataObj.title
				$(Div_input1).val(dataObj.ValueCHS)
				$(Div_input2).val(dataObj.ValueENG)

				$(Div_info1).append(Div_key)
				$(Div_info1).append(Div_value1)
				$(Div_info2).append($(Div_key).clone())
				$(Div_info2).append(Div_value2)

				if(dataObj.Tag.indexOf('GP')> -1){
					$(Div_input1).hide()
					$(Div_input2).hide()
				}
				
				$(parent1).append(Div_info1)
				$(parent2).append(Div_info2)

			},
			addOption(select1,select2,dataObj){
				var selectIndex = null,
					selectValueCHS = null,
					selectValueENG = null;
				if(dataObj.ValueCHS){
					selectValueCHS = dataObj.ValueCHS
					selectValueENG = dataObj.ValueENG
				}else if(dataObj.DefaultValue){
					selectValueCHS = dataObj.DefaultValue.split("|")[0]
					selectValueENG = dataObj.DefaultValue.split("|")[1]
				}
				for(var i = 0;i<dataObj.Options.length;i++){
					var opt1 = document.createElement('option');
					$(opt1).attr("value",dataObj.Options[i].Value)
					$(opt1).text(dataObj.Options[i].Value)
					$(select1).append(opt1)

					var opt2 = document.createElement('option');
					$(opt2).attr("value",dataObj.Options[i].ValueENG)
					$(opt2).text(dataObj.Options[i].ValueENG)
					$(select2).append(opt2)
				}
				$(select1).val(selectValueCHS)
				$(select2).val(selectValueENG)
				// this.selectChange()
			},
			addCountry(select1,select2,dataObj){
				// 国家
				this.getarea0()
				var selectIndex = null,
					selectValueCHS = null,
					selectValueENG = null;
				if(dataObj.ValueCHS){
					selectValueCHS = dataObj.ValueCHS
					selectValueENG = dataObj.ValueENG
				}else if(dataObj.DefaultValue){
					selectValueCHS = dataObj.DefaultValue.split("|")[0]
					selectValueENG = dataObj.DefaultValue.split("|")[1]
				}
				for(var i = 0;i<this.area0.length;i++){
					var opt1 = document.createElement('option');
					$(opt1).attr("value",this.area0[i].Value)
					$(opt1).text(this.area0[i].Value)
					$(select1).append(opt1)

					var opt2 = document.createElement('option');
					$(opt2).attr("value",this.area0[i].ValueENG)
					$(opt2).text(this.area0[i].ValueENG)
					$(select2).append(opt2)
				}
				$(select1).val(selectValueCHS)
				$(select2).val(selectValueENG)
			},
			addProvince(select1,select2,dataObj){
				this.getarea1()
				var selectIndex = null,
					selectValueCHS = null,
					selectValueENG = null;
				if(dataObj.ValueCHS){
					selectValueCHS = dataObj.ValueCHS
					selectValueENG = dataObj.ValueENG
				}else if(dataObj.DefaultValue){
					selectValueCHS = dataObj.DefaultValue.split("|")[0]
					selectValueENG = dataObj.DefaultValue.split("|")[1]
				}
			},
			addCity(select1,select2,dataObj){
				this.getarea2()
				var selectIndex = null,
					selectValueCHS = null,
					selectValueENG = null;
				if(dataObj.ValueCHS){
					selectValueCHS = dataObj.ValueCHS
					selectValueENG = dataObj.ValueENG
				}else if(dataObj.DefaultValue){
					selectValueCHS = dataObj.DefaultValue.split("|")[0]
					selectValueENG = dataObj.DefaultValue.split("|")[1]
				}
				$(select1).val(selectValueCHS)
				$(select2).val(selectValueENG)
			},
			selectChange(event){
				console.log(event.currentTarget.selectedIndex)//当前选择的index
				console.log(event.data[0]) //中文select
				console.log(event.data[1]) //英文select
				console.log(event.data[2]) //dataObj
				// $(event.data[0]).parent().parent() //父级 Div_info
				var parent1 = $(event.data[0]).parent().parent()
				var parent2 = $(event.data[1]).parent().parent()

				var Div_child1 = document.createElement("div")
				$(Div_child1).addClass('div_child')
				var Div_child2 = document.createElement("div")
				$(Div_child2).addClass('div_child')

				
				if(!$(parent1).children(".div_child").length){
					$(parent1).append(Div_child1)
					$(parent2).append(Div_child2)
				}
				
				var info = document.getElementsByClassName("div_info")

				var dataObj = event.data[2]
				var selectIndex = event.currentTarget.selectedIndex+1
				event.data[0].selectedIndex = event.currentTarget.selectedIndex
				event.data[1].selectedIndex = event.currentTarget.selectedIndex

				// 通过 selectIndex 和 dataObj.Children[0] 确定下一级内容

				var newDataObj = []
				for(var i = 0;i<dataObj.Children[0].length;i++){
					if(selectIndex == dataObj.Children[0][i].OptionIndex){
						newDataObj.push(dataObj.Children[0][i])
						this.creatDom(Div_child1,Div_child2,dataObj.Children[0][i])
					}
				}
				if(newDataObj.length == 0){
					console.log(123)
					$(parent1).children(".div_child").remove()
					$(parent2).children(".div_child").remove()
				}
			}
		},
		created(){
			var that = this
			this.$root.eventHub.$on("GROUPID", function(obj) {
			    that.getGroupInfo(obj.groupId)
		    })

		},
		mounted(){
			this.getGroupInfo(this.$store.state.visa.groupId)
		}
	}
</script>
<style type="text/css" lang="scss" src='../css/baseInfo2.scss'></style>