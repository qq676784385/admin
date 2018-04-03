<template>
	<div class="pdf">
		<iframe class="frame" id="mainweb" :src="$store.state.app.host + pdfPath" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				pdfFile:"",
				pdfPath:"",
				pdfTag:5
			}
		},
		methods:{
			getPdf(tag){
				
				for(var i = 0;i<this.pdfFile.length;i++){
					if(this.pdfFile[i].Tag == tag){
						console.log(i,tag,this.pdfFile[i].File)
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
		created(){
			console.log("created")
		}
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

</style>