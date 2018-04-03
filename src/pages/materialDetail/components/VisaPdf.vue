<template>
	<div class="pdf">
		<div class="noData" v-if='!pdfPath'>暂无数据</div>
		<iframe class="frame" id="mainweb" :src="$store.state.app.host + pdfPath" frameborder="0" scrolling="no" width="100%" height="100%" v-if='pdfPath'></iframe>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				pdfFile:"",
				pdfPath:"",
				pdfTag:null
			}
		},
		methods:{
			getPdf(tag){
				this.pdfPath = ""
				for(var i = 0;i<this.pdfFile.length;i++){
					if(this.pdfFile[i].Tag == tag){
						this.pdfPath = this.pdfFile[i].File
					}
				}
			}
		},
		mounted(){
			this.pdfFile = JSON.parse(this.$root.get("pdfFile"))
			this.pdfTag = this.pdfFile[0].Tag
			this.getPdf(this.pdfTag)
			var that = this
			this.$root.eventHub.$on("CHANGEPDF",function(obj){
				if(obj.tag){
					that.getPdf(obj.tag)
				}
			})
		},
	}
</script>
<style type="text/css">
	.pdf{
		margin-top: 20px;
		height: 100%;

	}
	.pdf .frame{
		min-height: 700px;
	}
	.pdf .noData{
		text-align: center;
	}

</style>