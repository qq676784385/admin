<template>
	<div class="preview scroll">
		 <div class="cancel" v-tap='{methods:closeFun}'>×</div>
		<div class="x_part"  v-for='item in preViewInfo'>
			<div class="title">
				<span>{{item.Name}}</span>
				<span v-if='item.FileType == 3||item.FileType == 32||item.FileType == 33'>
					<span v-if='item.Tag ==1'>正面</span>
					<span v-if='item.Tag ==2'>反面</span>
				</span>
			</div>
			<div class="partImg" v-if='item.FileType == 3||item.FileType == 32||item.FileType == 33'>
				<img :src="$store.state.app.host + item.File" width="285px" height="189px">
			</div>
			<div class="partInfo">
				<div :class='item.FileData.length==0?"col middle":"col"'>
					<div class="partImg" v-if='item.FileType != 3&&item.FileType != 32&&item.FileType != 33'>
						<img :src="$store.state.app.host + item.File">
					</div>
					<div v-for='info in item.FileData' v-if='info&&info.Tag !="JB0006"'>
						<label><span  v-text='info.Name'></span>：</label>
						<input class="onlyLook value" type="text" v-model='info.ValueCHS' :title="info.ValueCHS" readonly="readonly">
					</div>
				</div>
				<div class="col" v-if='item.FileType ==2||item.FileType ==3||item.FileType == 6||item.FileType == 32||item.FileType == 33||item.FileType == 37' :class="item.FileType != 3&&item.FileType != 32&&item.FileType != 33?'addBorder':''">
					<div class="partImg"  v-if='item.FileType != 3&&item.FileType != 32&&item.FileType != 33'>
						<img :src="$store.state.app.host + item.File">
					</div>
					<div v-for='info in item.FileData' v-if='info&&info.Tag !="JB0006"'>
						<label><span  v-text='info.Name.replace("中文","拼音")'></span>：</label>
						<input class="onlyLook value" type="text" v-model='info.ValueENG' :title='info.ValueENG' readonly="readonly">
					</div>
				</div>
			</div>
		</div>
		<div class="changePage" v-if='preViewInfo.length>0&&fenye'>
			<div class="prev" @click='pageNum<=1?pageNum=1:pageNum--;changeInfoFun({num:pageNum})'>上一页</div>
			<div class="x_page" v-for='num in oldInfo.length'>
				<span class="pageN" :class='pageNum == num?"selected":""' v-tap='{methods:changeInfoFun,num:num}'>{{num}}</span>
			</div>
			<div class="next"  @click='pageNum>=oldInfo.length?pageNum=oldInfo.length:pageNum++;changeInfoFun({num:pageNum})'>下一页</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export	default{
		data(){
			return {
				preViewInfo:"",
				pageNum:1,
				oldInfo:[],
				dataAry:[],
				fenye:false
			}
		},
		methods:{
			closeModal(){
				this.$parent.$emit('CLOSE',{hideFrame:"previewFrame"})
			},
			getInfo(){
				var passport = ""
			    if(this.$store.state.visa.fileInfo.Passport){
			      passport = this.$store.state.visa.fileInfo.Passport
			    }
				this.$http.get(this.$store.state.app.host + 'api/Manage/PreView',{params:{userVisaId:this.$store.state.app.ivisaId,visaFileId:this.$store.state.visa.fileInfo.VisaFileId,passport:passport},headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.preViewInfo = res.data.Result
							if(this.preViewInfo[0].FileType ==4||this.preViewInfo[0].FileType ==15||this.preViewInfo[0].FileType ==20||this.preViewInfo[0].FileType ==21||this.preViewInfo[0].FileType ==22||this.preViewInfo[0].FileType ==16||this.preViewInfo[0].FileType ==29||this.preViewInfo[0].FileType ==30||this.preViewInfo[0].FileType ==31||this.preViewInfo[0].FileType ==35){
								this.fenye = true
							}
							this.oldInfo = this.preViewInfo
							console.log(this.oldInfo,res.data.Result)
							if(this.oldInfo[0].FileType ==4||this.preViewInfo[0].FileType ==15||this.preViewInfo[0].FileType ==20||this.preViewInfo[0].FileType ==21||this.preViewInfo[0].FileType ==22||this.preViewInfo[0].FileType ==16||this.preViewInfo[0].FileType ==29||this.preViewInfo[0].FileType ==30||this.preViewInfo[0].FileType ==31||this.preViewInfo[0].FileType ==35){
								this.changeInfoFun({num:1})
							}

							if(this.preViewInfo[0].FileType == 3){
								for(var i = 0;i<this.preViewInfo.length;i++){
									if(this.preViewInfo[i].Tag == 2){
										if(this.preViewInfo[i].FileData[1].ValueCHS == "长期"){
											this.preViewInfo[i].FileData[1].ValueENG = "long"
										}

										if(this.preViewInfo[i].FileData[2].ValueCHS == "长期"){
											this.preViewInfo[i].FileData[2].ValueENG = "long"
										}
									}
								}
							}
							if(this.preViewInfo[0].FileType == 6){
				                for (var i = 0; i < this.preViewInfo[0].FileData.length; i++) {
				                  // 新西兰 主申请人、配偶
				                  if(this.preViewInfo[0].FileData[i]&&this.preViewInfo[0].FileData[i].Tag == "GZ00010203"){
				                    this.preViewInfo[0].FileData.splice(i,1)
				                  }
				                  if(this.preViewInfo[0].FileData[i]&&this.preViewInfo[0].FileData[i].Tag == "GZP00010203"){
				                    this.preViewInfo[0].FileData.splice(i,1)
				                  }
				                  // 澳大利亚 美国
				                  if(this.preViewInfo[0].FileData[i]&&this.preViewInfo[0].FileData[i].Tag == "GZ00010205"){
				                    this.preViewInfo[0].FileData.splice(i,1)
				                  }

				                }
				              }
						}
					},
					function(err){
					    this.$layer.msg("网络连接超时")
					}
				)
			},
			closeFun(){
				this.$parent.$emit('CLOSE',{hideFrame:"previewFrame"})
			},
			changeInfoFun(par){
				// this.preViewInfo

				this.pageNum = par.num
				console.log(this.oldInfo,this.pageNum)
				this.preViewInfo = this.oldInfo.slice(this.pageNum-1,this.pageNum)
			}
		},
		created(){
			this.getInfo()
		}
	}
</script>
<style type="text/css">
	.preview.scroll{max-height: 500px;overflow: auto;}
</style>
