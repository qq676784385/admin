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
					<div class="info" v-for="info in previewInfo[showIndex].FileData" v-if="previewInfo[showIndex].FileData.length>0">
						<div class="value">
							<label>{{info.Name}}</label>
							<input type="text" name="" v-model="info.ValueCHS" :title="info.ValueCHS" readonly="readonly">
						</div>
					</div>
					<div class="info" v-for="info in tempInfoAry">
						<div class="value">
							<label>{{info.Name}}</label>
							<input type="text" name="" v-model="info.ValueCHS" :title="info.ValueCHS" readonly="readonly">
						</div>
					</div>
				</div>
				<div class="eng">
					<div class="info" v-for="info in previewInfo[showIndex].FileData" v-if="previewInfo[showIndex].FileData.length>0">
						<div class="value">
							<label>{{info.Name.replace("中文","拼音")}}</label>
							<input type="text" name="" v-model="info.ValueENG" :title="info.ValueENG" readonly="readonly">
						</div>
					</div>
					<div class="info" v-for="info in tempInfoAry">
						<div class="value">
							<label>{{info.Name}}</label>
							<input type="text" name="" v-model="info.ValueENG" :title="info.ValueENG" readonly="readonly">
						</div>
					</div>
				</div>
				<!-- <div class="longTxt" v-if="previewInfo[0].FileType == 3&&nowTag == 2">
		            <input type="checkbox" id='chooseLong' v-model='isLong' v-tap='{methods:selectLong}'><span>长期</span>
		        </div> -->
			</div>
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
				tempInfoAry:[]//模板筛选之后的数据
			}
		},
		methods:{
			getInfo(){
				this.$http.get(this.$store.state.app.host + 'api/Manage/PreView',{params:{userVisaId:this.$store.state.app.ivisaId,visaFileId:this.$store.state.visa.fileInfo.VisaFileId,passport:null},headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.previewInfo = res.data.Result

							if(this.previewInfo[0].FileType == 3){
								for(var i = 0;i<this.previewInfo.length;i++){
									if(this.previewInfo[i].Tag == 2){
										if(this.previewInfo[i].FileData[2].ValueCHS == "长期"){
											this.previewInfo[i].FileData[2].ValueENG = "long"
										}
									}
								}
							}
							if(this.previewInfo[0].FileType == 6){
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
				            }

				            this.previewTagAry = []
				            for(var i = 0;i<this.previewInfo.length;i++){
								for(var j = 0;j<this.previewInfo[i].FileData.length;j++){
									this.previewTagAry.push(this.previewInfo[i].FileData[j].Tag)
									this.saveInfoAry.push(this.previewInfo[i].FileData[j])
								}
							}
							this.getFileTemplate()
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")
					}
				)
			},
			getFileTemplate(){
		        // 获取模板信息
		        this.$http.get(this.$store.state.app.host + "api/Manage/GetFileTemplate",{
		          params:{
		            userVisaId:this.$store.state.app.ivisaId,
		            visaFileId:this.$store.state.visa.fileInfo.VisaFileId,
		          },headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime
		        })
		        .then(
		            function(res){
		              if(res.data.Code == 0){
		                this.templateInfo = res.data.Result

		                var templateIndex = ""
						for(var n = 0;n<this.templateInfo.length;n++){
							if(this.templateInfo[n].IsSelect == true){
								templateIndex = n
								this.selectTemplateInfo(this.templateInfo[templateIndex].TemplateFieldInfo)
								break;
							}
						}
						// templateIndex = templateIndex?templateIndex:0
						// if(this.templateInfo.length>0){
						// 	this.templateInfo[templateIndex].IsSelect = true
						// 	this.selectTemplateInfo(this.templateInfo[templateIndex].TemplateFieldInfo)
						// 	this.templateId = this.templateInfo[templateIndex].TemplateId
						// }
		              }
		            },
		            function(err){
		              console.log("出错了")

		            }
		        )
		    },
			selectTemplateInfo(tempInfo){
				// 删除上一个模板留下的筛选数据
				this.saveInfoAry.length = this.saveInfoAry.length-this.tempInfoAry.length

				this.tempInfoAry = []
				console.log("arrr",this.previewTagAry)
				for(var i = 0;i<tempInfo.length;i++){
					if(this.previewTagAry.indexOf(tempInfo[i].Tag) == -1){
						this.saveInfoAry.push(tempInfo[i])
						this.tempInfoAry.push(tempInfo[i])
					}
				}
			},
			selectTemp(par){
				/*for(var i = 0;i<this.templateInfo.length;i++){
					this.templateInfo[i].IsSelect = false
				}
				par.info.IsSelect = true
				this.templateId = par.info.TemplateId
				this.selectTemplateInfo(par.info.TemplateFieldInfo)*/

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

			},
			changeImgWidth(){
				if(document.getElementById("r_img"))document.getElementById("r_img").removeAttribute("style")
				this.imgWidth = document.getElementById('r_img').naturalWidth
				this.imgHeight = document.getElementById('r_img').naturalHeight
				console.log(this.imgWidth,this.imgHeight)
				if(this.imgWidth == 0||this.imgHeight == 0){
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
			}
		},
		created(){
			console.log(this.$store.state.visa.fileInfo.VisaFileId)
			// 识别信息  this.previewInfo
			this.getInfo()
			// 模板信息  this.templateInfo
			// this.getFileTemplate()



		},
		mounted(){
			var that = this
			var t = setTimeout(function(){
				that.changeImgWidth()
			},300)

		}
	}
</script>
<!-- <style type="text/css" lang="scss" src="../css/previewENG.scss"></style> -->
<style type="text/css"></style>
