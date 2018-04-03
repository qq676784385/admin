<template>
	<div class="previewENG">
		<div class="cancel" v-tap="{methods:cancelFun}">×</div>
		<div class="scroll">
			<div class="imgGroups">
				<div class="realImg">
					<img id="r_img" :src="$store.state.app.host + previewInfo[showIndex].File" draggable="false" >
				</div>
				<div class="rightCont">
					<div class="templateImg">
						<div class="title"><span>选择模板</span>（单选）</div>
						<div class="allTemp">
							<div class="oneTemp" v-if="templateInfo.length == 0">
								<span class="txt">
									暂无模板
								</span>
							</div>
							<div class="oneTemp" v-for="item in templateInfo" v-tap="{methods:selectTemp,info:item}">
								<img class="demoImg" src="static/demoTemplate.png" draggable="false">
								<div class="mask" v-if="item.IsSelect">
									<img src="static/selected.png" draggable="false">
								</div>
								<span class="txt">
									{{item.Name}}
								</span>
							</div>
						</div>
					</div>
					<div class="t_btn">
						<div class="t_btn1">
							<div class="upbtn" v-tap="{methods:prevFun}" >
								<!-- :class="showIndex=='0'?'none':''" -->
								<img src="static/up.png">
								<span>上一页</span>
							</div>
							<div class="upbtn " v-tap="{methods:nextFun}" >
								<!-- :class="showIndex==previewInfo.length-1?'none':''" -->
								<img src="static/down.png">
								<span>下一页</span>
							</div>
						</div>
						<!-- <div class="t_btn2">
							<div class="addNext">+</div>
							<div class="txt">新增页</div>
						</div> -->
					</div>
				</div>
			</div>
			<div class="showText">
				<div class="chs">
					<!-- 识别信息 -->
					<div class="info" v-for="info in previewInfo[showIndex].FileData">
						<div class="value">
							<label>{{info.Name}}</label>
							<input type="text" name="" v-model="info.ValueCHS" :title="info.ValueCHS" @focus="focusInput(info,$event)">
						</div>
					</div>
					<!-- 模板信息 -->
					<div class="info" v-for="info in tempInfoAry">
						<div class="value">
							<label>{{info.Name}}</label>
							<input type="text" name="" v-model="info.ValueCHS" :title="info.ValueCHS" @focus="focusInput(info,$event)">
						</div>
					</div>
				</div>
				<div class="eng">
					<!-- 识别信息 -->
					<div class="info" v-for="info in previewInfo[showIndex].FileData">
						<div class="value">
							<label>{{info.Name}}</label>
							<input type="text" name="" v-model="info.ValueENG" :title="info.ValueENG" @focus="focusInput(info,$event)">
						</div>
					</div>
					<!-- 模板信息 -->
					<div class="info" v-for="info in tempInfoAry">
						<div class="value">
							<label>{{info.Name}}</label>
							<input type="text" name="" v-model="info.ValueENG" :title="info.ValueENG" @focus="focusInput(info,$event)">
						</div>
					</div>
				</div>
			</div>
			<div class="longTxt" v-if="previewInfo[0].FileType == 3&&nowTag == 2">
	            <input type="checkbox" id='chooseLong' v-model='isLong' v-tap='{methods:selectLong}'><span>长期</span>
	        </div>
		</div>
		<div class="all_btns">
			<div v-tap="{methods:TranslateTemplate}">翻译</div>
			<div v-tap="{methods:saveFun}">保存</div>
			<div v-tap="{methods:cancelFun}">取消</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				previewInfo:[],
				templateInfo:[],
				previewTagAry:[],
				saveInfoAry:[],
				templateId:"",//模板id
				imgWidth:"",
				imgHeight:"",
				showIndex:0,
				tempInfoAry:[],//模板筛选之后的数据
				isLong:false,
				nowTag:"",
				saveDateCHS:"",//身份证有效期至 中文值
				saveDateENG:""	//英文值
			}
		},
		methods:{
			TranslateTemplate(){
				// 翻译 TranslateTemplateFields
				console.log("save",this.saveInfoAry)
				this.$http.post(this.$store.state.app.host +"api/Manage/TranslateTemplateFields",this.saveInfoAry,{headers:{Authorization: this.$store.state.app.token}},{timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							for(var i = 0;i<this.saveInfoAry.length;i++){
								for(var j = 0;j<res.data.Result.length;j++){
									if(this.saveInfoAry[i].Tag == res.data.Result[j].Tag){
										this.saveInfoAry[i].ValueCHS = res.data.Result[j].ValueCHS
										this.saveInfoAry[i].ValueENG = res.data.Result[j].ValueENG
										continue
									}
								}
							}
							console.log("translate",this.saveInfoAry)
						}

					},
					function(err){

					}
				)
			},
			selectTemplateInfo(tempInfo){
				// 删除上一个模板留下的筛选数据
				this.saveInfoAry.length = this.saveInfoAry.length-this.tempInfoAry.length

				this.tempInfoAry = []
				for(var i = 0;i<tempInfo.length;i++){
					if(this.previewTagAry.indexOf(tempInfo[i].Tag) == -1){
						this.saveInfoAry.push(tempInfo[i])
						this.tempInfoAry.push(tempInfo[i])
					}
				}
			},
			selectTemp(par){
				for(var i = 0;i<this.templateInfo.length;i++){
					this.templateInfo[i].IsSelect = false
				}
				par.info.IsSelect = true
				this.templateId = par.info.TemplateId
				this.selectTemplateInfo(par.info.TemplateFieldInfo)

			},
			cancelFun(){
				this.$parent.$emit("CLOSE",{hideFrame:"previewFrameENG"})
			},
			prevFun(){
				if(this.showIndex == 0){
					this.showIndex = 0
					this.$layer.msg("没有上一个了")
				}else{
					this.showIndex--
				}
				console.log("p",this.showIndex)
				this.nowTag = this.previewInfo[this.showIndex].Tag
				var that = this
				var t1 = setTimeout(function(res){
					that.changeImgWidth()
				},100)
				// this.changeImgWidth()
				
			},
			nextFun(){
				if(this.showIndex == this.previewInfo.length-1){
					this.showIndex = this.previewInfo.length-1
					this.$layer.msg("没有下一个了")
				}else{
					this.showIndex++
				}
				console.log("h",this.showIndex)
				
				var that = this
				var t1 = setTimeout(function(res){
					that.changeImgWidth()
				},100)
				// this.changeImgWidth()
				console.log(this.previewInfo[this.showIndex])
				this.nowTag = this.previewInfo[this.showIndex].Tag
				if(this.previewInfo[0].FieldType == 3&&this.nowTag == 2){
					// 身份证 反面
					// for(var i = 0;i<this.previewInfo[this.showIndex].FileData.length;i++){
					// 	// if(this.previewInfo[this.showIndex].FileData[i].Tag == "")
					// }
					
				}

			},
			saveFun(){
				var ary = []
				for (var i = 0;i<this.previewInfo.length; i++) {
					var obj = {
						UserVisaId:"",
						UserVisaFileId:"",
						CredentialsData:[]
					}
					obj.UserVisaId = this.$store.state.app.ivisaId
					obj.UserVisaFileId = this.previewInfo[i].UserVisaFileId
					if(i == 0){
						obj.CredentialsData = this.saveInfoAry
					}
					ary.push(obj)
				}
				this.$http.post(this.$store.state.app.host +"api/Manage/SavePreViewData",{
					TemplateId:this.templateId,
					FileTags:this.previewTagAry,
					Data:ary
				},{headers:{ Authorization: this.$store.state.app.token}},{timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$parent.$emit("CLOSE",{hideFrame:"previewFrameENG"})
						}
					},
					function(err){
					}
				)
			},
			changeImgWidth(){
				document.getElementById("r_img").removeAttribute("style")
				this.imgWidth = document.getElementById('r_img').naturalWidth
				this.imgHeight = document.getElementById('r_img').naturalHeight
				console.log(this.imgWidth,this.imgHeight)
				if(this.imgWidth == 0||this.imgHeight == 0){
					// console.log(123)
					document.getElementById('r_img').style.width= "400px"
				}
				if(this.imgWidth<600&&this.imgHeight<600){
					document.getElementById('r_img').style.width= this.imgWidth+"px"
					document.getElementById('r_img').style.height= this.imgHeight+"px"
				}else{
					if(this.imgWidth>this.imgHeight){
						// 横版图
						document.getElementById('r_img').style.width="600px"
					}else{
						// 竖版图
						document.getElementById('r_img').style.height="600px"
					}
				}
			},
			focusInput(info, e) {
		        var currYear = new Date().getFullYear();
		        if (info.FieldType == 6) {
		          var that = this
		            $(e.target).mobiscroll().date({
		                theme: 'mobiscroll',
		                display: 'bubble',
		                lang: "zh",
		                dateFormat: "yyyy-mm",
		                dateOrder: "yyyymm",
		                onSelect: function(event, inst) {
		                    if (event) {
		                        info.ValueCHS = event
		                        info.ValueENG = event
		                        if (info.Tag == "JB000605") {
		                            that.isLong = false
		                            that.saveDateCHS = event
		                            that.saveDateENG = event
		                        }
		                    }
		                }
		            });
		        } else if (info.FieldType == 1) {
			        var that = this
			        $(e.target).mobiscroll().date({
				            theme: 'mobiscroll',
				            display: 'bubble',
				            lang: "zh",
				            endYear: currYear + 50,
				            dateFormat: "yyyy-mm-dd",
				            dateOrder: "yyyymmdd",
				            onSelect: function(event, inst) {
				                if (event) {
				                    info.ValueCHS = event
				                    info.ValueENG = event
				                    if (info.Tag == "JB000605") {
				                        that.isLong = false
				                        that.saveDateCHS = event
				                        that.saveDateENG = event
				                    }
				                }
				            }
			        });
			    }
		    },
		    selectLong(par){
		    	if (this.previewInfo[0].FileType == 3) {
			        for (var i = 0; i < this.previewInfo.length; i++) {
			            if (this.previewInfo[i].Tag == 2) {
			                if (this.isLong) {
			                   this.previewInfo[i].FileData[2].ValueCHS = "长期"
			                   this.previewInfo[i].FileData[2].ValueENG = "long"
			                } else {
			                	console.log(this.saveDateCHS,this.saveDateENG)
			                   this.previewInfo[i].FileData[2].ValueCHS = this.saveDateCHS
			                   this.previewInfo[i].FileData[2].ValueENG = this.saveDateENG
			                }
			            }
			        }
			    }

		    }

		},
		created(){
			// 识别信息  this.$store.state.visa.previewInfo
			// 模板信息  this.$store.state.visa.templateInfo
			this.previewInfo = this.$store.state.visa.previewInfo
			this.templateInfo = this.$store.state.visa.templateInfo
			this.nowTag = this.previewInfo[0].Tag
			if(this.previewInfo[0].FileType == 3&&this.nowTag == 2){
				this.isLong = "true"
			}
			if(this.previewInfo[0].FileType == 3){
				for (var i = 0; i < this.previewInfo.length; i++) {
		          if (this.previewInfo[i].Tag == 2) {
		            if (this.previewInfo[i].FileData[2].ValueCHS == "长期") {
		              this.previewInfo[i].FileData[2].ValueENG = "long"
		              this.isLong = true
		            } else {
		              this.saveDateCHS = this.previewInfo[i].FileData[2].ValueCHS
		              this.saveDateENG = this.previewInfo[i].FileData[2].ValueENG
		              this.isLong = false
		            }
		          }
		        }
			}
			/*if(this.previewInfo[0].FileType == 6){
                for (var i = 0; i < this.previewInfo[0].FileData.length; i++) {
                    // 新西兰 主申请人、配偶
                    if(this.previewInfo[0].FileData[i]&&this.previewInfo[0].FileData[i].Tag == "GZ00010203"){
                        this.previewInfo[0].FileData.splice(i,1)
                    }
                    if(this.previewInfo[0].FileData[i]&&this.previewInfo[0].FileData[i].Tag == "GZP00010203"){
                        this.previewInfo[0].FileData.splice(i,1)
                    }
                    // 澳大利亚 美国
                    if(this.previewInfo[0].FileData[i]&&this.previewInfo[0].FileData[i].Tag == "GZ00010205"){
                        this.previewInfo[0].FileData.splice(i,1)
                    }
                }
            }*/
			this.previewTagAry = []
			
			for(var i = 0;i<this.previewInfo.length;i++){
				for(var j = 0;j<this.previewInfo[i].FileData.length;j++){
					this.previewTagAry.push(this.previewInfo[i].FileData[j].Tag)
					this.saveInfoAry.push(this.previewInfo[i].FileData[j])
				}
			}
			var templateIndex = ""
			for(var n = 0;n<this.templateInfo.length;n++){
				if(this.templateInfo[n].IsSelect == true){
					templateIndex = n
					break;
				}
			}
			templateIndex = templateIndex?templateIndex:0
			if(this.templateInfo.length>0){
				this.templateInfo[templateIndex].IsSelect = true
				this.selectTemplateInfo(this.templateInfo[templateIndex].TemplateFieldInfo)
				this.templateId = this.templateInfo[templateIndex].TemplateId
			}
				

			console.log(this.saveInfoAry)

			// console.log("tagAry",this.previewTagAry)
		},
		mounted(){
			var that = this
			var t = setTimeout(function(){
				that.changeImgWidth()
			},100)

		}
	}
</script>
<style type="text/css" lang="scss" src="../css/previewENG.scss"></style>